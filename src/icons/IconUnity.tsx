type TIconUnityProps = {
  width?: number;
  height?: number;
};

export default function IconUnity(props: TIconUnityProps) {
  const { width, height } = props;

  return (
    <svg
      width={width ? width : 51}
      height={height ? height : 51}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#1E1E23" />
      <g clipPath="url(#clip0_25187_47322)">
        <path
          d="M25.9181 11L18.1424 13.0171L17.0037 15.0017H14.6613L8.96777 20.5L14.6613 26.0308H17.0037L18.1424 27.9829L25.9181 30L28.0003 22.4521L26.8291 20.5L28.0003 18.5479L25.9181 11ZM17.1989 15.2945L23.1202 13.7979L19.7041 19.589H12.9044L17.1989 15.2945ZM17.1989 25.6729L12.937 21.3784H19.7366L23.1527 27.1695L17.2315 25.6729H17.1989ZM24.7794 26.226L21.3633 20.5L24.7794 14.774L26.4387 20.5L24.7794 26.226Z"
          fill="white"
        />
      </g>
      <circle cx="20" cy="20" r="19.5" stroke="black" strokeOpacity="0.05" />
      <defs>
        <clipPath id="clip0_25187_47322">
          <rect
            width="19"
            height="19"
            fill="white"
            transform="translate(9 11)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
