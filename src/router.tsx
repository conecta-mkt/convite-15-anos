import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter(basename?: string) {
  // TanStack Router v1 SUPORTA basepath via basename
  // O basename deve corresponder ao BASE_URL configurado no Vite
  return createRouter({ 
    routeTree,
    basename: basename !== '/' ? basename : undefined,
    defaultErrorComponent: AppErrorComponent
  });
}
