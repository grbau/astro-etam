import { useEffect, useState } from 'preact/hooks';
import { Header } from './Header';
import { Footer } from './Footer';
import { getSingleEntry } from '../contentstack-sdk/fetchContent';
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import { Stack } from '../contentstack-sdk/utils';
import '../styles/main.scss';

interface Page { title?: string; body?: string; }
interface HeaderFooter { [key: string]: any; }
interface DataState { header: HeaderFooter | null; footer: HeaderFooter | null; page: Page | null; }

export default function PreviewWrapper() {
  const [data, setData] = useState<DataState>({ header: null, footer: null, page: null });
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Vérifier si on est dans l'iframe de preview
    const inPreview = window.parent !== window || 
                      window.location.search.includes('live_preview') ||
                      window.location.search.includes('contentstack');
    
    setIsPreview(inPreview);
    console.log('Mode Preview:', inPreview);

    if (inPreview) {
      // Initialiser le Live Preview SANS passer stackSdk (ou avec Stack directement)
      ContentstackLivePreview.init({ 
        enable: true,
        stackSdk: Stack as any, // Cast en any pour éviter l'erreur de typage
        ssr: false,
        clientUrlParams: {
          host: 'app.contentstack.com'
        }
      });
      console.log('Live Preview initialisé');
    }

    async function fetchData() {
      try {
        console.log('Fetching data...');
        const header = await getSingleEntry('header');
        const footer = await getSingleEntry('footer');
        const page = await getSingleEntry('page', { uid: 'home' });
        
        console.log('Données récupérées:', { header, footer, page });
        setData({ header, footer, page });
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      }
    }

    fetchData();

    if (inPreview) {
      // Écouter les changements en temps réel
      const handleChange = () => {
        console.log('🔄 Changement détecté, rechargement des données...');
        fetchData();
      };

      ContentstackLivePreview.onEntryChange(handleChange);
    }
  }, []);

  const title = data.page?.title || 'Accueil';
  const content = data.page?.body || '<p>Bienvenue</p>';

  return (
    <div>
      {isPreview && (
        <div style={{
          background: 'yellow',
          padding: '5px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          MODE PREVIEW ACTIF
        </div>
      )}
      <Header data={data.header} />
      <main className="p-4">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </main>
      <Footer data={data.footer} />
    </div>
  );
}