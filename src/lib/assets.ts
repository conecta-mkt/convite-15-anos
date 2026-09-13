/**
 * Retorna o caminho correto para assets públicos
 * Adiciona automaticamente o BASE_URL configurado no Vite
 * 
 * Exemplo:
 * - Local: asset('/images/photo.jpg') → '/images/photo.jpg'
 * - GitHub Pages: asset('/images/photo.jpg') → '/convite-15-anos/images/photo.jpg'
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Remove barra inicial do path se existir
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Garante que base termina com /
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}
