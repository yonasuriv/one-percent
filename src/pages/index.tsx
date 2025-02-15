import React from 'react';
import TaskItem from '../components/TaskItem';
import DayItem from '../components/DayItem';

function IndexPage() {
  return (
    <div className="main-content flex-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="card px-4 py-2">
          <h1 className="text-lg font-medium">Landing Page Design</h1>
          <span className="text-xs text-blue-500">Website</span>
        </div>
        <div className="text-2xl font-medium">1:23:27</div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Recently Tracked Tasks */}
        <div className="col-span-4">
          <h2 className="text-sm font-medium mb-4">Recently Tracked Tasks</h2>
          <div className="space-y-3">
            <TaskItem
              title="Competitive Research"
              tag="Research"
              time="6h 23min"
            />
            <TaskItem
              title="Change Button Color"
              tag="Development"
              time="2h 59min"
            />
            <TaskItem
              title="Landing Page Design"
              tag="Website"
              time="4h 25min"
            />
          </div>
        </div>

        {/* Last 7 Days */}
        <div className="col-span-4">
          <h2 className="text-sm font-medium mb-4">Last 7 Days</h2>
          <div className="space-y-3">
            <DayItem day="Today" time="6h 23min" />
            <DayItem day="Yesterday" time="2h 59min" />
            <DayItem day="Wednesday" time="4h 25min" />
            <DayItem day="Tuesday" time="1h 03min" />
            <DayItem day="Monday" time="2h 59min" />
            <DayItem day="Sunday" time="4h 25min" />
            <DayItem day="Saturday" time="6h 23min" />
          </div>
        </div>

        {/* Activity Graph */}
        <div className="col-span-4">
          <h2 className="text-sm font-medium mb-4">Activity Graph</h2>
          <div className="grid grid-cols-7 gap-1">
            {Array(35)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className={
                    i % 2 === 0 ? 'activity-cell' : 'activity-cell-empty'
                  }
                />
              ))}
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="mt-8">
        <h2 className="text-sm font-medium mb-4">This Week</h2>
        <div className="h-48 flex items-end justify-between">
          {[
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ].map((day, i) => (
            <div key={day} className="flex flex-col items-center">
              <div
                className="w-16 bg-blue-900/20 rounded-md"
                style={{ height: `${[30, 40, 50, 35, 25, 10, 5][i]}%` }}
              />
              <span className="text-xs text-gray-500 mt-2">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
