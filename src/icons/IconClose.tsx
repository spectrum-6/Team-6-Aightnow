interface IconCloseProps {
  color?: string;
  size?: number;
}

export default function IconClose({
  color = "#989898",
  size = 24,
}: IconCloseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_201_7934)">
        <path
          d="M12.0007 10.5867L16.2437 6.34372C16.6342 5.95325 17.2673 5.95325 17.6577 6.34372C18.0482 6.73418 18.0482 7.36725 17.6577 7.75772L13.4147 12.0007L17.6577 16.2437C18.0482 16.6342 18.0482 17.2673 17.6577 17.6577C17.2673 18.0482 16.6342 18.0482 16.2437 17.6577L12.0007 13.4147L7.75772 17.6577C7.36725 18.0482 6.73418 18.0482 6.34372 17.6577C5.95325 17.2673 5.95325 16.6342 6.34372 16.2437L10.5867 12.0007L6.34372 7.75772C5.95325 7.36725 5.95325 6.73418 6.34372 6.34372C6.73418 5.95325 7.36725 5.95325 7.75772 6.34372L12.0007 10.5867Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_201_7934">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.453369)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
