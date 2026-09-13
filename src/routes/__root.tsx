import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../styles.css";

const APP_NAME = "Débora Michele — Uma Noite Para Recordar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="pt-BR" className="antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>{APP_NAME}</title>
        <meta
          name="description"
          content="Uma Noite Para Recordar. Débora Michele - 15 Anos. Sábado, 10 de outubro de 2026, às 20h30."
        />
        <meta name="theme-color" content="#4A2C5A" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Great+Vibes&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap"
        />
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  );
}
