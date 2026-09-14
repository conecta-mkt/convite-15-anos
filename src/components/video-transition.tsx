import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/assets";
import { LoadingScreen } from "@/components/loading-screen";

interface VideoTransitionProps {
  onComplete: () => void;
  onStartMusic: () => void;
}

export function VideoTransition({ onComplete, onStartMusic }: VideoTransitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [whiteOverlay, setWhiteOverlay] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Listener para quando o vídeo estiver pronto para tocar
    const handleCanPlay = () => {
      setIsReady(true);
    };

    // Listener para monitorar progresso de carregamento
    const handleProgress = () => {
      const video = videoRef.current;
      if (!video || !video.buffered.length) return;
      
      // Calcula percentual de carregamento
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const duration = video.duration;
      if (duration > 0) {
        setLoadProgress((bufferedEnd / duration) * 100);
      }
    };

    // Listener para cortar 0.5s do final do vídeo
    const handleTimeUpdate = () => {
      const video = videoRef.current;
      if (!video || !isPlaying) return;
      
      // Se faltam 0.5 segundos ou menos para o fim, inicia a transição
      if (video.duration - video.currentTime <= 0.5) {
        handleComplete();
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isPlaying]);

  function handleClick() {
    const video = videoRef.current;
    if (!video || isPlaying) return;

    // Inicia vídeo e música juntos
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          // Inicia a música junto com o vídeo
          onStartMusic();
        })
        .catch((error) => {
          console.error("Erro ao reproduzir vídeo:", error);
          // Se falhar, pula direto para o convite
          handleComplete();
        });
    }
  }

  function handleComplete() {
    // Inicia fade-in do overlay branco PRIMEIRO (enquanto vídeo ainda visível)
    setWhiteOverlay(true);
    
    // Depois inicia fade-out do vídeo
    setTimeout(() => {
      setFadeOut(true);
    }, 100);
    
    // Completa a transição (700ms total para garantir branco)
    setTimeout(() => {
      onComplete();
    }, 700);
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
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Vídeo */}
      <video
        ref={videoRef}
        src={asset("/image-2/video-01.mp4")}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted={false}
        preload="auto"
        crossOrigin="anonymous"
      />

      {/* Overlay para escurecer um pouco se necessário */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Overlay branco para transição elegante */}
      <div 
        className={cn(
          "absolute inset-0 bg-white transition-opacity duration-700 pointer-events-none",
          whiteOverlay ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Imagem principal no topo - aparece imediatamente, não depende de canplay */}
      {!isPlaying && (
        <div className="absolute top-[8%] left-0 right-0 cursor-pointer flex justify-center">
          <div className="relative">
            {/* Nuvem escura de fundo */}
            <div className="absolute inset-0 -inset-x-6 -inset-y-4 rounded-2xl bg-black/70 blur-2xl" />
            
            {/* Imagem com destaque */}
            <img 
              src={asset("/image-2/btn-comeca-aqui.png")}
              alt="O Próximo Capítulo Começa Aqui!"
              className="relative w-auto max-w-[70vw] max-h-[30vh] h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Imagem sutil no canto inferior direito - aparece imediatamente */}
      {!isPlaying && (
        <div className="absolute bottom-20 right-8 cursor-pointer">
          <div className="relative">
            {/* Nuvem escura de fundo */}
            <div className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-lg bg-black/60 blur-xl" />
            
            {/* Imagem com destaque */}
            <img 
              src={asset("/image-2/btn-toque-no-sol.png")}
              alt="Toque no Sol e Descubra a História"
              className="relative w-auto max-w-[155px] max-h-[15vh] h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Indicador de loading enquanto carrega */}
      {!isReady && (
        <LoadingScreen 
          progress={loadProgress}
          message="Preparando sua história mágica..."
        />
      )}
    </div>
  );
}
