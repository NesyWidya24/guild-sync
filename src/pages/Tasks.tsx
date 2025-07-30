import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = [
    {
      id: 1,
      title: 'Review project proposal',
      description: 'Review and provide feedback on the Q4 project proposal',
      status: 'pending',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2024-07-31',
      project: 'Q4 Planning',
      tags: ['review', 'urgent'],
    },
    {
      id: 2,
      title: 'Update documentation',
      description: 'Update the API documentation with new endpoints',
      status: 'in_progress',
      priority: 'medium',
      assignee: 'Sarah Wilson',
      dueDate: '2024-08-02',
      project: 'API Development',
      tags: ['documentation', 'api'],
    },
    {
      id: 3,
      title: 'Bug fix implementation',
      description: 'Fix the login authentication bug reported by users',
      status: 'pending',
      priority: 'high',
      assignee: 'Mike Johnson',
      dueDate: '2024-07-30',
      project: 'User Management',
      tags: ['bug', 'security'],
    },
    {
      id: 4,
      title: 'Design system updates',
      description: 'Update the design system components for better accessibility',
      status: 'completed',
      priority: 'low',
      assignee: 'Emily Chen',
      dueDate: '2024-07-28',
      project: 'Design System',
      tags: ['design', 'accessibility'],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const filterTasksByStatus = (status: string) => {
    if (status === 'all') return tasks;
    return tasks.filter(task => task.status === status);
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(task.status)}
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          <Badge variant={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span><strong>Assignee:</strong> {task.assignee}</span>
              <span><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <Badge variant="outline">{task.project}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {task.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
              {task.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your team's tasks</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Task List */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div>
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              <div>
                {filterTasksByStatus('pending').map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="in_progress" className="mt-6">
              <div>
                {filterTasksByStatus('in_progress').map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div>
                {filterTasksByStatus('completed').map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Total Tasks</span>
                <Badge>{tasks.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <Badge variant="secondary">
                  {tasks.filter(t => t.status === 'pending').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>In Progress</span>
                <Badge variant="default">
                  {tasks.filter(t => t.status === 'in_progress').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Completed</span>
                <Badge variant="default">
                  {tasks.filter(t => t.status === 'completed').length}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { action: 'Task completed', task: 'Design system updates', time: '2 hours ago' },
                { action: 'Task assigned', task: 'Bug fix implementation', time: '4 hours ago' },
                { action: 'Task updated', task: 'Review project proposal', time: '1 day ago' },
              ].map((activity, index) => (
                <div key={index} className="p-2 rounded bg-muted">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.task}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}