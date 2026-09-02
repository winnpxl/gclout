/**
 * Runs before paint (in the initial HTML) to set data-theme on <html>, so there
 * is no flash of the wrong theme before React hydrates. Mirrors the resolution
 * logic in ThemeProvider.
 */
export function ThemeScript() {
  const js = `(function(){try{var t=localStorage.getItem('gclout-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
