import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to login');
        }
    };

    return (
        <div className="flex justify-center items-center" style={{ minHeight: '100vh', background: 'radial-gradient(circle at top right, #1e293b, #0f172a)' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <div className="flex flex-col items-center gap-sm" style={{ marginBottom: '2rem' }}>
                    <h1 className="text-accent">Snippet Shelf</h1>
                    <p className="text-muted">Welcome back! Please login.</p>
                </div>

                {error && <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ paddingLeft: '40px' }}
                        />
                        <Mail size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ paddingLeft: '40px' }}
                        />
                        <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Sign In
                    </button>
                </form>

                <div className="flex justify-center gap-sm" style={{ marginTop: '1.5rem' }}>
                    <span className="text-muted">Don't have an account?</span>
                    <Link to="/register" className="text-accent" style={{ fontWeight: 500 }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
