import React, { useState } from 'react';
import { User, LogOut, Settings, MessageSquare, Bell } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AuthButton } from './AuthButton';

interface UserMenuProps {
  session: any;
  onOpenSettings: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  session,
  onOpenSettings,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New message from John', read: false },
    { id: 2, text: 'Task completed', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!session) {
    return <AuthButton />;
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800/30 transition-colors"
        >
          {session.user.user_metadata?.avatar_url ? (
            <img
              src={session.user.user_metadata.avatar_url}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
          <span className="text-sm text-gray-200">
            {session.user.user_metadata?.full_name || session.user.email}
          </span>
        </button>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-dark-card rounded-lg shadow-xl border border-dark-border">
          <div className="p-4">
            <h3 className="text-sm font-medium mb-3">Notifications</h3>
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-2 rounded-md ${
                    notification.read ? 'bg-gray-800/30' : 'bg-emerald-600/10'
                  }`}
                >
                  <p className="text-sm">{notification.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-dark-card rounded-lg shadow-xl border border-dark-border">
          <div className="p-2">
            <button
              onClick={onOpenSettings}
              className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800/30 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800/30 transition-colors text-red-400"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
