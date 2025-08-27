import { useState, useEffect } from 'react';
import PageEditor from './PageEditor';

const StaticPagesManager: React.FC = () => {
  const [aboutContent, setAboutContent] = useState('');
  const [contactContent, setContactContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const resAbout = await fetch('https://footbal-voice.vercel.app/api/pages/about');
        const resContact = await fetch('https://footbal-voice.vercel.app/api/pages/contact');
        const about = await resAbout.json();
        const contact = await resContact.json();
        setAboutContent(about.content || '');
        setContactContent(contact.content || '');
      } catch {
        setAboutContent('');
        setContactContent('');
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  if (loading) return <div>Se încarcă paginile statice...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <PageEditor
        slug="about"
        initialContent={aboutContent}
        onSave={setAboutContent}
      />
      <PageEditor
        slug="contact"
        initialContent={contactContent}
        onSave={setContactContent}
      />
    </div>
  );
};

export default StaticPagesManager;
