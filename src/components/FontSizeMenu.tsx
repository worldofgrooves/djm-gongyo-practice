"use client";

export type FontSizeKey = "sm" | "md" | "lg";

interface FontSizeOption {
  value: FontSizeKey;
  label: string;
  preview: string;
  desc: string;
}

const fontSizeOptions: FontSizeOption[] = [
  { value: "sm", label: "Small", preview: "Aa", desc: "16px -- compact view" },
  { value: "md", label: "Medium", preview: "Aa", desc: "19px -- default" },
  { value: "lg", label: "Large", preview: "Aa", desc: "22px -- easier to read" },
];

interface FontSizeMenuProps {
  isOpen: boolean;
  currentSize: FontSizeKey;
  onSelect: (size: FontSizeKey) => void;
  onClose: () => void;
}

export default function FontSizeMenu({
  isOpen,
  currentSize,
  onSelect,
  onClose,
}: FontSizeMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-[99]"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-white rounded-t-[20px] pb-[calc(env(safe-area-inset-bottom,0px)+20px)] pt-2 shadow-[0_-8px_40px_rgba(0,0,0,0.15)] z-[100] animate-slide-up">
        <div className="w-9 h-1 bg-paper-deep rounded-full mx-auto mt-2 mb-4" />
        <div className="px-5 pb-3 text-[11px] font-medium tracking-[0.1em] uppercase text-ink-muted">
          Font Size
        </div>

        {fontSizeOptions.map((opt) => (
          <div
            key={opt.value}
            className={`flex items-center px-5 py-4 cursor-pointer gap-4 transition-colors active:bg-paper-warm ${
              currentSize === opt.value ? "text-gold" : ""
            }`}
            onClick={() => onSelect(opt.value)}
          >
            <div
              className={`font-sans font-semibold w-[52px] ${
                opt.value === "sm"
                  ? "text-[16px]"
                  : opt.value === "md"
                  ? "text-[19px]"
                  : "text-[22px]"
              }`}
            >
              {opt.preview}
            </div>
            <div className="flex-1">
              <div
                className={`text-sm font-medium ${
                  currentSize === opt.value ? "text-gold" : "text-ink"
                }`}
              >
                {opt.label}
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  currentSize === opt.value ? "text-gold/70" : "text-ink-soft"
                }`}
              >
                {opt.desc}
              </div>
            </div>
            {currentSize === opt.value && (
              <span className="text-gold text-lg">&#10003;</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
