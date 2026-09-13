import { ClipboardList, Gift, UserRoundCheck } from "lucide-react";
import { GlassesIcon } from "@/components/invite/icons";
import { Monogram } from "@/components/invite/monogram";
import { INVITE } from "@/lib/invite";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/assets";
import type { ReactNode } from "react";

export type InviteAction = "rsvp" | "local" | "gifts" | "info";

function ActionButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-16 items-center justify-center rounded-full bg-lilac-rich text-cream shadow-[0_0_0_3px_var(--color-cream),0_0_0_5px_var(--color-lilac-rich)] transition-transform duration-150 active:scale-[0.96] sm:size-[4.25rem]"
    >
      {children}
    </button>
  );
}

export function InviteCard({
  onAction,
  revealed,
}: {
  onAction: (action: InviteAction) => void;
  revealed: boolean;
}) {
  return (
    <article
      className={cn(
        "relative flex min-h-dvh flex-col overflow-hidden bg-cream text-ink",
        revealed && "stagger-in",
      )}
    >
      <img
        src={asset("/images/floral-top.jpg")}
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 h-44 w-full object-cover object-top sm:h-52"
      />
      <img
        src={asset("/images/floral-top.jpg")}
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full rotate-180 object-cover object-top sm:h-52"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center px-6 pb-24 pt-16">
        <Monogram />

        <div className="relative mt-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-8xl font-semibold tracking-tight text-lilac-soft/80"
          >
            XV
          </span>
          <h1 className="relative font-display text-5xl font-medium tracking-tight text-plum sm:text-6xl">
            {INVITE.honoree}
          </h1>
        </div>

        <p className="mt-1 font-script text-3xl text-lilac-rich sm:text-4xl">
          {INVITE.tagline}
        </p>

        <blockquote className="mt-6 max-w-sm text-center font-body text-base leading-relaxed text-ink sm:text-lg">
          “{INVITE.verse}”{" "}
          <cite className="not-italic">{INVITE.verseRef}</cite>
        </blockquote>

        <div className="mt-8 flex w-full max-w-xs flex-col items-center">
          <span className="font-body text-sm tracking-[0.28em] text-ink">
            {INVITE.year}
          </span>
          <div className="mt-1 flex w-full items-center gap-3">
            <div className="flex flex-1 flex-col items-center">
              <span className="font-body text-base text-ink">
                {INVITE.weekday}
              </span>
              <span className="mt-1 h-px w-full bg-ink/70" />
            </div>
            <span className="font-display text-5xl font-medium leading-none text-plum">
              {INVITE.day}
            </span>
            <div className="flex flex-1 flex-col items-center">
              <span className="font-body text-base text-ink">{INVITE.month}</span>
              <span className="mt-1 h-px w-full bg-ink/70" />
            </div>
          </div>
          <span className="mt-2 font-body text-sm text-ink">
            {INVITE.timeLabel}
          </span>
        </div>

        <div className="mt-10 flex w-full max-w-sm items-center justify-between gap-2 px-1">
          <ActionButton
            label="Confirmar presença"
            onClick={() => onAction("rsvp")}
          >
            <UserRoundCheck className="size-7" strokeWidth={1.6} />
          </ActionButton>
          <ActionButton label="Local da festa" onClick={() => onAction("local")}>
            <GlassesIcon className="size-7" />
          </ActionButton>
          <ActionButton
            label="Lista de presentes"
            onClick={() => onAction("gifts")}
          >
            <Gift className="size-7" strokeWidth={1.6} />
          </ActionButton>
          <ActionButton
            label="Informações importantes"
            onClick={() => onAction("info")}
          >
            <ClipboardList className="size-7" strokeWidth={1.6} />
          </ActionButton>
        </div>

        <p className="mt-5 font-body text-sm italic text-ink-muted">
          Clique nos botões para interagir
        </p>
      </div>
    </article>
  );
}
