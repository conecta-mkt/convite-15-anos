import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

// Obter BASE_URL do Vite (necessário para GitHub Pages)
// Em produção: /convite-15-anos/
// Em desenvolvimento: /
const baseUrl = import.meta.env.BASE_URL;

// Determinar basename com fallback para detecção automática
let basename = undefined;
if (baseUrl && baseUrl !== '/') {
  // Remover barra final para TanStack Router
  basename = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
} else if (typeof window !== 'undefined' && window.location.pathname.includes('convite-15-anos')) {
  // Fallback: detectar se estamos em GitHub Pages pelo pathname
  basename = '/convite-15-anos';
}

// Debug: Verificar configuração do router
console.log('🔍 DIAGNÓSTICO DO ROUTER');
console.log('  BASE_URL (Vite):', baseUrl);
console.log('  basename (Router):', basename);
console.log('  pathname (Browser):', window.location.pathname);
console.log('  href (Browser):', window.location.href);
console.log('  basename será passado?', basename !== undefined);

// Create router instance com basename configurado
const router = createRouter({
  routeTree,
  basename: basename, // Passar basename como está (undefined para raiz, string para subrotas)
  defaultErrorComponent: AppErrorComponent,
});

// Adicionar listener para erros de rota
router.subscribe('onRouteChange', (state) => {
  console.log('🔄 ROTA ALTERADA:', state);
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
