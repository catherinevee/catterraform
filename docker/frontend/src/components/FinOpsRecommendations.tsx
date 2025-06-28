
import React from 'react';

interface FinOpsRecommendationsProps {
  cloudProvider: string;
  selectedResources: string[];
  resourceConfigs: any;
}

const FinOpsRecommendations: React.FC<FinOpsRecommendationsProps> = ({
  cloudProvider,
  selectedResources,
  resourceConfigs
}) => {
  const getComputeRecommendations = () => {
    const recommendations = [];
    
    // Right-sizing recommendations
    if (resourceConfigs.compute?.instanceType?.includes('large') || 
        resourceConfigs.compute?.instanceType?.includes('xlarge')) {
      recommendations.push({
        type: 'cost-optimization',
        title: 'Consider Right-sizing',
        description: 'Large instances may be over-provisioned. Start with smaller instances and scale up as needed.',
        impact: 'High'
      });
    }

    // Spot instances recommendation
    recommendations.push({
      type: 'cost-optimization',
      title: 'Use Spot/Preemptible Instances',
      description: `Consider using ${cloudProvider === 'aws' ? 'Spot' : cloudProvider === 'azure' ? 'Spot VMs' : 'Preemptible'} instances for non-critical workloads to save up to 90% on compute costs.`,
      impact: 'High'
    });

    // Reserved instances
    recommendations.push({
      type: 'commitment-discount',
      title: 'Reserved Instance Planning',
      description: 'For predictable workloads, consider reserved instances for 1-3 year commitments to save 20-70%.',
      impact: 'Medium'
    });

    return recommendations;
  };

  const getStorageRecommendations = () => {
    return [
      {
        type: 'cost-optimization',
        title: 'Storage Class Optimization',
        description: 'Use lifecycle policies to automatically transition data to cheaper storage classes (IA, Glacier, Archive).',
        impact: 'Medium'
      },
      {
        type: 'governance',
        title: 'Implement Tagging Strategy',
        description: 'Tag all storage resources with cost center, environment, and owner for better cost attribution.',
        impact: 'High'
      }
    ];
  };

  const getNetworkingRecommendations = () => {
    return [
      {
        type: 'cost-optimization',
        title: 'Data Transfer Optimization',
        description: 'Use CDN and regional optimization to minimize data transfer costs between regions.',
        impact: 'Medium'
      },
      {
        type: 'governance',
        title: 'Network ACL Review',
        description: 'Regularly review and optimize security groups and NACLs to prevent over-provisioning.',
        impact: 'Low'
      }
    ];
  };

  const getDatabaseRecommendations = () => {
    return [
      {
        type: 'cost-optimization',
        title: 'Database Right-sizing',
        description: 'Monitor database performance metrics and adjust instance sizes to match actual usage patterns.',
        impact: 'High'
      },
      {
        type: 'automation',
        title: 'Automated Backups',
        description: 'Configure automated backup retention policies to balance data protection with storage costs.',
        impact: 'Medium'
      }
    ];
  };

  const getAllRecommendations = () => {
    let recommendations: any[] = [];
    
    if (selectedResources.includes('compute')) {
      recommendations = [...recommendations, ...getComputeRecommendations()];
    }
    if (selectedResources.includes('storage')) {
      recommendations = [...recommendations, ...getStorageRecommendations()];
    }
    if (selectedResources.includes('networking')) {
      recommendations = [...recommendations, ...getNetworkingRecommendations()];
    }
    if (selectedResources.includes('database')) {
      recommendations = [...recommendations, ...getDatabaseRecommendations()];
    }

    // Add general FinOps recommendations
    recommendations.push({
      type: 'governance',
      title: 'Cost Allocation Tags',
      description: 'Implement consistent tagging strategy across all resources for cost center attribution.',
      impact: 'High'
    });

    recommendations.push({
      type: 'automation',
      title: 'Budget Alerts',
      description: 'Set up automated budget alerts and spending thresholds to prevent cost overruns.',
      impact: 'High'
    });

    return recommendations;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-700 bg-red-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'Low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cost-optimization': return '💰';
      case 'governance': return '🏛️';
      case 'automation': return '🤖';
      case 'commitment-discount': return '📅';
      default: return '💡';
    }
  };

  const recommendations = getAllRecommendations();

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">FinOps Recommendations</h2>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTypeIcon(rec.type)}</span>
                <h3 className="text-sm font-medium text-gray-900">{rec.title}</h3>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(rec.impact)}`}>
                {rec.impact} Impact
              </span>
            </div>
            <p className="text-sm text-gray-600 ml-7">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinOpsRecommendations;
