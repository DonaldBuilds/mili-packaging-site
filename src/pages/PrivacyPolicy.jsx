export default function PrivacyPolicy() {
  return (
    <div className="page-scaffold">
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="gold-line" />
          <span className="eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: August 2026</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 820, lineHeight: 1.8, fontSize: 14, color: 'var(--gray-3)' }}>
          <div className="gold-line" />
          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>1. Who We Are</h2>
          <p>
            Jiangxi Mili Packaging Materials Co., Ltd. ("Mili Packaging", "we", "us") is a B2B custom packaging
            manufacturer based in Nanchang, Jiangxi, China. This Privacy Policy explains how we collect, use, and
            protect personal information submitted through our website mili-packaging.com (the "Site").
          </p>

          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>2. Information We Collect</h2>
          <p>When you submit an inquiry through our contact form, we collect the information you provide:</p>
          <ul style={{ listStyle: 'none', marginTop: 8 }}>
            {[
              'Full name',
              'Email address',
              'Product type of interest',
              'Estimated order quantity',
              'Project brief / message content',
              'Reference files you choose to upload (images, PDF, design files)',
            ].map((item, i) => (
              <li key={i} style={{ padding: '6px 0', borderBottom: '1px solid var(--border-dim)', paddingLeft: 18, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>→</span>{item}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 8 }}>
            We may also collect basic technical data automatically (such as pages visited and approximate location)
            through our website analytics provider.
          </p>

          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>3. How We Use Your Information</h2>
          <ul style={{ listStyle: 'none', marginTop: 8 }}>
            {[
              'To respond to your inquiry and provide quotes within 24 hours',
              'To discuss product specifications, samples, and production',
              'To communicate with you about your project via email, phone, or WhatsApp',
              'To improve our products, services, and website experience',
            ].map((item, i) => (
              <li key={i} style={{ padding: '6px 0', borderBottom: '1px solid var(--border-dim)', paddingLeft: 18, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>→</span>{item}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 8 }}>
            We process your data on the legal basis of legitimate business interest (responding to your request) and,
            where required, your consent. We do not sell or rent your personal information to third parties.
          </p>

          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>4. Third-Party Service Providers</h2>
          <p>To operate the Site and deliver our services, we use the following processors:</p>
          <ul style={{ listStyle: 'none', marginTop: 8 }}>
            {[
              ['Supabase (supabase.com)', 'Database storage for inquiry submissions (US/EU-hosted cloud infrastructure)'],
              ['Resend (resend.com)', 'Transactional email delivery for inquiry notifications'],
              ['Cloudflare (cloudflare.com)', 'Website hosting, content delivery, and web analytics'],
            ].map(([name, desc], i) => (
              <li key={i} style={{ padding: '6px 0', borderBottom: '1px solid var(--border-dim)', paddingLeft: 18, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>→</span>
                <b style={{ color: 'var(--white)' }}>{name}</b> — {desc}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 8 }}>
            Each provider processes data only for the purposes described above and under its own data processing
            agreements with us.
          </p>

          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>5. Data Retention</h2>
          <p>
            We retain inquiry records for as long as needed to serve your project and for our legitimate business
            records. Inactive inquiry data older than 24 months may be archived or deleted.
          </p>

          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>6. International Data Transfers</h2>
          <p>
            Your information is stored on cloud infrastructure operated by our service providers, which may be located
            outside your country of residence (including the United States and the European Union). By submitting an
            inquiry, you acknowledge this transfer.
          </p>

          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>7. Your Rights</h2>
          <p>
            Depending on your jurisdiction (including under the GDPR and CCPA), you may have the right to access,
            correct, delete, or restrict the processing of your personal data, and to object to or withdraw consent at
            any time. To exercise these rights, contact us using the details below. We will respond within 30 days.
          </p>

          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>8. Security</h2>
          <p>
            We use industry-standard technical and organizational measures to protect your data, including encrypted
            connections (HTTPS) and access controls on our database. No method of transmission is 100% secure, but we
            work to protect your information to the best of our ability.
          </p>

          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>9. Cookies</h2>
          <p>
            Our Site uses privacy-friendly, cookieless web analytics (Cloudflare Web Analytics) which does not track you
            across websites. We do not use advertising cookies or cross-site tracking.
          </p>

          <h2 style={{ margin: '32px 0 12px', fontSize: 18 }}>10. Contact Us</h2>
          <p>
            For any privacy-related questions or requests, contact:<br />
            Jiangxi Mili Packaging Materials Co., Ltd.<br />
            Nanchang, Jiangxi, China<br />
            Email: info@mili-packaging.com<br />
            WhatsApp: +86 182 9687 6285
          </p>

          <p style={{ marginTop: 32, fontSize: 12, color: 'var(--gray-2)' }}>
            We may update this policy from time to time. The latest version will always be published on this page with
            an updated "Last updated" date.
          </p>
        </div>
      </section>
    </div>
  );
}
