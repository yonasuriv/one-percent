import React from 'react';
import { User } from 'lucide-react';

interface Chat {
  id: string;
  user: {
    name: string;
    avatar?: string;
    online?: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
}

const mockChats: Chat[] = [
  {
    id: '1',
    user: { name: 'John Doe', online: true },
    lastMessage: "Hey, how's the project going?",
    timestamp: '2m ago',
    unread: true,
  },
  {
    id: '2',
    user: { name: 'Jane Smith', online: false },
    lastMessage: 'The design looks great!',
    timestamp: '1h ago',
  },
];

export const ChatList: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-dark-border">
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full px-4 py-2 bg-dark-card border border-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 flex items-center space-x-3 hover:bg-gray-800/30 cursor-pointer ${
              chat.unread ? 'bg-emerald-600/5' : ''
            }`}
          >
            <div className="relative">
              {chat.user.avatar ? (
                <img
                  src={chat.user.avatar}
                  alt={chat.user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
              {chat.user.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium truncate">{chat.user.name}</span>
                <span className="text-xs text-gray-400">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </div>

            {chat.unread && (
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-dark-border">
        <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
          New Message
        </button>
      </div>
    </div>
  );
};
