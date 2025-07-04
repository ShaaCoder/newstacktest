'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Calendar, Reply, Archive } from 'lucide-react';
import { toast } from 'sonner';

interface Query {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved' | 'archived';
  created_at: string;
  replied_at?: string;
  reply_message?: string;
}

export function QueryManager() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await fetch('/api/admin/queries');
      const data = await response.json();
      setQueries(data.queries || []);
    } catch (error) {
      console.error('Failed to fetch queries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (queryId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/queries/${queryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setQueries(queries.map(q => 
          q.id === queryId ? { ...q, status: newStatus as Query['status'] } : q
        ));
        toast.success('Status updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleReply = async (queryId: string) => {
    if (!replyMessage.trim()) return;

    try {
      const response = await fetch(`/api/admin/queries/${queryId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: replyMessage }),
      });

      if (response.ok) {
        setQueries(queries.map(q => 
          q.id === queryId 
            ? { 
                ...q, 
                status: 'resolved',
                replied_at: new Date().toISOString(),
                reply_message: replyMessage 
              } 
            : q
        ));
        setReplyingTo(null);
        setReplyMessage('');
        toast.success('Reply sent successfully');
      }
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  const filteredQueries = queries.filter(query => {
    if (filter === 'all') return true;
    return query.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Client Queries</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Queries</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <Card key={query.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{query.name}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {query.email}
                      </div>
                      {query.company && <span>• {query.company}</span>}
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(query.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(query.status)}>
                      {query.status.replace('-', ' ')}
                    </Badge>
                    {query.status !== 'archived' && (
                      <Select
                        value={query.status}
                        onValueChange={(value) => handleStatusChange(query.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{query.message}</p>
                
                {query.reply_message && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                    <p className="text-sm font-medium text-blue-800">Your Reply:</p>
                    <p className="text-blue-700 mt-1">{query.reply_message}</p>
                    <p className="text-xs text-blue-600 mt-2">
                      Sent on {new Date(query.replied_at!).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {replyingTo === query.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      rows={4}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={() => handleReply(query.id)}>
                        Send Reply
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyMessage('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    {query.status !== 'resolved' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setReplyingTo(query.id)}
                      >
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    )}
                    {query.status !== 'archived' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(query.id, 'archived')}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}