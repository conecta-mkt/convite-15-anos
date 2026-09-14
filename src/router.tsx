import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  // TanStack Router v1 não suporta basepath corretamente
  // Removendo basepath - o Vite cuida dos assets via BASE_URL
  return createRouter({ 
    routeTree, 
    defaultErrorComponent: AppErrorComponent
  });
}
