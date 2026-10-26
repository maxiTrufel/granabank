import { SearchIcon } from "@/components/ui/icons";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export function SearchInput({ value, onChange, autoFocus }: SearchInputProps) {
  return (
    <label className="flex h-[58px] items-center gap-3 rounded-2xl bg-white px-5 shadow-soft focus-within:ring-2 focus-within:ring-granate/30">
      <SearchIcon className="size-[22px] text-muted" />
      <span className="sr-only">Buscar movimientos</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ingresa un nombre o servicio"
        maxLength={60}
        autoFocus={autoFocus}
        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-[13px] placeholder:text-muted"
      />
    </label>
  );
}
