import { useState } from 'react';

export default function App() {
  const [repoUrl, setRepoUrl] = useState('https://github.com/dev-uday/Instagram-Developer-Content-Agent.git');
  const [linkPolicy, setLinkPolicy] = useState('ask_per_post');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<any>(null);

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, linkPolicy }),
      });
      const data = await res.json();
      if (data.success) {
        setDraft(data.draft);
      } else {
        alert(data.error || 'Failed to research repository');
      }
    } catch (err) {
      alert('Error connecting to backend server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ borderBottom: '1px solid #334155', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#38bdf8' }}>Instagram Developer Content Agent</h1>
        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
          Research GitHub repos, generate evidence-backed developer carousels, enforce outbound link policies, and manage Instagram engagement.
        </p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: draft ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        <section style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#f1f5f9' }}>1. Research Repository</h2>
          <form onSubmit={handleResearch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#cbd5e1' }}>GitHub Repository URL</label>
              <input 
                type="url" 
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#cbd5e1' }}>Outbound Link Policy Rule</label>
              <select 
                value={linkPolicy}
                onChange={(e) => setLinkPolicy(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }}
              >
                <option value="ask_per_post">Ask for each post (Default)</option>
                <option value="comment_keyword_dm">Comment keyword → DM link delivery</option>
                <option value="dm_keyword">User sends DM keyword → DM link delivery</option>
                <option value="comment_pin">Comment with manual pin</option>
                <option value="link_in_bio">Link in bio</option>
                <option value="story_link">Story link</option>
                <option value="no_link">No link (Purely educational post)</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: '#0284c7', color: '#fff', padding: '0.75rem', borderRadius: '0.375rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? 'Analyzing Repository & Generating Draft...' : 'Research Repo & Create Post Draft'}
            </button>
          </form>
        </section>

        {draft && (
          <section style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#f1f5f9' }}>2. Generated Post Draft</h2>
            <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#0f172a', borderRadius: '0.375rem', borderLeft: '4px solid #38bdf8' }}>
              <strong>Angle:</strong> {draft.angle}<br />
              <strong>Link Rule:</strong> {draft.linkPolicy}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Caption</h3>
              <p style={{ whiteSpace: 'pre-line', backgroundColor: '#0f172a', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.875rem' }}>{draft.caption}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Carousel Preview ({draft.slides?.length} Slides)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto' }}>
                {draft.slides?.map((slide: any) => (
                  <div key={slide.slideNumber} style={{ padding: '0.75rem', backgroundColor: '#0f172a', borderRadius: '0.375rem', border: '1px solid #334155' }}>
                    <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 'bold' }}>Slide {slide.slideNumber} • {slide.type.toUpperCase()}</div>
                    <div style={{ fontWeight: 'bold', marginTop: '0.25rem', marginBottom: '0.25rem' }}>{slide.title}</div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8', whiteSpace: 'pre-line' }}>{slide.content}</div>
                    {slide.codeSnippet && (
                      <pre style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#1e293b', borderRadius: '0.25rem', fontSize: '0.75rem', overflowX: 'auto' }}>
                        <code>{slide.codeSnippet}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
