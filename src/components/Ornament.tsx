interface OrnamentProps {
  className?: string;
}

export function CrossOrnament({ className = "" }: OrnamentProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10 L40 25 M40 55 L40 70 M25 40 L10 40 M70 40 L55 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="40" cy="40" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="2" fill="currentColor" />
      <circle cx="10" cy="40" r="2" />
      <circle cx="70" cy="40" r="2" />
      <circle cx="40" cy="10" r="2" />
      <circle cx="40" cy="70" r="2" />
    </svg>
  );
}

export function FleurDeLis({ className = "" }: OrnamentProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8 C28 14, 24 18, 24 26 C24 32, 28 36, 32 38 C36 36, 40 32, 40 26 C40 18, 36 14, 32 8 Z M16 38 C14 42, 12 46, 14 50 C16 52, 20 52, 22 50 C20 46, 18 42, 16 38 Z M48 38 C50 42, 52 46, 50 50 C48 52, 44 52, 42 50 C44 46, 46 42, 48 38 Z M32 40 L32 56 M36 56 L28 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="26" r="2" fill="currentColor" />
    </svg>
  );
}

export function ShieldOrnament({ className = "" }: OrnamentProps) {
  return (
    <svg viewBox="0 0 64 72" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8 L60 8 L60 36 C60 52, 48 64, 32 70 C16 64, 4 52, 4 36 Z" />
      <path d="M32 16 L32 56 M16 36 L48 36" />
      <circle cx="32" cy="36" r="4" fill="currentColor" />
    </svg>
  );
}

export function Crown({ className = "" }: OrnamentProps) {
  return (
    <svg viewBox="0 0 100 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 50 L10 20 L40 35 L50 15 L60 35 L90 20 L90 50 Z" />
      <rect x="10" y="50" width="80" height="6" />
      <circle cx="20" cy="20" r="3" />
      <circle cx="50" cy="15" r="3" />
      <circle cx="80" cy="20" r="3" />
      <rect x="30" y="40" width="3" height="8" />
      <rect x="48" y="40" width="3" height="8" />
      <rect x="66" y="40" width="3" height="8" />
    </svg>
  );
}