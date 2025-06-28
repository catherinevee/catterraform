
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResourceStatsProps {
  resources: Array<{
    category: string;
    type: string;
  }>;
}

export const ResourceStats = ({ resources }: ResourceStatsProps) => {
  const categoryStats = resources.reduce((acc, resource) => {
    acc[resource.category] = (acc[resource.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryStats)
    .map(([category, count]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      count
    }))
    .sort((a, b) => b.count - a.count);

  const totalResources = resources.length;
  const totalCategories = Object.keys(categoryStats).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {totalResources}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">Total AWS Resources</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {totalCategories}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">Service Categories</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Top Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {chartData.slice(0, 5).map((item) => (
              <div key={item.category} className="flex justify-between items-center">
                <span className="text-sm">{item.category}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Resources by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="category" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
