import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubTab } from '../../types/navigation';
import { clsx } from 'clsx';

interface SubTabBarProps {
  subTabs: SubTab[];
  currentPath: string;
}

export const SubTabBar: React.FC<SubTabBarProps> = ({
  subTabs,
  currentPath,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-2 pl-2 pr-2 rounded-lg">
      {subTabs.map((subTab) => {
        const isActive = currentPath === subTab.path;

        return (
          <button
            key={subTab.id}
            onClick={() => navigate(subTab.path)}
            className={clsx(
              'w-full p-2 justify-between rounded-md text-sm font-medium transition-all',
              'gap-20',
              isActive
                ? 'bg-emerald-800/10 text-emerald-500'
                : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-800/30'
            )}            
          >
            {subTab.label}
          </button>
        );
      })}
    </div>
  );
};
