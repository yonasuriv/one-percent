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
    <div className="flex space-x-1">
      {subTabs.map((subTab) => {
        const isActive = currentPath === subTab.path;

        return (
          <button
            key={subTab.id}
            onClick={() => navigate(subTab.path)}
            className={clsx(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
              isActive
                ? 'bg-emerald-600/10 text-emerald-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
            )}
          >
            {subTab.label}
          </button>
        );
      })}
    </div>
  );
};
