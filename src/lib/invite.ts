/**
 * Informações do convite de 15 anos da Débora Michele
 */

export const INVITE = {
  // Informações da aniversariante
  honoree: "Débora Michele",
  firstName: "Débora",
  monogram: "DM",
  tagline: "Uma Noite Para Recordar",
  subtitle: "O começo de uma história inesquecível",
  
  // Versículo bíblico
  verse: "O Senhor é a minha força e o meu escudo; nele o meu coração confia.",
  verseRef: "Salmos 28:7",
  
  // Data e hora
  weekday: "Sábado",
  day: "10",
  month: "Outubro",
  year: "2026",
  timeLabel: "às 20h30",
  
  // Código de vestimenta
  dressCode: "Traje social completo",
  dressCodeDetails: "Tons escuros e dourados são bem-vindos",
  
  // Local do evento
  venue: {
    name: "House Eventos Sobradinho",
    address: "DF-440, Km 11 – Chácara Mric, Rota do Cavalo",
    city: "Sobradinho — DF",
    fullAddress: "DF-440, Km 11 – Chácara Mric, Rota do Cavalo\nSobradinho — DF",
    mapsUrl: "https://maps.google.com/?q=House+Eventos+Sobradinho+DF-440+Km+11", // Atualizar com URL real
    hasParking: true,
  },
  
  // Informações para presente (PIX)
  pixKey: "seuemail@example.com", // ATUALIZAR com PIX real
  pixLabel: "PIX da Débora",
  
  // WhatsApp para confirmação
  whatsappNumber: "5561999999999", // ATUALIZAR com número real (DF = 61)
  
  // Prazo para confirmação
  confirmDeadline: "20 de setembro de 2026",
};

/**
 * Programação da festa
 */
export const SCHEDULE = [
  {
    time: "20h30",
    title: "Recepção",
    description: "Boas-vindas, luz baixa e o primeiro brinde",
  },
  {
    time: "21h00",
    title: "Jantar",
    description: "A mesa é o coração da noite",
  },
  {
    time: "22h30",
    title: "Palavras e bolo",
    description: "Um instante só dela — e de quem a ama",
  },
  {
    time: "23h00",
    title: "A festa",
    description: "Para quem quiser ficar até o último frame",
  },
];

/**
 * Notas de informação sobre o evento
 */
export const INFO_NOTES = [
  {
    id: "confirm",
    icon: "clipboard",
    title: `Confirme até ${INVITE.confirmDeadline}`,
  },
  {
    id: "reception",
    icon: "clock",
    title: "20h30 - Recepção",
    quoted: true,
  },
  {
    id: "dinner",
    icon: "smile",
    title: "21h00 - Jantar",
  },
  {
    id: "cake",
    icon: "smile",
    title: "22h30 - Palavras e bolo",
  },
  {
    id: "party",
    icon: "dance",
    title: "23h00 - A festa",
  },
  {
    id: "photos",
    icon: "camera",
    title: "Fotógrafo profissional",
  },
  {
    id: "parking",
    icon: "couple",
    title: "Estacionamento no local",
  },
  {
    id: "dress",
    icon: "hanger",
    title: "Tons escuros e dourados",
  },
];

/**
 * Categorias de presentes
 */
export const GIFT_GROUPS = [
  {
    label: "Cozinha",
    items: [
      "Jogo de panelas",
      "Liquidificador",
      "Conjunto de facas",
      "Jogo de xícaras",
    ],
  },
  {
    label: "Quarto",
    items: [
      "Jogo de lençóis",
      "Edredom",
      "Travesseiros",
      "Jogo de toalhas",
    ],
  },
  {
    label: "Decoração",
    items: [
      "Quadros decorativos",
      "Vasos",
      "Almofadas",
      "Espelho",
    ],
  },
  {
    label: "Eletrônicos",
    items: [
      "Notebook",
      "Tablet",
      "Fone de ouvido",
      "Câmera fotográfica",
    ],
  },
];

/**
 * Fotos de presentes (para a galeria visual)
 */
export const GIFT_PHOTOS = [
  // Adicione URLs de fotos reais aqui se quiser
];

/**
 * Gera URL para adicionar evento ao Google Calendar
 */
export function buildCalendarHref(): string {
  const title = encodeURIComponent(`15 Anos da ${INVITE.honoree}`);
  const details = encodeURIComponent(
    `Festa de 15 anos da ${INVITE.honoree}\n\n${INVITE.tagline}\n\n${INVITE.venue.name}\n${INVITE.venue.fullAddress}`
  );
  const location = encodeURIComponent(`${INVITE.venue.name}, ${INVITE.venue.fullAddress}`);
  
  // Data: 10 de outubro de 2026 às 20h30 (fuso -03:00 Brasília)
  const startDate = "20261010T203000";
  const endDate = "20261011T020000"; // Termina às 2h da manhã
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&ctz=America/Sao_Paulo`;
}

/**
 * Gera URL do WhatsApp para confirmação
 */
export function buildWhatsAppUrl(guestName: string, guestCount: number): string {
  const message = encodeURIComponent(
    `Olá! Confirmo presença na festa de 15 anos da ${INVITE.honoree}.\n\n✨ ${INVITE.tagline} ✨\n\nNome: ${guestName}\nNúmero de convidados: ${guestCount}\n\n🎉`
  );
  return `https://wa.me/${INVITE.whatsappNumber}?text=${message}`;
}
