import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home, Clock, BarChart2, FolderKanban, Users, UserCircle, Tags, Settings } from 'lucide-react';
import { TabBar } from './components/Navigation/TabBar';
import { SubTabBar } from './components/Navigation/SubTabBar';
import { SettingsMenu } from './components/Settings/SettingsMenu';
import { AuthButton } from './components/Auth/AuthButton';
import { mainTabs } from './config/navigation';
import { supabase } from './lib/supabase';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('financial');
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="bg-dark-card p-8 rounded-lg shadow-xl">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-white font-semibold">ONE%</span>
          </div>
          <AuthButton />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AppContent 
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        session={session}
      />
    </Router>
  );
}

function AppContent({ 
  isSettingsOpen, 
  setIsSettingsOpen, 
  activeTab, 
  setActiveTab,
  session 
}: { 
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  session: any;
}) {
  const location = useLocation();
  const currentTab = mainTabs.find(tab => tab.id === activeTab);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="sidebar w-56 p-4 flex flex-col">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-white font-semibold">solidtime</span>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-blue-600/20 rounded flex items-center justify-center">
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-gray-400">1h 23min</span>
        </div>

        <nav className="space-y-1">
          <NavItem icon={Home} label="Dashboard" active />
          <NavItem icon={Clock} label="Time" />
          <NavItem icon={BarChart2} label="Reporting" />
        </nav>

        <div className="mt-8 mb-4">
          <span className="text-xs font-medium text-gray-500 uppercase">Manage</span>
        </div>

        <nav className="space-y-1">
          <NavItem icon={FolderKanban} label="Projects" />
          <NavItem icon={Users} label="Clients" />
          <NavItem icon={UserCircle} label="Team" />
          <NavItem icon={Tags} label="Tags" />
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full"
          >
            <NavItem icon={Settings} label="Settings" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 p-6">
        {/* Header with Tabs */}
        <div className="mb-6">
          <TabBar
            tabs={mainTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          {currentTab && (
            <div className="mt-4">
              <SubTabBar
                subTabs={currentTab.subTabs}
                currentPath={location.pathname}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <Routes>
          <Route path="/" element={<Navigate to="/financial/dashboard" replace />} />
          
          {mainTabs.map(tab => 
            tab.subTabs.map(subTab => (
              <Route
                key={subTab.path}
                path={subTab.path}
                element={
                  <div className="card p-6">
                    <h1 className="text-xl font-medium mb-4">{subTab.label}</h1>
                    <p className="text-gray-400">Content for {tab.label} - {subTab.label}</p>
                  </div>
                }
              />
            ))
          )}
        </Routes>
      </div>

      {/* Right Sidebar */}
      <div className="sidebar w-64 p-4">
        <h2 className="text-sm font-medium mb-4">Team Activity</h2>
        <div className="space-y-4">
          <TeamMember 
            name="Gregor Vostrak"
            role="Landing Page Design"
            status="working"
          />
          <TeamMember 
            name="Constantin Graf"
            role="Kubernetes Setup"
            status="working"
          />
          <TeamMember 
            name="John Doe"
            role="Market Research"
          />
          <TeamMember 
            name="Jane Doe"
            role="Competitor Analysis"
          />
        </div>

        <div className="mt-8 space-y-4">
          <StatsCard label="Total time" value="17h 48min" />
          <StatsCard label="Amount" value="$ 1.380" />
          <StatsCard label="Billable" value="17h 03min" />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsMenu
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

const NavItem = ({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer ${active ? 'bg-blue-600/10 text-blue-500' : 'text-gray-400 hover:bg-gray-800/30'}`}>
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </div>
);

const TaskItem = ({ title, tag, time }: { title: string, tag: string, time: string }) => (
  <div className="card p-3 flex items-center justify-between">
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-blue-500">{tag}</div>
    </div>
    <div className="text-sm text-gray-400">{time}</div>
  </div>
);

const DayItem = ({ day, time }: { day: string, time: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-400">{day}</span>
    <div className="flex items-center space-x-2">
      <div className="w-20 h-2 bg-blue-900/20 rounded-full">
        <div className="w-1/3 h-full bg-blue-500 rounded-full" />
      </div>
      <span className="text-sm text-gray-400">{time}</span>
    </div>
  </div>
);

const TeamMember = ({ name, role, status }: { name: string, role: string, status?: string }) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-gray-400">{role}</div>
    </div>
    {status && (
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        <span className="text-xs text-emerald-500">working</span>
      </div>
    )}
  </div>
);

const StatsCard = ({ label, value }: { label: string, value: string }) => (
  <div className="card p-3">
    <div className="text-xs text-gray-400">{label}</div>
    <div className="text-sm font-medium mt-1">{value}</div>
  </div>
);

export default App;