import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import SiteBackground from '../components/SiteBackground';
import YonetimPage from './YonetimPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteBackground />
    <div className="relative z-10">
      <YonetimPage />
    </div>
  </StrictMode>,
);
