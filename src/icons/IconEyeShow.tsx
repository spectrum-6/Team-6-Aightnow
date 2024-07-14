export default function IconEyeShow({ color }: { color?: string }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_201_7895)">
        <path
          d="M12 6.95337C15.79 6.95337 19.17 9.08337 20.82 12.4534C19.17 15.8234 15.8 17.9534 12 17.9534C8.2 17.9534 4.83 15.8234 3.18 12.4534C4.83 9.08337 8.21 6.95337 12 6.95337ZM12 4.95337C7 4.95337 2.73 8.06337 1 12.4534C2.73 16.8434 7 19.9534 12 19.9534C17 19.9534 21.27 16.8434 23 12.4534C21.27 8.06337 17 4.95337 12 4.95337ZM12 9.95337C13.38 9.95337 14.5 11.0734 14.5 12.4534C14.5 13.8334 13.38 14.9534 12 14.9534C10.62 14.9534 9.5 13.8334 9.5 12.4534C9.5 11.0734 10.62 9.95337 12 9.95337ZM12 7.95337C9.52 7.95337 7.5 9.97337 7.5 12.4534C7.5 14.9334 9.52 16.9534 12 16.9534C14.48 16.9534 16.5 14.9334 16.5 12.4534C16.5 9.97337 14.48 7.95337 12 7.95337Z"
          fill={color ? color : "#C5C5C5"}
        />
      </g>
      <defs>
        <clipPath id="clip0_201_7895">
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