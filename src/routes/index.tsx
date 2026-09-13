import { createFileRoute } from "@tanstack/react-router";
import { InvitationApp } from "@/components/invite/app";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <InvitationApp />;
}
