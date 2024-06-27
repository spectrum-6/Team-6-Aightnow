export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <>
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect
          x="11.2305"
          y="16.8867"
          width="8"
          height="24"
          rx="4"
          transform="rotate(-45 11.2305 16.8867)"
          fill="#C0C8D9"
        />
        <rect
          y="52"
          width="8"
          height="24"
          rx="4"
          transform="rotate(-90 0 52)"
          fill="#C0C8D9"
        />
        <rect
          x="16.8867"
          y="84.7695"
          width="8"
          height="24"
          rx="4"
          transform="rotate(-135 16.8867 84.7695)"
          fill="#C0C8D9"
        />
        <rect x="44" y="72" width="8" height="24" rx="4" fill="#C0C8D9" />
        <rect
          x="62.1406"
          y="67.7988"
          width="8"
          height="24"
          rx="4"
          transform="rotate(-45 62.1406 67.7988)"
          fill="#C0C8D9"
        />
        <rect
          x="72"
          y="52"
          width="8"
          height="24"
          rx="4"
          transform="rotate(-90 72 52)"
          fill="#C0C8D9"
        />
        <rect
          x="67.7969"
          y="33.8574"
          width="8"
          height="24"
          rx="4"
          transform="rotate(-135 67.7969 33.8574)"
          fill="#C0C8D9"
        />
        <rect x="44" width="8" height="24" rx="4" fill="#18254C" />
      </svg>
    </>
  );
}
