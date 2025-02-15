import React, { useState, useEffect } from 'react';
import Logo from '/src/assets/images/logo.png';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Home,
  Clock,
  Rss,
  Newspaper,
  Calendar,
  Mails,
  Tv,
  LucideLayoutPanelLeft,
  HeartPulse,
  BookHeart,
  NotebookPen,
  Banknote,
  Layers,
  BarChart2,
  FolderKanban,
  Users,
  UserCircle,
  Settings,
  BrainCircuit,
} from 'lucide-react';
import { LogIn } from 'lucide-react';
import { TabBar } from './components/Navigation/TabBar';
import { SubTabBar } from './components/Navigation/SubTabBar';
import { SettingsMenu } from './components/Settings/SettingsMenu';
import { UserMenu } from './components/Auth/UserMenu';
import { ChatList } from './components/Messages/ChatList';
import { mainTabs } from './config/navigation';
import { supabase } from './lib/supabase';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
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
  session,
}: {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  session: any;
}) {
  const location = useLocation();
  const currentTab = mainTabs.find((tab) => tab.id === activeTab);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="sidebar w-56 p-4 flex flex-col">
        <div className="flex items-center mb-4 p-4 ml-8">
          {/* <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
            <span className="text-white font-bold">1%</span>
          </div>
          <span className="text-white font-semibold">ONE %</span> */}
          <img src={Logo} alt="My Image" width={100} />
        </div>

        <div className="mt-0 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            Overview
          </span>
        </div>
        <nav className="space-y-1">
          <NavItem icon={Home} label="Home" active />
          <NavItem icon={Calendar} label="Calendar" />
          <NavItem icon={Mails} label="Messages" />
        </nav>

        <div className="mt-6 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            Automate
          </span>
        </div>
        <nav className="space-y-1">
          <NavItem icon={BrainCircuit} label="AI Agent" />{' '}
        </nav>

        <div className="mt-6 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            Manage
          </span>
        </div>

        <nav className="space-y-1">
          <NavItem icon={Newspaper} label="News" />
          <NavItem icon={UserCircle} label="Team" />
          <NavItem icon={Users} label="Clients" />
          <NavItem icon={FolderKanban} label="Projects" />
        </nav>

        <div className="mt-6 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            Workspace
          </span>
        </div>
        <nav className="space-y-1">
          <NavItem icon={Rss} label="News" />
          <NavItem icon={HeartPulse} label="Health" />
          <NavItem icon={BookHeart} label="Journal" />
          <NavItem icon={Banknote} label="Finances" />
          <NavItem icon={NotebookPen} label="Notebook" />
        </nav>

        {/* INTEGRATIONS */}
        {/* Divider Line */}
        <div className="mt-auto"></div>

        {/* Explore */}
        <div className="mt-6 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            Explore
          </span>
        </div>
        <nav className="space-y-1">
          <NavItem icon={LucideLayoutPanelLeft} label="Apps" />
        </nav>

        {/* Discover */}
        <div className="mt-6 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            Discover
          </span>
        </div>
        <nav className="space-y-1">
          <NavItem icon={Layers} label="Spaces" />
          <NavItem icon={Tv} label="Channels" />
        </nav>

        {/* SETTINGS */}
        <div className="mt-auto">
          <button onClick={() => setIsSettingsOpen(true)} className="w-full">
            <NavItem icon={Settings} label="Settings" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-col">
        {/* Header */}
        {/* <div className="p-4 border-b border-dark-border flex items-center justify-between"> */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1">
            <TabBar
              tabs={mainTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          <div className="ml-4">
            <UserMenu
              session={session}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          </div>
        </div>

        {/* Sub Navigation - Disabled for the moment*/}
        {/* {currentTab && (
          <div className="px-4 py-2 border-b border-dark-border">
            <SubTabBar
              subTabs={currentTab.subTabs}
              currentPath={location.pathname}
            />
          </div>
        )} */}

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/financial/dashboard" replace />}
            />

            {/* Messages Routes */}
            <Route path="/messages/chats" element={<ChatList />} />

            {/* Other Routes */}
            {mainTabs.map((tab) =>
              tab.subTabs.map((subTab) => (
                <Route
                  key={subTab.path}
                  path={subTab.path}
                  element={
                    <div className="p-6">
                      <div className="card p-6">
                        <h1 className="text-xl font-medium mb-4">
                          {subTab.label}
                        </h1>
                        <p className="text-gray-400">
                          {/* {tab.label} {subTab.label} Placeholder Content */}
                          {tab.label} Placeholder Content
                        </p>
                      </div>
                    </div>
                  }
                />
              ))
            )}
          </Routes>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="sidebar w-64 p-4">
        <div className="ml-24 space-x-3 mt-0 mb-6 space-x-3">
          <button className="flex items-center px-4 py-2 text-white rounded-md hover:bg-emerald-700 transition-colors">
            <img
              src="https://netlify.com/favicon.ico"
              alt="Sign In"
              className="w-4 h-4 ml-2 mr-4"
            />
            Sign in
          </button>
        </div>

        <div className="mt-0 mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            <h2 className="text-sm font-medium mb-4">Team Activity</h2>
          </span>
        </div>

        <div className="space-y-4">
          <TeamMember
            name="Jonathan Di Rico"
            role="Security Lead"
            status="Online"
          />

          <TeamMember name="Ana Škifić" role="Market Lead" status="" />

          <TeamMember name="Viktor Škifić" role="Development Lead" status="" />

          <TeamMember name="Irene Trtan" role="Deisgn Lead" status="" />

          <TeamMember name="John Doe" role="Market Research" status="" />

          <TeamMember name="Jane Smith" role="Landing Page Design" status="" />
          <TeamMember
            name="Constantin Graf"
            role="Kubernetes Setup"
            status=""
          />
          <TeamMember name="Anastasia Voks" role="Sales" status="" />
          <TeamMember name="Jin Wu" role="Competitor Analysis" status="" />
        </div>

        <div className="mt-8">
          <span className="text-xs font-medium text-gray-500 uppercase">
            <h2 className="text-sm font-medium mb-4">Enabled Widgets</h2>
          </span>
        </div>

        <div className="mt-4 space-y-4">
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

const NavItem = ({
  icon: Icon,
  label,
  active,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) => (
  <div
    className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer ${
      active
        ? 'bg-emerald-600/10 text-emerald-500'
        : 'text-gray-400 hover:bg-emerald-800/30'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </div>
);

const TeamMember = ({
  name,
  role,
  status,
}: {
  name: string;
  role: string;
  status?: string;
}) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-gray-400">{role}</div>
    </div>
    {status && (
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        <span className="text-xs text-emerald-500">{status}</span>
      </div>
    )}
  </div>
);

<div className="mt-0 mb-2">
  <span className="text-xs font-medium text-gray-500 uppercase">
    <h2 className="text-sm font-medium mb-4">Team Activity</h2>
  </span>
</div>;

const StatsCard = ({ label, value }: { label: string; value: string }) => (
  <div className="card p-2">
    <div className="text-xs text-gray-400 uppercase mt-0 mb-2">{label}</div>
    <div className="text-sm font-medium mt-1">{value}</div>
  </div>
);

export default App;
