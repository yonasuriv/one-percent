import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SettingsOption } from '../../types/navigation';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultSettings: SettingsOption[] = [
  {
    id: 'darkMode',
    label: 'Dark Mode',
    description: 'Enable dark mode for the application',
    type: 'toggle',
    value: true,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Choose which notifications to receive',
    type: 'select',
    value: 'all',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Important Only', value: 'important' },
      { label: 'None', value: 'none' },
    ],
  },
  {
    id: 'timeFormat',
    label: 'Time Format',
    description: 'Choose your preferred time format',
    type: 'select',
    value: '24h',
    options: [
      { label: '24-hour', value: '24h' },
      { label: '12-hour', value: '12h' },
    ],
  },
];

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const [settings, setSettings] = useState(defaultSettings);

  const handleSettingChange = (id: string, newValue: any) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id ? { ...setting, value: newValue } : setting
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-card w-full max-w-md rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-dark-border">
          <h2 className="text-lg font-medium">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {settings.map((setting) => (
            <div key={setting.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{setting.label}</h3>
                  <p className="text-xs text-gray-400">{setting.description}</p>
                </div>
                {setting.type === 'toggle' ? (
                  <button
                    onClick={() =>
                      handleSettingChange(setting.id, !setting.value)
                    }
                    className={`w-11 h-6 rounded-full transition-colors ${
                      setting.value ? 'bg-emerald-600' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                        setting.value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                ) : setting.type === 'select' ? (
                  <select
                    className="bg-dark-card border border-dark-border rounded-md px-2 py-1 text-sm"
                    value={setting.value}
                    onChange={(e) =>
                      handleSettingChange(setting.id, e.target.value)
                    }
                  >
                    {setting.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-dark-border flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
