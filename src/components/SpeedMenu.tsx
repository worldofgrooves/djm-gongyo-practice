"use client";

interface SpeedOption {
  value: number;
  label: string;
  desc: string;
}

const speedOptions: SpeedOption[] = [
  { value: 0.5, label: "\u00BD\u00D7", desc: "Very slow -- learning mode" },
  { value: 0.75, label: "\u00BE\u00D7", desc: "Slow -- building confidence" },
  { value: 1, label: "1\u00D7", desc: "Normal pace" },
  { value: 1.25, label: "1\u00BC\u00D7", desc: "Slightly faster" },
  { value: 1.5, label: "1\u00BD\u00D7", desc: "Meeting pace" },
];

interface SpeedMenuProps {
  isOpen: boolean;
  currentSpeed: number;
  onSelect: (speed: number) => void;
  onClose: () => void;
}

export default function SpeedMenu({
  isOpen,
  currentSpeed,
  onSelect,
  onClose,
}: SpeedMenuProps) {
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
          Playback Speed
        </div>

        {speedOptions.map((opt) => (
          <div
            key={opt.value}
            className={`flex items-center px-5 py-4 cursor-pointer gap-4 transition-colors active:bg-paper-warm ${
              currentSpeed === opt.value ? "text-gold" : ""
            }`}
            onClick={() => onSelect(opt.value)}
          >
            <div className="font-serif text-[22px] font-semibold w-[52px]">
              {opt.label}
            </div>
            <div
              className={`text-sm ${
                currentSpeed === opt.value ? "text-gold" : "text-ink-soft"
              }`}
            >
              {opt.desc}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Export speed label lookup
export function getSpeedLabel(speed: number): string {
  const map: Record<number, string> = {
    0.5: "\u00BD\u00D7",
    0.75: "\u00BE\u00D7",
    1: "1\u00D7",
    1.25: "1\u00BC\u00D7",
    1.5: "1\u00BD\u00D7",
  };
  return map[speed] || `${speed}\u00D7`;
}
