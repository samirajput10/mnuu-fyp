import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 2a10 10 0 0 1 10 10" />
      <path d="m15.5 8.5-3 3-3-3" />
      <path d="m12.5 11.5 3 3-3 3" />
      <path d="m8.5 14.5 3-3-3-3" />
    </svg>
  );
}
