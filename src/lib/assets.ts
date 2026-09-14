/**
 * URLs externas para assets de alta qualidade
 * Usando Cloudflare R2 para melhor performance e segurança HTTPS
 */
const EXTERNAL_ASSETS: Record<string, string> = {
  // Imagens do vídeo (image-2)
  '/image-2/btn-comeca-aqui.png': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/btn-comeca-aqui.png',
  '/image-2/btn-toque-no-sol.png': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/btn-toque-no-sol.png',
  '/image-2/video-01.mp4': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/video-01.mp4',
  '/image-2/music.mp3': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/music.mp3',
  
  // Imagens do modal (images)
  '/images/main-card.jpg': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/main-card.jpg',
  '/images/modal-dress.jpg': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/modal-dress.jpg',
  '/images/modal-gifts-1.jpg': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/modal-gifts-1.jpg',
  '/images/modal-gifts-2.jpg': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/modal-gifts-2.jpg',
  '/images/modal-local-map.jpg': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/modal-local-map.jpg',
  
  // Botões
  '/images/btn-como-chegar.png': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/btn-como-chegar.png',
  '/images/btn-dress.png': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/btn-dress.png',
  '/images/btn-gifts.png': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/btn-gifts.png',
  '/images/btn-local.png': 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/Convite-aniversario/btn-local.png',
};

/**
 * Retorna o caminho correto para assets públicos
 * Prioriza URLs externas (HTTPS) quando disponíveis
 * Caso contrário, adiciona automaticamente o BASE_URL configurado no Vite
 * 
 * Exemplo:
 * - URL Externa: asset('/images/main-card.jpg') → 'https://pub-d4c02abcd7f64328a802167c22b90780.r2.dev/...'
 * - Local: asset('/images/photo.jpg') → '/images/photo.jpg'
 * - GitHub Pages: asset('/images/photo.jpg') → '/convite-15-anos/images/photo.jpg'
 */
export function asset(path: string): string {
  // Se houver URL externa para este asset, retorna direto com HTTPS
  if (EXTERNAL_ASSETS[path]) {
    return EXTERNAL_ASSETS[path];
  }

  // Caso contrário, usa o sistema de base URL (para assets locais ou em GitHub Pages)
  const base = import.meta.env.BASE_URL || '/';
  // Remove barra inicial do path se existir
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Garante que base termina com / mas não duplica
  const cleanBase = base === '/' ? '' : (base.endsWith('/') ? base.slice(0, -1) : base);
  return `${cleanBase}/${cleanPath}`;
}
