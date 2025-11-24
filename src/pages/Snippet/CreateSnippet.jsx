import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { createSnippet } from '../../api/services';

const CreateSnippet = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        language: 'JavaScript',
        code: '',
        tags: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Format tags from string to array
            const payload = {
                ...formData,
                sourceCode: formData.code, // Backend expects sourceCode
                language: formData.language.toLowerCase(),
                tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
            };
            // Remove the 'code' key from payload if it exists in formData spread
            delete payload.code;
            await createSnippet(payload);
            navigate('/');
        } catch (error) {
            console.error("Failed to create snippet", error);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to create snippet. Please try again.";
            console.error("Error details:", error.response?.data);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Create New Snippet</h1>
                <button
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors text-muted hover:text-[var(--text-primary)]"
                >
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-muted">Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="e.g., React Auth Hook"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-primary focus:outline-none transition-colors text-[var(--text-primary)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-muted">Language</label>
                        <select
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-primary focus:outline-none transition-colors text-[var(--text-primary)]"
                        >
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="React">React</option>
                            <option value="CSS">CSS</option>
                            <option value="HTML">HTML</option>
                            <option value="SQL">SQL</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted">Tags</label>
                    <input
                        id="tags"
                        type="text"
                        name="tags"
                        placeholder="e.g., auth, hooks, frontend (comma separated)"
                        value={formData.tags}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-primary focus:outline-none transition-colors text-[var(--text-primary)]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Brief description of what this snippet does..."
                        value={formData.description}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-primary focus:outline-none transition-colors resize-none text-[var(--text-primary)]"
                    />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm font-medium text-muted">Code</label>
                    <textarea
                        id="code"
                        name="code"
                        rows="12"
                        placeholder="// Paste your code here"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        className="p-4 rounded-lg bg-[#0f172a] border border-[var(--border-color)] font-mono text-sm text-gray-300 focus:border-primary focus:outline-none transition-colors resize-none"
                        style={{ fontFamily: '"Fira Code", monospace' }}
                    />
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-6 py-2.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors font-medium text-[var(--text-primary)]"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity font-medium flex items-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50"
                    >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Snippet'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSnippet;
