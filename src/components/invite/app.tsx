import { useState, useRef } from "react";
import { VideoTransition } from "@/components/video-transition";
import { MainCard } from "@/components/main-card";

type Stage = "video" | "card";

export function InvitationApp() {
  const [stage, setStage] = useState<Stage>("video");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Função para iniciar a música (chamada pelo VideoTransition)
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error("Erro ao reproduzir música:", err));
    }
  };

  return (
    <div className="min-h-dvh bg-white flex items-center justify-center">
      {/* Música de fundo global - continua entre transições */}
      <audio
        ref={audioRef}
        src="/image-2/music.mp3"
        loop
        preload="auto"
      />

      {/* Container responsivo - mobile first, limitado no desktop */}
      <div className="relative w-full h-dvh max-w-[480px] max-h-[100dvh] mx-auto bg-white shadow-2xl overflow-hidden">
        {/* 1. Vídeo de Introdução (pausado, clique para iniciar) */}
        {stage === "video" && (
          <VideoTransition 
            onComplete={() => setStage("card")} 
            onStartMusic={startMusic}
          />
        )}

        {/* 2. Card Principal do Convite */}
        {stage === "card" && <MainCard />}
      </div>
    </div>
  );
}
