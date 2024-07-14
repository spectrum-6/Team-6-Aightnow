type TIconNvidiaProps = {
  width?: number;
  height?: number;
};

export default function IconNvidia(props: TIconNvidiaProps) {
  const { width, height } = props;

  return (
    <svg
      width={width ? width : 51}
      height={height ? height : 51}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="white" />
      <g clipPath="url(#clip0_14382_21997)">
        <path
          d="M20.0098 40.0098C31.0555 40.0098 40.0098 31.0555 40.0098 20.0098C40.0098 8.96407 31.0555 0.00976562 20.0098 0.00976562C8.96407 0.00976562 0.00976562 8.96407 0.00976562 20.0098C0.00976562 31.0555 8.96407 40.0098 20.0098 40.0098Z"
          fill="#76B900"
        />
        <path
          d="M16.8195 17.0666V15.7518C16.9469 15.7428 17.0758 15.7357 17.207 15.7318C20.8008 15.6189 23.1606 18.8213 23.1606 18.8213C23.1606 18.8213 20.6133 22.3596 17.882 22.3596C17.521 22.3612 17.1621 22.3038 16.8195 22.1896V18.2033C18.2192 18.3725 18.4992 18.9904 19.3418 20.3932L21.2133 18.815C21.2133 18.815 19.8461 17.0232 17.5449 17.0232C17.3027 17.0243 17.0606 17.0387 16.8199 17.0662M16.8199 12.7236V14.6877C16.9488 14.6771 17.0781 14.6693 17.2074 14.6646C22.2074 14.4963 25.4641 18.7662 25.4641 18.7662C25.4641 18.7662 21.7223 23.3139 17.8246 23.3139C17.4875 23.3139 17.1511 23.2842 16.8192 23.2252V24.4393C17.0968 24.4746 17.3764 24.4924 17.6563 24.4924C21.2832 24.4924 23.9063 22.64 26.4453 20.4479C26.866 20.7854 28.5899 21.6053 28.9453 21.9646C26.5301 23.9865 20.902 25.6162 17.7113 25.6162C17.4039 25.6162 17.1082 25.5979 16.8184 25.5697V27.2756H30.6047V12.724L16.8199 12.7236ZM16.8199 22.1889V23.2248C13.4645 22.6275 12.5332 19.1408 12.5332 19.1408C12.5332 19.1408 14.1442 17.3561 16.8195 17.0674V18.2033H16.8141C15.4106 18.035 14.3141 19.3459 14.3141 19.3459C14.3141 19.3459 14.9289 21.5541 16.8203 22.1896M10.8594 18.9889C10.8594 18.9889 12.8477 16.0549 16.818 15.7518V14.6877C12.4219 15.0393 8.61407 18.7643 8.61407 18.7643C8.61407 18.7643 10.7707 25.0002 16.8195 25.5705V24.4377C12.3809 23.8807 10.8594 18.9889 10.8594 18.9889Z"
          fill="white"
        />
      </g>
      <circle cx="20" cy="20" r="19.5" stroke="black" strokeOpacity="0.05" />
      <defs>
        <clipPath id="clip0_14382_21997">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}