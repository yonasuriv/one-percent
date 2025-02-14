import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TabBar } from '../components/Navigation/TabBar';
import { SubTabBar } from '../components/Navigation/SubTabBar';
import { mainTabs } from '../config/navigation';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    return mainTabs.find(tab => 
      tab.subTabs.some(subTab => subTab.path === path)
    )?.id || mainTabs[0].id;
  });

  const currentTab = mainTabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-1">
              <TabBar
                tabs={mainTabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </div>
          {currentTab && (
            <div className="py-2">
              <SubTabBar
                subTabs={currentTab.subTabs}
                currentPath={location.pathname}
              />
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};