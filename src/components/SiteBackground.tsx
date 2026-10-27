import bg from '../assets/bg.webp';

/** Tüm sayfalarda sabit duran koyu lacivert / mor dalga arka planı. */
export default function SiteBackground() {
  return <div className="site-bg" style={{ '--bg-image': `url(${bg})` } as React.CSSProperties} aria-hidden="true" />;
}
