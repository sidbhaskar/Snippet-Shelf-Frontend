import { Copy, Star, MoreHorizontal, FileCode, Database, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getLanguageIcon = (lang) => {
    const l = lang?.toLowerCase();
    if (l?.includes('react') || l?.includes('js') || l?.includes('script')) return <FileCode size={16} />;
    if (l?.includes('sql') || l?.includes('data')) return <Database size={16} />;
    return <Terminal size={16} />;
};

const getLanguageColor = (lang) => {
    const l = lang?.toLowerCase();
    if (l?.includes('js') || l?.includes('javascript')) return '#facc15'; // Yellow
    if (l?.includes('react')) return '#0ea5e9'; // Blue
    if (l?.includes('python')) return '#3b82f6'; // Blue
    if (l?.includes('css')) return '#8b5cf6'; // Purple
    return '#64748b'; // Gray
};

const SnippetCard = ({ snippet, listView }) => {
    const navigate = useNavigate();

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(snippet.sourceCode || snippet.code);
    };

    return (
        <div
            className="group bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col gap-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => navigate(`/snippet/${snippet.id}`)}
        >
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md" style={{ background: `${getLanguageColor(snippet.language)}20`, color: getLanguageColor(snippet.language) }}>
                        {getLanguageIcon(snippet.language)}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{snippet.language}</span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-[var(--bg-primary)] rounded-md text-muted hover:text-accent" onClick={(e) => { e.stopPropagation(); }}>
                        <Star size={16} fill={snippet.isFavorite ? "currentColor" : "none"} />
                    </button>
                    <button className="p-1.5 hover:bg-[var(--bg-primary)] rounded-md text-muted" onClick={(e) => { e.stopPropagation(); }}>
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div>
                <h3 className="text-lg font-bold mb-2 line-clamp-1" style={{ color: 'var(--text-primary)' }}>{snippet.title}</h3>
                <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                    {snippet.description}
                </p>
            </div>

            {/* Code Preview */}
            {/* Code Preview */}
            <div className="bg-[#0f172a] rounded-lg p-3 font-mono text-xs text-gray-300 overflow-hidden relative h-24 group-hover:ring-1 ring-primary/20 transition-all">
                <pre>{snippet.sourceCode || snippet.code}</pre>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]/90 pointer-events-none"></div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-auto pt-2">
                <div className="flex gap-2">
                    {snippet.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[var(--bg-primary)] border border-[var(--border-color)] text-muted uppercase tracking-wide">
                            {tag}
                        </span>
                    ))}
                </div>
                <span className="text-xs text-muted font-medium">
                    {new Date(snippet.createdDate || snippet.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
            </div>
        </div>
    );
};

export default SnippetCard;
