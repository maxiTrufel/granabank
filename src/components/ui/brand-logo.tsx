import type { CardBrand } from "@/lib/types";

// Logos de los emisores tal como aparecen en el Figma (sección "Issuers").

function MastercardLogo() {
  return (
    <svg width={37} height={23} viewBox="0 0 32 20" role="img" aria-label="Mastercard">
      <defs>
        <clipPath id="mastercard-left">
          <circle cx="10" cy="10" r="10" />
        </clipPath>
      </defs>
      <circle cx="10" cy="10" r="10" fill="#dc3d33" />
      <circle cx="22" cy="10" r="10" fill="#e6aa55" />
      <circle cx="22" cy="10" r="10" fill="#d97c34" clipPath="url(#mastercard-left)" />
    </svg>
  );
}

function VisaLogo() {
  return (
    <svg width={36} height={22} viewBox="0 0 36 22" role="img" aria-label="Visa">
      <rect width="36" height="22" rx="3" fill="#2010bd" />
      <path d="M5 7.2 9.4 6l-1.2 2.6Z" fill="#f2a83b" />
      <text
        x="18.5"
        y="15.6"
        textAnchor="middle"
        fill="#fff"
        fontSize="10"
        fontWeight="800"
        fontStyle="italic"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="0.3"
      >
        VISA
      </text>
    </svg>
  );
}

export function BrandLogo({ brand }: { brand: CardBrand }) {
  return brand === "VISA" ? <VisaLogo /> : <MastercardLogo />;
}
