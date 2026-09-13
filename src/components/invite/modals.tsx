import { useState, type FormEvent, type ReactNode } from "react";
import {
  Camera,
  ClipboardCheck,
  Clock,
  Copy,
  Check,
  CalendarPlus,
  MapPin,
  Smile,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Monogram } from "@/components/invite/monogram";
import {
  CoupleIcon,
  DanceIcon,
  HangerIcon,
  LeafSprigIcon,
} from "@/components/invite/icons";
import {
  GIFT_GROUPS,
  GIFT_PHOTOS,
  INFO_NOTES,
  INVITE,
  buildCalendarHref,
  buildWhatsAppUrl,
} from "@/lib/invite";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/assets";

function SheetFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* Decoração floral - substitua por imagens reais se desejar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 w-full bg-gradient-to-b from-lilac/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 w-full bg-gradient-to-t from-lilac/10 to-transparent" />
      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-16 pt-10">
        {children}
      </div>
    </div>
  );
}

export function RsvpModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(1);

  function submit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const url = buildWhatsAppUrl({
      name: trimmed,
      attending,
      guests: attending ? guests : 1,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <SheetFrame>
          <Monogram size="sm" />
          <DialogTitle className="mt-5 text-center font-display text-2xl font-semibold text-plum">
            Confirme sua presença
          </DialogTitle>
          <DialogDescription className="mt-2 text-center font-body text-base text-ink-muted">
            Enviaremos sua resposta pelo WhatsApp.
          </DialogDescription>
          <form onSubmit={submit} className="mt-6 flex flex-col gap-5">
            <label className="block">
              <span className="font-body text-sm tracking-wide text-ink-muted uppercase">
                Seu nome
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                className="mt-1 w-full border-b border-lilac-deep/30 bg-transparent py-2 font-body text-lg text-ink outline-none placeholder:text-ink-muted/50 focus:border-lilac-rich"
              />
            </label>
            <fieldset>
              <legend className="font-body text-sm tracking-wide text-ink-muted uppercase">
                Você vem?
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(
                  [
                    [true, "Sim, estarei lá"],
                    [false, "Não poderei ir"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setAttending(value)}
                    className={cn(
                      "rounded-full border px-3 py-2.5 font-body text-sm transition-colors duration-150 active:scale-[0.96]",
                      attending === value
                        ? "border-lilac-rich bg-lilac-rich text-cream"
                        : "border-lilac-deep/30 bg-cream text-ink",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            {attending ? (
              <div>
                <p className="font-body text-sm tracking-wide text-ink-muted uppercase">
                  Quantas pessoas
                </p>
                <div className="mt-2 flex items-center justify-center gap-5">
                  <button
                    type="button"
                    aria-label="Diminuir"
                    onClick={() => setGuests((n) => Math.max(1, n - 1))}
                    className="flex size-11 items-center justify-center rounded-full border border-lilac-deep/30 bg-cream text-xl text-plum active:scale-[0.96]"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center font-display text-3xl text-plum tabular-nums">
                    {guests}
                  </span>
                  <button
                    type="button"
                    aria-label="Aumentar"
                    onClick={() => setGuests((n) => Math.min(12, n + 1))}
                    className="flex size-11 items-center justify-center rounded-full border border-lilac-deep/30 bg-cream text-xl text-plum active:scale-[0.96]"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : null}
            <button
              type="submit"
              className="mt-2 rounded-full bg-lilac-rich px-5 py-3.5 font-body text-lg text-cream shadow-md transition-transform duration-150 active:scale-[0.96]"
            >
              Enviar no WhatsApp
            </button>
          </form>
        </SheetFrame>
      </DialogContent>
    </Dialog>
  );
}

export function LocalModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-[95vw] max-h-[95vh] border-0 bg-purple-950 [&>button]:bg-purple-900 [&>button]:text-white [&>button]:hover:bg-purple-800">
        <DialogTitle className="sr-only">Local da Festa</DialogTitle>
        <DialogDescription className="sr-only">
          Como chegar ao local do evento
        </DialogDescription>
        <div className="relative w-full h-full">
          {/* Imagem de fundo - Mapa do Tesouro */}
          <img
            src={asset("/images/modal-local-map.jpg")}
            alt="Mapa de localização - House Eventos Sobradinho"
            className="w-full h-full object-contain"
          />
          
          {/* Botão "COMO CHEGAR" posicionado sobre o mapa - mais baixo, menor e centralizado */}
          <div className="absolute inset-0 flex items-end justify-center pb-[12%]">
            <a
              href="https://maps.app.goo.gl/eriUqFM1Ku99sEhA7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            >
              <img
                src={asset("/images/btn-como-chegar.png")}
                alt="Como Chegar - Abrir no Google Maps"
                className="block w-auto max-w-[55%] h-auto mx-auto drop-shadow-2xl"
              />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GiftsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-[95vw] max-h-[95vh] border-0 bg-purple-950 [&>button]:bg-purple-900 [&>button]:text-white [&>button]:hover:bg-purple-800">
        <DialogTitle className="sr-only">Lista de Presentes</DialogTitle>
        <DialogDescription className="sr-only">
          Mapa dos Tesouros com sugestões de presentes
        </DialogDescription>
        <div className="relative w-full h-full">
          {/* Página 1 - Mapa dos Tesouros (dicas de presentes) */}
          {currentPage === 1 && (
            <div className="relative">
              <img
                src={asset("/images/modal-gifts-1.jpg")}
                alt="Mapa dos Tesouros - Página 1"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setCurrentPage(2)}
                className="absolute bottom-6 right-6 rounded-full bg-purple-900/80 px-6 py-3 font-body text-sm text-white backdrop-blur-sm transition-all hover:bg-purple-900 hover:scale-105 active:scale-95"
              >
                Ver Lojas →
              </button>
            </div>
          )}

          {/* Página 2 - Onde encontrar os tesouros (lojas) */}
          {currentPage === 2 && (
            <div className="relative">
              <img
                src={asset("/images/modal-gifts-2.jpg")}
                alt="Onde encontrar os tesouros - Página 2"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setCurrentPage(1)}
                className="absolute bottom-6 left-6 rounded-full bg-purple-900/80 px-6 py-3 font-body text-sm text-white backdrop-blur-sm transition-all hover:bg-purple-900 hover:scale-105 active:scale-95"
              >
                ← Voltar
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const INFO_ICONS: Record<string, ReactNode> = {
  clipboard: <ClipboardCheck className="size-7" strokeWidth={1.5} />,
  clock: <Clock className="size-7" strokeWidth={1.5} />,
  leaf: <LeafSprigIcon className="size-7" />,
  couple: <CoupleIcon className="size-7" />,
  camera: <Camera className="size-7" strokeWidth={1.5} />,
  dance: <DanceIcon className="size-7" />,
  smile: <Smile className="size-7" strokeWidth={1.5} />,
  hanger: <HangerIcon className="size-8" />,
};

export function InfoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const top = INFO_NOTES.slice(0, 6);
  const bottom = INFO_NOTES.slice(6);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <SheetFrame>
          <Monogram size="sm" />
          <DialogTitle className="sr-only">Informações da festa</DialogTitle>
          <DialogDescription className="sr-only">
            Recados importantes para os convidados.
          </DialogDescription>
          <div className="mt-8 grid grid-cols-3 gap-x-3 gap-y-8">
            {top.map((note) => (
              <div
                key={note.id}
                className="flex flex-col items-center text-center"
              >
                <span className="text-lilac-rich">{INFO_ICONS[note.icon]}</span>
                <p className="mt-2 font-body text-xs leading-snug text-ink">
                  {note?.quoted ? `"${note.title}"` : note.title}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {bottom.map((note) => (
              <div
                key={note.id}
                className="flex flex-col items-center text-center"
              >
                <span className="text-lilac-rich">{INFO_ICONS[note.icon]}</span>
                <p className="mt-2 max-w-[11rem] font-body text-xs leading-snug text-ink">
                  {note.title}
                </p>
              </div>
            ))}
          </div>
        </SheetFrame>
      </DialogContent>
    </Dialog>
  );
}

export function DressCodeModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-[95vw] max-h-[95vh] border-0 bg-purple-950 [&>button]:bg-purple-900 [&>button]:text-white [&>button]:hover:bg-purple-800">
        <DialogTitle className="sr-only">Dress Code</DialogTitle>
        <DialogDescription className="sr-only">
          Informações sobre o traje da festa
        </DialogDescription>
        <div className="relative w-full h-full">
          <img
            src={asset("/images/modal-dress.jpg")}
            alt="Traje desta Aventura - Dress Code"
            className="w-full h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
