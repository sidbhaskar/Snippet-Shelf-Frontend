import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { fetchSnippetById } from '../../api/services';

const SnippetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [snippet, setSnippet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSnippet = async () => {
            try {
                const data = await fetchSnippetById(id);
                setSnippet(data);
            } catch (error) {
                console.error("Failed to fetch snippet", error);
            } finally {
                setLoading(false);
            }
        };

        loadSnippet();
    }, [id]);

    const handleCopy = () => {
        const codeToCopy = snippet?.sourceCode || snippet?.code;
        if (codeToCopy) {
            navigator.clipboard.writeText(codeToCopy);
            // Show toast
        }
    };

    if (loading) return <div className="text-center" style={{ padding: '2rem' }}>Loading...</div>;
    if (!snippet) return <div className="text-center" style={{ padding: '2rem' }}>Snippet not found</div>;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: '1rem', paddingLeft: 0 }}>
                <ArrowLeft size={18} style={{ marginRight: '8px' }} />
                Back to Dashboard
            </button>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '1.5rem' }}>
                    <div>
                        <h1 style={{ marginBottom: '0.5rem' }}>{snippet.title}</h1>
                        <div className="flex items-center gap-md text-muted text-sm">
                            <span className="flex items-center gap-sm">
                                <Calendar size={14} />
                                <Calendar size={14} />
                                {new Date(snippet.createdDate || snippet.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                            <span style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px' }}>
                                {snippet.language}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-sm">
                        <button className="btn btn-ghost" onClick={() => console.log('Edit')}>
                            <Edit size={18} />
                        </button>
                        <button className="btn btn-ghost" style={{ color: 'var(--error)' }} onClick={() => console.log('Delete')}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <p style={{ marginBottom: '2rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    {snippet.description}
                </p>

                <div style={{ position: 'relative' }}>
                    <div className="flex justify-between items-center" style={{ background: '#1e1e1e', padding: '0.5rem 1rem', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', borderBottom: '1px solid #333' }}>
                        <span className="text-sm text-muted">{snippet.language}</span>
                        <button className="btn btn-ghost" style={{ padding: '4px', height: 'auto' }} onClick={handleCopy}>
                            <Copy size={14} style={{ marginRight: '6px' }} />
                            Copy
                        </button>
                    </div>
                    <SyntaxHighlighter
                        language={snippet.language?.toLowerCase() || 'text'}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}
                    >
                        {snippet.sourceCode || snippet.code || ''}
                    </SyntaxHighlighter>
                </div>

                <div className="flex gap-sm" style={{ marginTop: '1.5rem' }}>
                    {snippet.tags?.map(tag => (
                        <span key={tag} className="flex items-center gap-sm text-sm text-muted" style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '100px' }}>
                            <Tag size={12} />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SnippetDetails;
