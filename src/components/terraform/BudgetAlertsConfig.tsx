
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Budget {
  name: string;
  amount: string;
  threshold: string;
  emails: string;
}

interface BudgetAlertsConfigProps {
  cloudProvider: string;
  budgets: Budget[];
  onBudgetsChange: (budgets: Budget[]) => void;
}

const BudgetAlertsConfig: React.FC<BudgetAlertsConfigProps> = ({
  cloudProvider,
  budgets,
  onBudgetsChange
}) => {
  const addBudget = () => {
    const newBudget = {
      name: `budget-${budgets.length + 1}`,
      amount: '500',
      threshold: '75',
      emails: 'admin@company.com'
    };
    const updatedBudgets = [...budgets, newBudget];
    onBudgetsChange(updatedBudgets);
  };

  const updateBudget = (index: number, field: string, value: string) => {
    const updatedBudgets = budgets.map((budget, i) => 
      i === index ? { ...budget, [field]: value } : budget
    );
    onBudgetsChange(updatedBudgets);
  };

  const removeBudget = (index: number) => {
    const updatedBudgets = budgets.filter((_, i) => i !== index);
    onBudgetsChange(updatedBudgets);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium text-gray-900">Budget Alerts</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addBudget}
        >
          Add Budget
        </Button>
      </div>

      <div className="space-y-4">
        {budgets.map((budget, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Budget {index + 1}</Label>
              {budgets.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeBudget(index)}
                >
                  Remove
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`budget-name-${index}`} className="text-sm">
                  Budget Name
                </Label>
                <Input
                  id={`budget-name-${index}`}
                  value={budget.name}
                  onChange={(e) => updateBudget(index, 'name', e.target.value)}
                  placeholder="budget-name"
                />
              </div>
              
              <div>
                <Label htmlFor={`budget-amount-${index}`} className="text-sm">
                  Monthly Limit (USD)
                </Label>
                <Input
                  id={`budget-amount-${index}`}
                  type="number"
                  value={budget.amount}
                  onChange={(e) => updateBudget(index, 'amount', e.target.value)}
                  placeholder="1000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`budget-threshold-${index}`} className="text-sm">
                  Alert Threshold (%)
                </Label>
                <Input
                  id={`budget-threshold-${index}`}
                  type="number"
                  value={budget.threshold}
                  onChange={(e) => updateBudget(index, 'threshold', e.target.value)}
                  placeholder="80"
                  min="1"
                  max="100"
                />
              </div>
              
              <div>
                <Label htmlFor={`budget-emails-${index}`} className="text-sm">
                  Notification Emails
                </Label>
                <Input
                  id={`budget-emails-${index}`}
                  value={budget.emails}
                  onChange={(e) => updateBudget(index, 'emails', e.target.value)}
                  placeholder="admin@company.com, finance@company.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetAlertsConfig;
