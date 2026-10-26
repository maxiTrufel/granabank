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

export const ArrowDownIcon = (props: IconProps) => (
  <BaseIcon strokeWidth={2.4} {...props}>
    <path d="M12 5v13M7 13l5 5 5-5" />
  </BaseIcon>
);

export const ArrowUpIcon = (props: IconProps) => (
  <BaseIcon strokeWidth={2.4} {...props}>
    <path d="M12 19V6M7 11l5-5 5 5" />
  </BaseIcon>
);

export const SwapIcon = (props: IconProps) => (
  <BaseIcon strokeWidth={2.2} {...props}>
    <path d="M9 4v11M5.5 11.5 9 15l3.5-3.5" />
    <path d="M15 20V9M11.5 12.5 15 9l3.5 3.5" />
  </BaseIcon>
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
