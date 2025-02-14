import { DivideIcon as LucideIcon } from 'lucide-react';

export interface SubTab {
  id: string;
  label: string;
  path: string;
}

export interface MainTab {
  id: string;
  label: string;
  icon: LucideIcon;
  subTabs: SubTab[];
}

export interface SettingsOption {
  id: string;
  label: string;
  description: string;
  type: 'toggle' | 'select' | 'input';
  value?: any;
  options?: { label: string; value: any }[];
}