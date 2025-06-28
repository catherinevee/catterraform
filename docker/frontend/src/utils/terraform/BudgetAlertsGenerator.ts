
import BaseGenerator from './BaseGenerator';

export default class BudgetAlertsGenerator extends BaseGenerator {
  generateBudgetAlerts(budgets: any[]): string {
    if (!budgets || budgets.length === 0) return '';

    let code = '';
    
    switch (this.cloudProvider) {
      case 'aws':
        budgets.forEach((budget: any) => {
          const emails = budget.emails.split(',').map((email: string) => `"${email.trim()}"`).join(', ');
          
          code += `
# Budget Alert: ${budget.name}
resource "aws_budgets_budget" "${this.sanitizeResourceName(budget.name)}" {
  name         = "${budget.name}"
  budget_type  = "COST"
  limit_amount = "${budget.amount}"
  limit_unit   = "USD"
  time_unit    = "MONTHLY"
  time_period_start = formatdate("YYYY-MM-01_00:00", timestamp())

  cost_filters {
    dimension {
      key    = "LINKED_ACCOUNT"
      values = [data.aws_caller_identity.current.account_id]
    }
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                 = ${budget.threshold}
    threshold_type            = "PERCENTAGE"
    notification_type         = "ACTUAL"
    subscriber_email_addresses = [${emails}]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                 = ${Math.min(parseInt(budget.threshold) + 20, 100)}
    threshold_type            = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [${emails}]
  }

  tags = var.required_tags
}
`;
        });
        break;
      
      case 'azure':
        budgets.forEach((budget: any) => {
          const emails = budget.emails.split(',').map((email: string) => email.trim());
          
          code += `
# Budget Alert: ${budget.name}
resource "azurerm_consumption_budget_subscription" "${this.sanitizeResourceName(budget.name)}" {
  name            = "${budget.name}"
  subscription_id = data.azurerm_subscription.current.id

  amount     = ${budget.amount}
  time_grain = "Monthly"

  time_period {
    start_date = formatdate("YYYY-MM-01T00:00:00Z", timestamp())
  }

  filter {
    dimension {
      name = "ResourceGroupName"
      values = [
        azurerm_resource_group.main.name,
      ]
    }
  }

  notification {
    enabled   = true
    threshold = ${budget.threshold}
    operator  = "GreaterThan"

    contact_emails = ${JSON.stringify(emails)}

    contact_groups = [
      azurerm_monitor_action_group.cost_alerts.id,
    ]
  }

  notification {
    enabled        = true
    threshold      = ${Math.min(parseInt(budget.threshold) + 20, 100)}
    operator       = "GreaterThan"
    threshold_type = "Forecasted"

    contact_emails = ${JSON.stringify(emails)}

    contact_groups = [
      azurerm_monitor_action_group.cost_alerts.id,
    ]
  }

  tags = var.required_tags
}
`;
        });
        break;
    }

    return code;
  }

  private sanitizeResourceName(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_');
  }
}
