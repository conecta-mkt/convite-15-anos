import { useEffect, useState } from "react";

interface LoadingScreenProps {
  progress: number;
  message?: string;
}

// Gera posições aleatórias para os sparkles ao redor do círculo
function generateSparkles() {
  return Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 100;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const delay = (i % 4) * 0.3;
    const duration = 2 + (i % 3) * 0.3;
    return { x, y, delay, duration, id: i };
  });
}

export function LoadingScreen({ progress, message = "Carregando sua história..." }: LoadingScreenProps) {
  const [sparkles] = useState(generateSparkles());

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-plum to-plum-deep">
      {/* Glow background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lilac-rich/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Loading Circle */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* SVG Circular Progress */}
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="rgba(201, 160, 220, 0.2)"
              strokeWidth="3"
            />
            {/* Progress circle */}
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              strokeDasharray={`${(progress / 100) * 377} 377`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c9a0dc" />
                <stop offset="100%" stopColor="#e6d4f2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-display text-lilac-soft mb-1">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-lilac/70 font-body tracking-widest">
              CARREGANDO
            </div>
          </div>

          {/* Sparkles around circle */}
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                transform: `translate(calc(-50% + ${sparkle.x}px), calc(-50% + ${sparkle.y}px))`,
              }}
            >
              <div
                className="w-2 h-2 bg-lilac-soft rounded-full blur-sm"
                style={{
                  animation: `twinkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
                  boxShadow: "0 0 8px rgba(201, 160, 220, 0.6)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="text-center">
          <p className="text-sm font-body text-lilac-soft/80 tracking-wide">
            {message}
          </p>
          <div className="mt-4 flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 bg-lilac-soft rounded-full"
                style={{
                  animation: `bounce 1.4s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-lilac/30 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* CSS Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
