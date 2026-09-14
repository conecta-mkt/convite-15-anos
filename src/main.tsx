import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

// Debug: Log das configurações
console.log('🔍 DIAGNÓSTICO DO ROUTER');
console.log('  BASE_URL (Vite):', import.meta.env.BASE_URL);
console.log('  pathname (Browser):', window.location.pathname);
console.log('  href (Browser):', window.location.href);

// IMPORTANTE: NÃO usar basename - TanStack Router v1 tem problemas com basename
// O Vite com base: '/convite-15-anos/' já cuida dos caminhos

// Create router instance SEM basename
const router = createRouter({
  routeTree,
  defaultErrorComponent: AppErrorComponent,
});

// Registrar router para type safety
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
