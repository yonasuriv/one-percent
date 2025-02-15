import { MainTab } from '../types/navigation';
import { 
  Gauge,
  BarChart3, 
  Bell, 
  FolderKanban, 
  Book, 
  Layout,
  MessageSquare
} from 'lucide-react';

export const mainTabs: MainTab[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Gauge,
    subTabs: [{ id: 'index', label: 'Home', path: '/dashboard' }]
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: MessageSquare,
    subTabs: [
      { id: 'chats', label: 'Chats', path: '/messages/chats' },
      { id: 'contacts', label: 'Contacts', path: '/messages/contacts' }
    ]
  },
  {
    id: 'financial',
    label: 'Examples',
    icon: BarChart3,
    subTabs: [
      { id: 'board', label: 'Board', path: '/workspace/board' },
      { id: 'statistics', label: 'Statistics', path: '/financial/statistics' },
      { id: 'reports', label: 'Reports', path: '/financial/reports' },
      { id: 'analytics', label: 'Analytics', path: '/financial/analytics' },
      { id: 'notifications', label: 'Notifications', path: '/updates/notifications' },
      { id: 'alerts', label: 'Alerts', path: '/updates/alerts' },
      { id: 'tasks', label: 'Tasks', path: '/projects/tasks' },
      { id: 'timeline', label: 'Timeline', path: '/projects/timeline' },
      { id: 'documents', label: 'Documents', path: '/notebook/documents' },
      { id: 'files', label: 'Files', path: '/workspace/files' }
    ]
  }
];