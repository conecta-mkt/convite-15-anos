import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  LocalModal,
  GiftsModal,
  DressCodeModal,
} from "@/components/invite/modals";

type ModalType = "local" | "dress" | "gifts" | null;

export function MainCard() {
  const [modal, setModal] = useState<ModalType>(null);
  const [revealed, setRevealed] = useState(false);

  // Animar entrada após montar - timing suave para combinar com transição branca
  useEffect(() => {
    setTimeout(() => setRevealed(true), 300);
  }, []);

  // Pré-carregar imagens dos modais em background para abertura instantânea
  useEffect(() => {
    const imagesToPreload = [
      '/images/modal-dress.jpg',      // Dress Code
      '/images/modal-gifts-1.jpg',    // Lista de Presentes - Página 1
      '/images/modal-gifts-2.jpg',    // Lista de Presentes - Página 2
    ];

    // Criar objetos Image para forçar o navegador a baixar e cachear
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <div className="relative w-full">
        {/* Imagem de fundo completa do convite - mantém proporção natural */}
        <img
          src="/images/main-card.jpg"
          alt="Convite de 15 anos da Débora Michele"
          className={cn(
            "block w-full h-auto transition-opacity duration-1000",
            revealed ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Botões posicionados sobre a imagem - menores e mais altos */}
        <div className="absolute inset-0 flex items-end justify-center pb-[52%]">
          <div className="flex gap-[6%] w-[85%] justify-center">
            {/* Botão LOCAL DA FESTA */}
            <button
              onClick={() => setModal("local")}
              className="group relative w-[18%] transition-transform hover:scale-105 active:scale-95"
              aria-label="Local da festa"
            >
              <img
                src="/images/btn-local.png"
                alt="Local da Festa"
                className="w-full h-auto drop-shadow-lg"
              />
            </button>

            {/* Botão DRESS CODE */}
            <button
              onClick={() => setModal("dress")}
              className="group relative w-[18%] transition-transform hover:scale-105 active:scale-95"
              aria-label="Dress code"
            >
              <img
                src="/images/btn-dress.png"
                alt="Dress Code"
                className="w-full h-auto drop-shadow-lg"
              />
            </button>

            {/* Botão LISTA DE PRESENTES */}
            <button
              onClick={() => setModal("gifts")}
              className="group relative w-[18%] transition-transform hover:scale-105 active:scale-95"
              aria-label="Lista de presentes"
            >
              <img
                src="/images/btn-gifts.png"
                alt="Lista de Presentes"
                className="w-full h-auto drop-shadow-lg"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modais */}
      <LocalModal
        open={modal === "local"}
        onOpenChange={(open) => setModal(open ? "local" : null)}
      />
      <DressCodeModal
        open={modal === "dress"}
        onOpenChange={(open) => setModal(open ? "dress" : null)}
      />
      <GiftsModal
        open={modal === "gifts"}
        onOpenChange={(open) => setModal(open ? "gifts" : null)}
      />
    </>
  );
}

