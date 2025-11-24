import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
    LayoutGrid, Plus, Star, LogOut, Code2, Settings, Hash,
    Sun, Moon, Clock, Archive, Search, Bell, ChevronDown,
    Folder, FileCode
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, badge, active }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-secondary/50'}`}
        style={({ isActive }) => ({
            background: isActive ? 'var(--bg-active)' : 'transparent',
            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
            marginBottom: '4px'
        })}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} />
            <span className="font-medium text-sm">{label}</span>
        </div>
        {badge && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                {badge}
            </span>
        )}
    </NavLink>
);

const SectionHeader = ({ label }) => (
    <div className="px-4 mt-6 mb-2">
        <span className="text-xs font-bold text-muted uppercase tracking-wider">{label}</span>
    </div>
);

const CollectionItem = ({ color, label, count }) => (
    <button className="w-full flex items-center justify-between px-4 py-2 text-muted hover:text-primary transition-colors">
        <div className="flex items-center gap-3">
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }}></div>
            <span className="text-sm">{label}</span>
        </div>
        {count && <span className="text-xs text-muted">{count}</span>}
    </button>
);

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-[var(--bg-primary)]">
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                borderRight: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                position: 'fixed',
                height: '100vh',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Logo */}
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary p-1.5 rounded-lg text-white">
                        <Code2 size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>SnippetShelf</span>
                </div>

                {/* Create Button */}
                <div className="px-4 mb-6">
                    <button
                        onClick={() => navigate('/create')}
                        className="w-full btn-primary py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white', border: 'none' }}
                    >
                        <Plus size={20} />
                        <span className="font-semibold">Create Snippet</span>
                    </button>
                </div>

                {/* Scrollable Nav */}
                <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                    <SidebarItem to="/" icon={LayoutGrid} label="Dashboard" badge="24" />
                    <SidebarItem to="/favorites" icon={Star} label="Favorites" badge="8" />
                    <SidebarItem to="/recent" icon={Clock} label="Recent" />
                    <SidebarItem to="/archive" icon={Archive} label="Archive" badge="3" />

                    <SectionHeader label="Collections" />
                    <CollectionItem color="#ef4444" label="Frontend" count="12" />
                    <CollectionItem color="#3b82f6" label="Backend" count="8" />
                    <CollectionItem color="#22c55e" label="DevOps" count="4" />
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-muted hover:text-primary mt-1">
                        <Plus size={14} />
                        <span className="text-sm">New Collection</span>
                    </button>

                    <SectionHeader label="Languages" />
                    <SidebarItem to="/lang/js" icon={FileCode} label="JavaScript" badge="15" />
                    <SidebarItem to="/lang/py" icon={FileCode} label="Python" badge="9" />
                    <SidebarItem to="/lang/react" icon={Code2} label="React" badge="7" />
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-muted hover:text-primary mt-1 text-sm">
                        <span>View all languages</span>
                        <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
                    </button>
                </div>

                {/* User Footer */}
                <div className="p-4 border-t border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-[var(--bg-primary)] text-muted hover:text-primary transition-colors">
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button className="p-2 rounded-md hover:bg-[var(--bg-primary)] text-muted hover:text-primary transition-colors">
                            <Settings size={18} />
                        </button>
                        <button onClick={handleLogout} className="p-2 rounded-md hover:bg-[var(--bg-primary)] text-error hover:text-red-600 transition-colors">
                            <LogOut size={18} />
                        </button>
                    </div>
                    {/* User Profile Mini */}
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-[var(--bg-primary)]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-muted truncate">Developer</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-[260px] min-h-screen flex flex-col">
                {/* Header */}
                <header className="h-16 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search snippets, tags, or languages..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] focus:outline-none focus:border-primary text-sm transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] text-muted">⌘</kbd>
                            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] text-muted">K</kbd>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-muted hover:text-primary transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-secondary)]"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-[var(--border-color)]"></div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium leading-none">{user?.name}</p>
                                <p className="text-xs text-muted mt-1">Developer</p>
                            </div>
                            <ChevronDown size={16} className="text-muted" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
