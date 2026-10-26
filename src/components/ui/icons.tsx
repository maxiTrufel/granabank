import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </BaseIcon>
);

export const BellIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9Z" />
    <path d="M10 20a2.2 2.2 0 0 0 4 0" />
  </BaseIcon>
);

export const HomeIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-5.5H9v5.5H5.5A1.5 1.5 0 0 1 4 19v-8.5Z" />
  </BaseIcon>
);

export const ListIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <rect x="5" y="3.5" width="14" height="17" rx="3" />
    <path d="M9 9h6M9 12.5h6M9 16h3.5" />
  </BaseIcon>
);

export const LogoutIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M14 4.5H7.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2H14" />
    <path d="M11 12h9.5M17 8.5l3.5 3.5-3.5 3.5" />
  </BaseIcon>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="m14.5 6-6 6 6 6" />
  </BaseIcon>
);

// Flechas rellenas de los movimientos, como en el Figma.

export const ArrowDownIcon = (props: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M9.6 3.5h4.8v8.3h4.8L12 20.5l-7.2-8.7h4.8z" />
  </svg>
);

export const ArrowUpIcon = (props: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M9.6 20.5h4.8v-8.3h4.8L12 3.5l-7.2 8.7h4.8z" />
  </svg>
);

export const SwapIcon = (props: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M6.4 15.5h3.4v-6h3.6L8.1 2.5 2.8 9.5h3.6z" />
    <path d="M14.2 8.5h3.4v6h3.6l-5.3 7-5.3-7h3.6z" />
  </svg>
);

export const AlertIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5h.01" />
  </BaseIcon>
);

export const InboxIcon = (props: IconProps) => (
  <BaseIcon {...props}>
    <path d="M3.5 13.5 6 5.5h12l2.5 8V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18v-4.5Z" />
    <path d="M3.5 13.5h5l1 2h5l1-2h5" />
  </BaseIcon>
);

export const SpinnerIcon = (props: IconProps) => (
  <BaseIcon strokeWidth={2.2} {...props}>
    <path d="M12 3a9 9 0 1 0 9 9" />
  </BaseIcon>
);
