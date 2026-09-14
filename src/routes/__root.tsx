import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../styles.css";

const APP_NAME = "Débora Michele — Uma Noite Para Recordar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
