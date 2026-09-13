import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [loaded, setLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Pré-carregar imagem
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true); // Fallback
    img.src = "/image-2/image-0.png";
  }, []);

  function handleClick() {
    if (!loaded) return;
    
    // Fade out antes de completar
    setFadeOut(true);
    setTimeout(() => {
      onComplete();
    }, 800); // Duração do fade
  }

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 cursor-pointer transition-opacity duration-800",
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
      aria-label="Clique para abrir o convite"
    >
      {/* Imagem de fundo */}
      <img
        src="/image-2/image-0.png"
        alt="O Próximo Capítulo Começa Aqui!"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Overlay escuro sutil para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/10" />


      {/* Loading spinner enquanto carrega */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-950">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white/90" />
        </div>
      )}
    </div>
  );
}
