/** The VJN emblem (traced from the company's own quotation file, `public/brand/vjn-logo.png`). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/vjn-logo.png"
      alt=""
      width={600}
      height={384}
      className={className}
      decoding="async"
    />
  );
}
