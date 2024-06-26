type TIconTranslateProps = {
    color?: string;
};

export default function IconTranslate(props: TIconTranslateProps) {
    const { color } = props;

    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_201_7937)">
                <path
                    d="M16.75 11.6667L20.4167 20.8333H18.6208L17.62 18.3333H14.2117L13.2125 20.8333H11.4175L15.0833 11.6667H16.75ZM9.66667 5V6.66667H14.6667V8.33333H13.0267C12.3839 10.2684 11.3579 12.0542 10.01 13.5842C10.6111 14.1205 11.2631 14.5969 11.9567 15.0067L11.3308 16.5717C10.4354 16.0638 9.598 15.46 8.83333 14.7708C7.34465 16.1181 5.5817 17.1268 3.66583 17.7275L3.21917 16.12C4.8607 15.5966 6.37335 14.7328 7.65833 13.585C6.70724 12.5083 5.91505 11.3011 5.30583 10H7.1725C7.63696 10.8574 8.19389 11.6613 8.83333 12.3975C9.87509 11.1968 10.6961 9.82109 11.2583 8.33417L3 8.33333V6.66667H8V5H9.66667ZM15.9167 14.0708L14.8775 16.6667H16.9542L15.9167 14.0708Z"
                    fill={color}
                />
            </g>
            <defs>
                <clipPath id="clip0_201_7937">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.453369)" />
                </clipPath>
            </defs>
        </svg>
    );
}
