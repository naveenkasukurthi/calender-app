import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Menu, Plus, Users } from 'lucide-react';

const ModernCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      date: '2025-05-10',
      time: '10:00',
      endTime: '11:00',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: '2025-05-10',
      time: '14:00',
      endTime: '16:00',
      type: 'deadline'
    },
    {
      id: 3,
      title: 'Code Review',
      date: '2025-05-15',
      time: '09:00',
      endTime: '10:00',
      type: 'review'
    },
    {
      id: 4,
      title: 'Lunch with Sabrina',
      date: '2025-05-02',
      time: '12:00',
      endTime: '13:00',
      type: 'social'
    },
    {
      id: 5,
      title: 'Breakfast with Steven',
      date: '2025-05-04',
      time: '08:00',
      endTime: '09:00',
      type: 'social'
    },
    {
      id: 6,
      title: 'Weekly Stand Up',
      date: '2025-05-08',
      time: '13:00',
      endTime: '14:30',
      type: 'meeting'
    }
  ];

  // Helper functions for date manipulation
  const getMonthName = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  };
  
  const getYear = (date) => {
    return date.getFullYear();
  };
  
  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    // Adjust to start from Monday (or Sunday)
    startOfWeek.setDate(startOfWeek.getDate() - day);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    
    return weekDates;
  };
  
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  const getDayNumber = (date) => {
    return date.getDate();
  };
  
  const getDayName = (date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };
  
  const navigatePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Events for a specific date
  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };
  
  // Function to determine if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  // Color mapping for event types
  const eventColors = {
    meeting: 'bg-blue-100 border-l-4 border-blue-500',
    deadline: 'bg-red-100 border-l-4 border-red-500',
    review: 'bg-green-100 border-l-4 border-green-500',
    social: 'bg-yellow-100 border-l-4 border-yellow-500'
  };
  
  // Get Month days for month view
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay(); // 0 for Sunday
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Create calendar grid with padding
    const days = [];
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 shrink-0">
        <div className="mb-8">
          <Menu className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex flex-col gap-6">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Clock className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100">
            <Calendar className="w-6 h-6 text-blue-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Users className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-2">
              {getMonthName(currentDate)} {getYear(currentDate)}
            </h1>
            <select 
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="ml-4 border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={navigatePrev}
              className="p-1 rounded hover:bg-gray-100 mr-2"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={navigateNext}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            <button className="ml-6 bg-black text-white rounded px-3 py-1 text-sm flex items-center">
              <Plus className="w-4 h-4 mr-1" /> Add event
            </button>
          </div>
        </header>
        
        {/* Calendar Content */}
        <div className="flex-1 p-4">
          <p className="text-gray-600 mb-6">
            Here all your planned events. You will find information for each event as well you can planned new one.
          </p>
          
          {viewMode === 'week' ? (
            // Week View
            <div className="grid grid-cols-7 gap-4">
              {getWeekDates().map((date, index) => (
                <div key={index} className="flex flex-col">
                  {/* Day Header */}
                  <div className={`text-center mb-2 ${isToday(date) ? 'text-red-500' : ''}`}>
                    <div className="uppercase font-medium text-sm">{getDayName(date)}</div>
                    <div className={`text-2xl mt-1 ${isToday(date) ? 'bg-red-50 rounded-full w-10 h-10 flex items-center justify-center mx-auto' : ''}`}>
                      {getDayNumber(date)}
                    </div>
                  </div>
                  
                  {/* Day Events */}
                  <div className={`flex-1 rounded-lg p-2 ${isToday(date) ? 'bg-red-50' : ''}`}>
                    {getEventsForDate(date).map((event) => (
                      <div 
                        key={event.id} 
                        className={`mb-2 p-2 rounded ${eventColors[event.type] || 'bg-gray-100'}`}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs text-gray-600">
                          {event.time} – {event.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Month View
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="grid grid-cols-7 text-center py-2 border-b border-gray-200">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
                  <div key={i} className="text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {getMonthDays().map((date, i) => (
                  <div 
                    key={i} 
                    className={`min-h-24 p-2 bg-white ${!date ? 'text-gray-300' : ''} ${date && isToday(date) ? 'bg-blue-50' : ''}`}
                  >
                    {date && (
                      <>
                        <div className="font-medium">{getDayNumber(date)}</div>
                        <div className="mt-1">
                          {getEventsForDate(date).map((event) => (
                            <div 
                              key={event.id}
                              className="text-xs p-1 mb-1 truncate rounded bg-gray-100"
                            >
                              {event.time} {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernCalendar;
