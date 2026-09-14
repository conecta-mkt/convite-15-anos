import { createFileRoute } from "@tanstack/react-router";
import { InvitationApp } from "@/components/invite/app";

export const Route = createFileRoute("/convite-15-anos/")({
  component: Home,
});

function Home() {
  return <InvitationApp />;
}
