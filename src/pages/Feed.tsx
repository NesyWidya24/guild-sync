import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, CheckSquare, Calendar, BarChart3, Send, Heart, MessageCircle } from 'lucide-react';

export default function Feed() {
  const [newMessage, setNewMessage] = useState('');

  const feedItems = [
    {
      id: 1,
      type: 'message',
      author: 'John Doe',
      content: 'Just completed the Q4 review. Great progress everyone!',
      timestamp: '2 hours ago',
      likes: 5,
      comments: 2,
    },
    {
      id: 2,
      type: 'task',
      author: 'Sarah Wilson',
      content: 'New task assigned: Update user documentation',
      priority: 'high',
      dueDate: 'Tomorrow',
      timestamp: '4 hours ago',
      likes: 2,
      comments: 1,
    },
    {
      id: 3,
      type: 'event',
      author: 'Mike Johnson',
      content: 'Team building event scheduled for Friday',
      location: 'Conference Room A',
      time: '3:00 PM',
      timestamp: '1 day ago',
      likes: 8,
      comments: 5,
    },
    {
      id: 4,
      type: 'poll',
      author: 'Emily Chen',
      content: 'Which project should we prioritize next quarter?',
      options: ['Mobile App', 'Web Platform', 'API Improvements'],
      votes: [12, 8, 15],
      timestamp: '2 days ago',
      likes: 3,
      comments: 7,
    },
  ];

  const renderFeedItem = (item: any) => {
    const getIcon = () => {
      switch (item.type) {
        case 'task': return <CheckSquare className="h-4 w-4" />;
        case 'event': return <Calendar className="h-4 w-4" />;
        case 'poll': return <BarChart3 className="h-4 w-4" />;
        default: return <MessageSquare className="h-4 w-4" />;
      }
    };

    const getTypeColor = () => {
      switch (item.type) {
        case 'task': return 'bg-blue-500';
        case 'event': return 'bg-green-500';
        case 'poll': return 'bg-purple-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <Card key={item.id} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full text-white ${getTypeColor()}`}>
              {getIcon()}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{item.author}</h4>
                <span className="text-sm text-muted-foreground">{item.timestamp}</span>
              </div>
              <Badge variant="secondary" className="mt-1">
                {item.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-3">{item.content}</p>
          
          {item.type === 'task' && (
            <div className="flex space-x-2 mb-3">
              <Badge variant={item.priority === 'high' ? 'destructive' : 'default'}>
                {item.priority} priority
              </Badge>
              <Badge variant="outline">Due: {item.dueDate}</Badge>
            </div>
          )}
          
          {item.type === 'event' && (
            <div className="flex space-x-2 mb-3">
              <Badge variant="outline">📍 {item.location}</Badge>
              <Badge variant="outline">🕒 {item.time}</Badge>
            </div>
          )}
          
          {item.type === 'poll' && (
            <div className="space-y-2 mb-3">
              {item.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted">
                  <span>{option}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-background rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(item.votes[index] / Math.max(...item.votes)) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.votes[index]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-center space-x-4 pt-2 border-t">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-1" />
              {item.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              {item.comments}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Feed</h1>
        <p className="text-muted-foreground">Stay updated with team activities</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Create Post */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Share an update</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="message">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="message">Message</TabsTrigger>
                  <TabsTrigger value="task">Task</TabsTrigger>
                  <TabsTrigger value="event">Event</TabsTrigger>
                  <TabsTrigger value="poll">Poll</TabsTrigger>
                </TabsList>
                
                <TabsContent value="message" className="space-y-4">
                  <Textarea 
                    placeholder="What's on your mind?"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Post Message
                  </Button>
                </TabsContent>
                
                <TabsContent value="task" className="space-y-4">
                  <Input placeholder="Task title" />
                  <Textarea placeholder="Task description" />
                  <div className="flex space-x-2">
                    <Input type="date" />
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>Low Priority</option>
                      <option>Medium Priority</option>
                      <option>High Priority</option>
                    </select>
                  </div>
                  <Button>Create Task</Button>
                </TabsContent>
                
                <TabsContent value="event" className="space-y-4">
                  <Input placeholder="Event title" />
                  <Textarea placeholder="Event description" />
                  <div className="flex space-x-2">
                    <Input type="datetime-local" />
                    <Input placeholder="Location" />
                  </div>
                  <Button>Create Event</Button>
                </TabsContent>
                
                <TabsContent value="poll" className="space-y-4">
                  <Input placeholder="Poll question" />
                  <Input placeholder="Option 1" />
                  <Input placeholder="Option 2" />
                  <Input placeholder="Option 3" />
                  <Button>Create Poll</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Feed Items */}
          <div>
            {feedItems.map(renderFeedItem)}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Today's Messages</span>
                <Badge>12</Badge>
              </div>
              <div className="flex justify-between">
                <span>Active Tasks</span>
                <Badge>8</Badge>
              </div>
              <div className="flex justify-between">
                <span>Upcoming Events</span>
                <Badge>3</Badge>
              </div>
              <div className="flex justify-between">
                <span>Open Polls</span>
                <Badge>2</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['John Doe', 'Sarah Wilson', 'Mike Johnson', 'Emily Chen'].map((name, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
                      {name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{name}</p>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}