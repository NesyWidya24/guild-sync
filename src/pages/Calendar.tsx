import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from 'lucide-react';

export default function Calendar() {
  const [currentDate] = useState(new Date());
  
  const events = [
    {
      id: 1,
      title: 'Daily Standup',
      time: '09:00 AM',
      duration: '30 min',
      type: 'meeting',
      location: 'Conference Room A',
      attendees: 5,
    },
    {
      id: 2,
      title: 'Project Review',
      time: '11:30 AM',
      duration: '1 hour',
      type: 'review',
      location: 'Virtual',
      attendees: 8,
    },
    {
      id: 3,
      title: 'Client Presentation',
      time: '02:00 PM',
      duration: '45 min',
      type: 'presentation',
      location: 'Main Hall',
      attendees: 12,
    },
    {
      id: 4,
      title: 'Team Building',
      time: '04:00 PM',
      duration: '2 hours',
      type: 'event',
      location: 'Recreation Area',
      attendees: 15,
    },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      case 'presentation': return 'bg-green-500';
      case 'event': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                {currentDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </CardTitle>
              <CardDescription>Weekly view</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simple calendar grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-medium py-2 text-sm">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
                  const isToday = date.toDateString() === new Date().toDateString();
                  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ${
                        isToday 
                          ? 'bg-primary text-primary-foreground' 
                          : isCurrentMonth 
                            ? 'hover:bg-muted' 
                            : 'text-muted-foreground'
                      }`}
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Events</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border rounded-lg p-3">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${getEventColor(event.type)}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{event.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time} • {event.duration}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary">{event.type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {event.attendees} attendees
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: 'Quarterly Review', date: 'Tomorrow', type: 'meeting' },
                { title: 'Product Launch', date: 'Wednesday', type: 'event' },
                { title: 'Training Session', date: 'Friday', type: 'training' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted">
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}