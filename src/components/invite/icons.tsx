import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GlassesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M4.5 4.5h6.2L9.6 12.2a3.2 3.2 0 1 1-5.4.2L4.5 4.5Z" />
      <path d="M7.6 15.4v4.2" />
      <path d="M5.2 21h5" />
      <path d="M13.2 6h6.2l-1.1 7.4a3.2 3.2 0 1 1-5.4.1L13.2 6Z" />
      <path d="M16.3 16.6v2.8" />
      <path d="M13.8 21h5.2" />
    </svg>
  );
}

export function HangerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M12 4.5a1.8 1.8 0 1 0-1.7 1.8c0 .8 1.7 1.5 1.7 1.5" />
      <path d="M3.2 16.2 12 10.4l8.8 5.8" />
      <path d="M3.2 16.2h17.6" />
      <path d="M12 8v2.4" />
    </svg>
  );
}

export function CoupleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <circle cx="8.5" cy="6.2" r="2.1" />
      <path d="M4.6 14.5c.4-2.6 2.1-4 3.9-4s3.5 1.4 3.9 4" />
      <circle cx="15.4" cy="6.6" r="2.1" />
      <path d="M11.8 15.2c.5-2.5 2.2-3.9 3.6-3.9 1.6 0 3.3 1.5 3.8 4" />
      <path d="M8.2 16.4c.6 2.6 2.2 4.2 3.8 4.2 1.5 0 3-1.4 3.7-3.8" />
    </svg>
  );
}

export function DanceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <circle cx="8" cy="5.5" r="1.7" />
      <path d="M8 7.5 6.2 12.2 3.8 15.5" />
      <path d="M6.2 12.2 10.4 11l1.4 4.6" />
      <path d="M10.4 11 8.6 8.6" />
      <circle cx="16.5" cy="6" r="1.7" />
      <path d="M16.5 8 18 12.4l2.4 4" />
      <path d="M18 12.4 14.2 13l-1 4.4" />
      <path d="M14.2 13 16.2 9.2" />
    </svg>
  );
}

export function LeafSprigIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} {...props}>
      <path d="M12 20.5c0-8 4.5-14.5 9-16.5-1 7-5 12-9 16.5Z" />
      <path d="M12 20.5C12 12.5 7.5 6 3 4c1 7 5 12 9 16.5Z" />
      <path d="M12 20.5V9" />
    </svg>
  );
}
