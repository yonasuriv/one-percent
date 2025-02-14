import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainTab } from '../../types/navigation';
import { clsx } from 'clsx';

interface TabBarProps {
  tabs: MainTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab: MainTab) => {
    onTabChange(tab.id);
    navigate(tab.subTabs[0].path);
  };

  return (
    <div className="flex space-x-1 bg-dark-card p-1 rounded-lg">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={clsx(
              'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all',
              isActive
                ? 'bg-blue-600/10 text-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
            )}
          >
            <Icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};