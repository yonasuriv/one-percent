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
      <div className="w-full p-4 flex items-center justify-end space-x-5">
        <input
          type="text"
          placeholder="Search messages..."
          className="px-4 py-2 bg-emerald-900/10 border border-emerald-900 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
          New Message
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 flex items-center space-x-3 rounded hover:bg-emerald-800/30 rounded cursor-pointer ${
              chat.unread ? 'bg-emerald-900/5' : ''
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

            <div className="flex-1 min-w-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center justify-between font-medium truncate">
                  {chat.user.name}
                  {chat.unread && (
                    <span className="text-xs text-[#05a89b] px-2">
                      <p>UNREAD</p>
                    </span>
                  )}
                </span>
              </div>

              <p className="text-sm text-gray-400 truncate py-1">
                {chat.lastMessage}
              </p>
            </div>

            <span className="grid text-xs text-gray-400 h-2">
              {chat.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
