'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquare, Eye, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';

interface Stats {
  totalPosts: number;
  totalQueries: number;
  pendingQueries: number;
  monthlyViews: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    totalQueries: 0,
    pendingQueries: 0,
    monthlyViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Blog Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Client Queries',
      value: stats.totalQueries,
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Pending Queries',
      value: stats.pendingQueries,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Monthly Views',
      value: stats.monthlyViews,
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bgColor} rounded-lg p-2`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-2 mr-3">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New blog post published</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-2 mr-3">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New client inquiry received</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-2 mr-3">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Website traffic increased 15%</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Create New Blog Post
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                View Pending Queries
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}