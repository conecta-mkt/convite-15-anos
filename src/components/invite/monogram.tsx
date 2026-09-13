import { INVITE } from "@/lib/invite";
import { asset } from "@/lib/assets";

export function Monogram({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-20 w-20" : "h-24 w-24";
  const diamond = size === "sm" ? "inset-3" : "inset-3.5";
  const letter = size === "sm" ? "text-4xl" : "text-5xl";

  return (
    <div className={`relative mx-auto ${box}`}>
      <div
        className={`absolute ${diamond} rotate-45 rounded-sm bg-lilac-rich shadow-[0_8px_24px_rgb(122_75_150_/_0.35)]`}
      />
      <span
        className={`absolute inset-0 flex items-center justify-center font-script ${letter} leading-none text-cream`}
        style={{ paddingTop: "0.15em" }}
      >
        {INVITE.monogram}
      </span>
      <img
        src={asset("/images/floral-top.jpg")}
        alt=""
        className="pointer-events-none absolute -right-10 top-1 h-16 w-20 rounded-full object-cover object-[20%_10%] mix-blend-multiply"
      />
    </div>
  );
}
