import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../data/posts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    if (!post) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: 'Jiangxi Mili Packaging Materials Co., Ltd.' },
      publisher: { '@type': 'Organization', name: 'Jiangxi Mili Packaging Materials Co., Ltd.', logo: { '@type': 'ImageObject', url: 'https://mili-packaging.com/assets/images/logo-horizontal-clear.png' } },
      mainEntityOfPage: `https://mili-packaging.com/blog/${post.slug}`,
      articleSection: post.category,
      keywords: post.tags.join(', '),
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [post]);

  if (!post) {
    return (
      <div className="page-scaffold" style={{ paddingTop: 140, textAlign: 'center' }}>
        <div className="container">
          <h1>Article Not Found</h1>
          <Link to="/blog" className="btn-gold" style={{ marginTop: 24, textDecoration: 'none' }}>Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-scaffold" style={{ paddingTop: 120 }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <nav style={{ marginBottom: 32, fontSize: 13, color: 'var(--gray-3)' }}>
          <Link to="/" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 8px' }}>/</span>
          <Link to="/blog" style={{ color: 'var(--gray-3)', textDecoration: 'none' }}>Blog</Link> <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>{post.title}</span>
        </nav>

        <div className="gold-line" />
        <span className="eyebrow">{post.category}</span>
        <h1 style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', lineHeight: 1.3, margin: '12px 0 16px', fontFamily: 'var(--font-display)' }}>{post.title}</h1>
        <div style={{ fontSize: 12, color: 'var(--gray-3)', letterSpacing: '0.05em', marginBottom: 40 }}>
          {post.date} · {post.readTime} · by Mili Packaging
        </div>

        <article style={{ fontSize: 15.5, lineHeight: 1.95, color: 'var(--gray-2)' }}>
          {post.body.map((block, i) => {
            if (block.t === 'h2') return <h2 key={i} style={{ fontSize: 21, margin: '40px 0 14px', color: 'var(--white)', fontFamily: 'var(--font-display)' }}>{block.text}</h2>;
            if (block.linkTo && block.linkText) {
              return (
                <p key={i} style={{ marginBottom: 18 }}>
                  {block.text}
                  {' '}<Link to={block.linkTo} style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>{block.linkText}</Link>
                </p>
              );
            }
            return <p key={i} style={{ marginBottom: 18 }}>{block.text}</p>;
          })}
        </article>

        <div style={{ marginTop: 48, padding: '32px 28px', background: 'var(--black-2)', border: '1px solid var(--gold)', textAlign: 'center' }}>
          <div style={{ fontSize: 17, color: 'var(--gold)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>Planning a packaging project in 2026?</div>
          <p style={{ fontSize: 13.5, color: 'var(--gray-3)', marginBottom: 20 }}>Get a free design consultation and 3D mockup within 48 hours. MOQ from 100 pcs.</p>
          <Link to="/contact#quote-form" className="btn-gold" style={{ textDecoration: 'none' }}>Get Your Factory-Direct Quote Now &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
