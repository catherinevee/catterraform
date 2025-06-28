import BaseGenerator from './BaseGenerator';
import CostAnomalyGenerator from './CostAnomalyGenerator';
import UsageReportsGenerator from './UsageReportsGenerator';
import BudgetAlertsGenerator from './BudgetAlertsGenerator';
import ResourceSchedulingGenerator from './ResourceSchedulingGenerator';
import PricingModuleGenerator from './PricingModuleGenerator';

export default class CostAlertsGenerator extends BaseGenerator {
  private costAnomalyGenerator: CostAnomalyGenerator;
  private usageReportsGenerator: UsageReportsGenerator;
  private budgetAlertsGenerator: BudgetAlertsGenerator;
  private resourceSchedulingGenerator: ResourceSchedulingGenerator;
  private pricingModuleGenerator: PricingModuleGenerator;

  constructor(cloudProvider: string) {
    super(cloudProvider);
    this.costAnomalyGenerator = new CostAnomalyGenerator(cloudProvider);
    this.usageReportsGenerator = new UsageReportsGenerator(cloudProvider);
    this.budgetAlertsGenerator = new BudgetAlertsGenerator(cloudProvider);
    this.resourceSchedulingGenerator = new ResourceSchedulingGenerator(cloudProvider);
    this.pricingModuleGenerator = new PricingModuleGenerator(cloudProvider);
  }

  generateCostAlerts(config: any): string {
    if (!config) return '';

    let code = '';
    
    switch (this.cloudProvider) {
      case 'aws':
        code = `# AWS Cost Alerts and Budgeting Configuration
`;
        break;
      case 'azure':
        code = `# Azure Cost Management and Budgeting Configuration
`;
        break;
      default:
        return '';
    }

    // Generate Pricing Module
    if (config.usePricingModule) {
      code += this.pricingModuleGenerator.generatePricingModule();
    }

    // Generate Resource Scheduling
    if (config.resourceScheduling?.enableScheduling) {
      code += this.resourceSchedulingGenerator.generateResourceScheduling(config.resourceScheduling);
    }

    // Generate Cost Anomaly Detection
    if (config.enableCostAnomalyDetection) {
      code += this.costAnomalyGenerator.generateCostAnomalyDetection();
    }

    // Generate Cost and Usage Reports
    if (config.enableUsageReports) {
      code += this.usageReportsGenerator.generateUsageReports();
    }

    // Generate Budget Alerts
    if (config.budgets && config.budgets.length > 0) {
      code += this.budgetAlertsGenerator.generateBudgetAlerts(config.budgets);
    }

    return code;
  }

  generateData(): string {
    switch (this.cloudProvider) {
      case 'aws':
        return `
# Data sources for cost alerts
data "aws_caller_identity" "current" {}
`;
      case 'azure':
        return `
# Data sources for cost management
data "azurerm_client_config" "current" {}
data "azurerm_subscription" "current" {}
`;
      default:
        return '';
    }
  }

  generatePricingModule(): string {
    return this.pricingModuleGenerator.generatePricingModule();
  }
}
