type NavCircleButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  "aria-label": string;
};

export default function NavCircleButton({
  direction,
  onClick,
  "aria-label": ariaLabel,
}: NavCircleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-700/50 bg-[#1a3d32] text-stone-100 shadow-md transition-all hover:border-red-400/60 hover:bg-[#234a3d] active:scale-95"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {direction === "right" ? (
          <>
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </>
        ) : (
          <>
            <path d="M19 12H5" />
            <path d="m11 6-6 6 6 6" />
          </>
        )}
      </svg>
    </button>
  );
}
