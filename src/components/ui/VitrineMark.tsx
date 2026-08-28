interface VitrineMarkProps {
  className?: string
  filled?: boolean
}

/** Flat brass line-art motif of the hero vitrine, reused wherever a live
 * WebGL vitrine would be out of the 3D performance budget. */
export function VitrineMark({ className, filled = false }: VitrineMarkProps) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M20 140V52a4 4 0 0 1 4-4h72a4 4 0 0 1 4 4v88" />
      <path d="M10 140h100" strokeLinecap="round" />
      <path d="M28 48V38a32 32 0 0 1 64 0v10" />
      <path d="M60 18V4M50 10l10-7 10 7" strokeLinecap="round" strokeLinejoin="round" />
      {filled && (
        <>
          <ellipse cx="60" cy="96" rx="20" ry="10" fill="currentColor" opacity="0.15" stroke="none" />
          <path d="M60 70v34M46 84l14-8 14 8M44 100l16-6 16 6" strokeOpacity="0.6" />
        </>
      )}
    </svg>
  )
}
