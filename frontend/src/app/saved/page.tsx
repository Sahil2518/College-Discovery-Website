'use client';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import CollegeCard from '@/components/college/CollegeCard';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import Link from 'next/link';

export default function SavedPage() {
  const [token, setToken] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('rahul@example.com');
  const [password, setPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
  }, []);

  const loginMutation = useMutation({
    mutationFn: () => api.login({ email, password }),
    onSuccess: (data) => {
      const t = data.data.token;
      localStorage.setItem('token', t);
      setToken(t);
      setShowLogin(false);
      setLoginError('');
    },
    onError: (err: any) => setLoginError(err.message),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['saved', token],
    queryFn: () => api.getSaved(token!),
    enabled: !!token,
  });

  const removeMutation = useMutation({
    mutationFn: (collegeId: number) => api.removeCollege(collegeId, token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['saved'] }),
  });

  const saved = data?.data || [];

  if (!token) {
    return (
      <div className="page">
        <div className="container" style={{ maxWidth: 400, textAlign: 'center', paddingTop: 60 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Saved Colleges</h1>
          <p className="text-muted" style={{ marginBottom: 24 }}>Sign in to view your bookmarked colleges</p>

          <div className="card-flat" style={{ padding: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {loginError && <p style={{ color: 'var(--color-danger)', fontSize: 13 }}>{loginError}</p>}
              <button className="btn btn-primary" onClick={() => loginMutation.mutate()} disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
              </button>
              <p className="text-sm text-muted">Demo: rahul@example.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>❤️ Saved Colleges</h1>
            <p className="text-muted">{saved.length} college{saved.length !== 1 ? 's' : ''} saved</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => { localStorage.removeItem('token'); setToken(null); }}>
            Sign Out
          </button>
        </div>

        {isLoading ? (
          <Loader text="Loading saved colleges..." />
        ) : saved.length === 0 ? (
          <EmptyState title="No saved colleges" message="Explore colleges and save your favorites" icon="❤️" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
            {saved.map((item: any) => (
              <CollegeCard
                key={item.id}
                college={item.college}
                isSaved={true}
                onSave={(id) => removeMutation.mutate(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
