import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/assets";

interface VideoTransitionProps {
  onComplete: () => void;
  onStartMusic: () => void;
}

export function VideoTransition({
  onComplete,
  onStartMusic,
}: VideoTransitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [whiteOverlay, setWhiteOverlay] = useState(false);

  // Evita executar a transição final mais de uma vez
  const completingRef = useRef(false);

  function handleComplete() {
    if (completingRef.current) return;
    completingRef.current = true;

    // Overlay branco primeiro
    setWhiteOverlay(true);

    setTimeout(() => {
      setFadeOut(true);
    }, 100);

    setTimeout(() => {
      onComplete();
    }, 700);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (
        video.duration &&
        video.duration - video.currentTime <= 0.5
      ) {
        handleComplete();
      }
    };

    const handleEnded = () => {
      handleComplete();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  function handleClick() {
    const video = videoRef.current;

    if (!video || isPlaying || isStarting) return;

    setIsStarting(true);

    /*
      IMPORTANTE PARA IPHONE/SAFARI:
      música e vídeo são disparados diretamente
      dentro do clique do usuário.
    */
    onStartMusic();

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsStarting(false);
        })
        .catch((error) => {
          console.error("Erro ao reproduzir vídeo:", error);
          setIsStarting(false);

          // Se o vídeo falhar, abre o convite normalmente
          handleComplete();
        });
    }
  }

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 bg-black transition-opacity duration-500",
        fadeOut && "opacity-0"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Iniciar convite"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* VÍDEO */}
      <video
        ref={videoRef}
        src={asset("/image-2/video-01.mp4")}
        poster={asset("/image-2/video-poster.webp")}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted={false}
        preload="auto"
        crossOrigin="anonymous"
      />

      {/* Escurecimento leve */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      )}

      {/* TRANSIÇÃO BRANCA */}
      <div
        className={cn(
          "absolute inset-0 bg-white transition-opacity duration-700 pointer-events-none z-50",
          whiteOverlay ? "opacity-100" : "opacity-0"
        )}
      />

      {/* CONTEÚDO INICIAL
          AGORA APARECE IMEDIATAMENTE.
          NÃO DEPENDE MAIS DO CANPLAY.
      */}
      {!isPlaying && !isStarting && (
        <>
          {/* Botão / imagem principal */}
          <div className="absolute top-[8%] left-0 right-0 cursor-pointer flex justify-center z-20">
            <div className="relative">
              <div className="absolute inset-0 -inset-x-6 -inset-y-4 rounded-2xl bg-black/70 blur-2xl" />

              <img
                src={asset("/image-2/btn-comeca-aqui.png")}
                alt="O Próximo Capítulo Começa Aqui!"
                className="relative w-auto max-w-[70vw] max-h-[30vh] h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Toque no sol */}
          <div className="absolute bottom-20 right-8 cursor-pointer z-20">
            <div className="relative">
              <div className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-lg bg-black/60 blur-xl" />

              <img
                src={asset("/image-2/btn-toque-no-sol.png")}
                alt="Toque no Sol e Descubra a História"
                className="relative w-auto max-w-[155px] max-h-[15vh] h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </>
      )}

      {/* FEEDBACK DEPOIS DO TOQUE */}
      {isStarting && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
            <p className="text-sm text-white drop-shadow-lg">
              Preparando sua experiência...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
