
import React from 'react';
import BasicCostAlertsConfig from './BasicCostAlertsConfig';
import ResourceSchedulingConfig from './ResourceSchedulingConfig';
import BudgetAlertsConfig from './BudgetAlertsConfig';

interface CostAlertsConfigProps {
  cloudProvider: string;
  onConfigChange: (field: string, value: any) => void;
}

const CostAlertsConfig: React.FC<CostAlertsConfigProps> = ({
  cloudProvider,
  onConfigChange
}) => {
  const [budgets, setBudgets] = React.useState([
    {
      name: 'monthly-budget',
      amount: '1000',
      threshold: '80',
      emails: 'admin@company.com'
    }
  ]);

  const [schedulingConfig, setSchedulingConfig] = React.useState({
    enableScheduling: false,
    environment: 'development',
    scaleDownTime: '18:00',
    scaleUpTime: '08:00',
    scaleDownDays: 'MON-FRI',
    scaleUpDays: 'MON-FRI',
    enableLambdaScheduler: false,
    autoscalingGroupName: 'main'
  });

  const handleBudgetsChange = (updatedBudgets: typeof budgets) => {
    setBudgets(updatedBudgets);
    onConfigChange('budgets', updatedBudgets);
  };

  const handleSchedulingConfigChange = (field: string, value: any) => {
    const updatedConfig = { ...schedulingConfig, [field]: value };
    setSchedulingConfig(updatedConfig);
    onConfigChange('resourceScheduling', updatedConfig);
  };

  React.useEffect(() => {
    onConfigChange('budgets', budgets);
    onConfigChange('resourceScheduling', schedulingConfig);
  }, []);

  // Support both AWS and Azure
  if (cloudProvider !== 'aws' && cloudProvider !== 'azure') {
    return null;
  }

  return (
    <div className="space-y-6 border-t border-gray-200 pt-6">
      <BasicCostAlertsConfig 
        cloudProvider={cloudProvider}
        onConfigChange={onConfigChange} 
      />
      
      <ResourceSchedulingConfig
        cloudProvider={cloudProvider}
        schedulingConfig={schedulingConfig}
        onSchedulingConfigChange={handleSchedulingConfigChange}
      />

      <BudgetAlertsConfig
        cloudProvider={cloudProvider}
        budgets={budgets}
        onBudgetsChange={handleBudgetsChange}
      />
    </div>
  );
};

export default CostAlertsConfig;
