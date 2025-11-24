import { useState, useEffect } from 'react';
import { Search, LayoutGrid, List, Filter } from 'lucide-react';
import SnippetCard from '../../components/UI/SnippetCard';
import WelcomeStats from '../../components/Dashboard/WelcomeStats';
import { fetchSnippets } from '../../api/services';

const Home = () => {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'popular'

    useEffect(() => {
        const loadSnippets = async () => {
            setLoading(true);
            try {
                const data = await fetchSnippets({ sort: sortBy });
                if (Array.isArray(data)) {
                    setSnippets(data);
                } else if (data && data.content && Array.isArray(data.content)) {
                    // Handle Spring Boot paginated response
                    setSnippets(data.content);
                } else if (data && data.snippets && Array.isArray(data.snippets)) {
                    setSnippets(data.snippets);
                } else {
                    console.error("Fetched snippets data format not recognized:", data);
                    setSnippets([]);
                }
            } catch (error) {
                console.error("Failed to fetch snippets", error);
                setSnippets([]);
            } finally {
                setLoading(false);
            }
        };

        loadSnippets();
    }, [sortBy]);

    const filteredSnippets = snippets.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <WelcomeStats />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Recent Snippets</h2>

                <div className="flex gap-3">
                    <div className="flex bg-[var(--bg-secondary)] p-1 rounded-lg border border-[var(--border-color)]">
                        <button
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm' : 'text-muted hover:text-[var(--text-primary)]'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            Grid
                        </button>
                        <button
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm' : 'text-muted hover:text-[var(--text-primary)]'}`}
                            onClick={() => setViewMode('list')}
                        >
                            List
                        </button>
                    </div>

                    <div className="flex items-center gap-2 bg-[var(--bg-secondary)] px-3 py-1.5 rounded-lg border border-[var(--border-color)]">
                        <span className="text-sm text-muted">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent border-none text-sm font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer"
                        >
                            <option value="recent">Recent</option>
                            <option value="popular">Popular</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center text-muted py-12">Loading snippets...</div>
            ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
                    {filteredSnippets.map(snippet => (
                        <SnippetCard key={snippet.id} snippet={snippet} listView={viewMode === 'list'} />
                    ))}
                    {filteredSnippets.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] border-dashed">
                            <p className="text-muted mb-4">No snippets found matching your criteria.</p>
                            <button className="btn-primary px-6 py-2 rounded-lg" onClick={() => setSearch('')}>Clear Search</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
