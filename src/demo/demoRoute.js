const demoViews = new Set(['welcome', 'home', 'admin']);

export function getDemoRoute(pathname, search) {
  if (pathname !== '/') return { view: null, language: null };
  const params = new URLSearchParams(search);
  const view = params.get('demo');
  return demoViews.has(view) ? { view, language: params.get('lang') } : { view: null, language: null };
}

export function demoHref(view, language) {
  return '/?' + new URLSearchParams({ demo: view, lang: language });
}
