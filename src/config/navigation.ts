import { MainTab } from '../types/navigation';
import { 
  BarChart3, 
  Bell, 
  FolderKanban, 
  Book, 
  Layout 
} from 'lucide-react';

export const mainTabs: MainTab[] = [
  {
    id: 'financial',
    label: 'Financial',
    icon: BarChart3,
    subTabs: [
      { id: 'dashboard', label: 'Dashboard', path: '/financial/dashboard' },
      { id: 'reports', label: 'Reports', path: '/financial/reports' },
      { id: 'analytics', label: 'Analytics', path: '/financial/analytics' }
    ]
  },
  {
    id: 'updates',
    label: 'Updates',
    icon: Bell,
    subTabs: [
      { id: 'notifications', label: 'Notifications', path: '/updates/notifications' },
      { id: 'alerts', label: 'Alerts', path: '/updates/alerts' }
    ]
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
    subTabs: [
      { id: 'overview', label: 'Overview', path: '/projects/overview' },
      { id: 'tasks', label: 'Tasks', path: '/projects/tasks' },
      { id: 'timeline', label: 'Timeline', path: '/projects/timeline' }
    ]
  },
  {
    id: 'notebook',
    label: 'Notebook',
    icon: Book,
    subTabs: [
      { id: 'notes', label: 'Notes', path: '/notebook/notes' },
      { id: 'documents', label: 'Documents', path: '/notebook/documents' }
    ]
  },
  {
    id: 'workspace',
    label: 'Workspace',
    icon: Layout,
    subTabs: [
      { id: 'board', label: 'Board', path: '/workspace/board' },
      { id: 'calendar', label: 'Calendar', path: '/workspace/calendar' },
      { id: 'files', label: 'Files', path: '/workspace/files' }
    ]
  }
];