import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

// Obter BASE_URL do Vite (necessário para GitHub Pages)
// Em produção: /convite-15-anos/
// Em desenvolvimento: /
const baseUrl = import.meta.env.BASE_URL;
// Remover barra final para TanStack Router (espera: /convite-15-anos, não /convite-15-anos/)
const basename = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) || '/' : baseUrl;

// Create router instance com basename configurado
const router = createRouter({
  routeTree,
  basename: basename !== '/' ? basename : undefined,
  defaultErrorComponent: AppErrorComponent,
});

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
