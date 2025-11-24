import { useNavigate } from 'react-router-dom';
import { Code2, Folder, Layers, Star, Plus, Download, FileCode, Database } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStats } from '../../context/StatsContext';

const StatCard = ({ title, value, subtext, icon: Icon, color, bg, trend }) => (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 flex justify-between items-start hover:shadow-lg transition-all duration-300 group">
        <div>
            <p className="text-muted text-sm font-medium mb-2">{title}</p>
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{value}</h2>
            <p className="text-xs font-medium flex items-center gap-1">
                <span className={trend?.includes('+') ? 'text-green-500' : 'text-red-500'}>{trend}</span>
                <span className="text-muted opacity-80">{subtext}</span>
            </p>
        </div>
        <div className={`p-3 rounded-lg transition-transform group-hover:scale-110`} style={{ background: bg, color: color }}>
            <Icon size={24} />
        </div>
    </div>
);

const WelcomeStats = () => {
    const { user } = useAuth();
    const { stats } = useStats();
    const navigate = useNavigate();

    return (
        <div className="mb-10">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Welcome back, {user?.name?.split(' ')[0] || 'John'}!</h1>
                    <p className="text-muted text-lg">Manage and organize your code snippets efficiently</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium flex items-center gap-2 hover:bg-[var(--bg-primary)] transition-colors">
                        <Download size={18} />
                        Export
                    </button>
                    <button
                        className="px-4 py-2.5 rounded-lg bg-primary text-white font-medium flex items-center gap-2 hover:opacity-90 transition-colors shadow-lg shadow-primary/25"
                        onClick={() => navigate('/create')}
                    >
                        <Plus size={18} />
                        New Snippet
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Snippets"
                    value={stats.totalSnippets}
                    trend="+12%"
                    subtext="from last month"
                    icon={Code2}
                    color="#6366f1"
                    bg="rgba(99, 102, 241, 0.1)"
                />
                <StatCard
                    title="Collections"
                    value={0} // Placeholder until collections API is ready
                    trend="+2"
                    subtext="new this week"
                    icon={Folder}
                    color="#8b5cf6"
                    bg="rgba(139, 92, 246, 0.1)"
                />
                <StatCard
                    title="Languages"
                    value={Object.keys(stats.languageCounts || {}).length}
                    trend=""
                    subtext="Active languages"
                    icon={Layers}
                    color="#06b6d4"
                    bg="rgba(6, 182, 212, 0.1)"
                />
                <StatCard
                    title="Favorites"
                    value={stats.totalFavorites}
                    trend=""
                    subtext="Most used snippets"
                    icon={Star}
                    color="#f59e0b"
                    bg="rgba(245, 158, 11, 0.1)"
                />
            </div>
        </div>
    );
};

export default WelcomeStats;
