type TIconMsProps = {
  width?: number;
  height?: number;
};

export default function IconMs(props: TIconMsProps) {
  const { width, height } = props;

  return (
    <svg
      width={width ? width : 51}
      height={height ? height : 51}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#F3F5F7" />
      <g clip-path="url(#clip0_14382_21987)">
        <path d="M10 10H30V30H10V10Z" fill="#F3F3F3" />
        <path
          d="M10.8696 10.8691H19.5652V19.5648H10.8696V10.8691Z"
          fill="#F35325"
        />
        <path
          d="M20.4348 10.8691H29.1304V19.5648H20.4348V10.8691Z"
          fill="#81BC06"
        />
        <path
          d="M10.8696 20.4346H19.5652V29.1302H10.8696V20.4346Z"
          fill="#05A6F0"
        />
        <path
          d="M20.4348 20.4346H29.1304V29.1302H20.4348V20.4346Z"
          fill="#FFBA08"
        />
      </g>
      <circle cx="20" cy="20" r="19.5" stroke="black" stroke-opacity="0.05" />
      <defs>
        <clipPath id="clip0_14382_21987">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(10 10)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
