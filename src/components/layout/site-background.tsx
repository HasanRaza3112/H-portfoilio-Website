export function SiteBackground() {
  return (
    <div aria-hidden className="site-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="site-bg__grid" />
      <div className="site-bg__glow" />
      <div className="site-bg__scanlines" />
      <div className="site-bg__vignette" />
    </div>
  );
}
