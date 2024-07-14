type TIconRefreshProps = {
    color?: string;
};

export default function IconRefresh(props: TIconRefreshProps) {
    const { color } = props;

    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 22.4534C9.20833 22.4534 6.84375 21.4846 4.90625 19.5471C2.96875 17.6096 2 15.245 2 12.4534C2 9.6617 2.96875 7.29712 4.90625 5.35962C6.84375 3.42212 9.20833 2.45337 12 2.45337C13.4375 2.45337 14.8125 2.75045 16.125 3.34462C17.4375 3.93795 18.5625 4.7867 19.5 5.89087V3.70337C19.5 3.3492 19.62 3.05212 19.86 2.81212C20.0992 2.57295 20.3958 2.45337 20.75 2.45337C21.1042 2.45337 21.4008 2.57295 21.64 2.81212C21.88 3.05212 22 3.3492 22 3.70337V9.95337C22 10.3075 21.88 10.6042 21.64 10.8434C21.4008 11.0834 21.1042 11.2034 20.75 11.2034H14.5C14.1458 11.2034 13.8492 11.0834 13.61 10.8434C13.37 10.6042 13.25 10.3075 13.25 9.95337C13.25 9.5992 13.37 9.30212 13.61 9.06212C13.8492 8.82295 14.1458 8.70337 14.5 8.70337H18.5C17.8333 7.5367 16.9221 6.62004 15.7662 5.95337C14.6096 5.2867 13.3542 4.95337 12 4.95337C9.91667 4.95337 8.14583 5.68254 6.6875 7.14087C5.22917 8.5992 4.5 10.37 4.5 12.4534C4.5 14.5367 5.22917 16.3075 6.6875 17.7659C8.14583 19.2242 9.91667 19.9534 12 19.9534C13.4375 19.9534 14.7658 19.573 15.985 18.8121C17.2033 18.0521 18.1146 17.0367 18.7188 15.7659C18.8229 15.5367 18.995 15.3442 19.235 15.1884C19.4742 15.0317 19.7188 14.9534 19.9688 14.9534C20.4479 14.9534 20.8075 15.12 21.0475 15.4534C21.2867 15.7867 21.3125 16.1617 21.125 16.5784C20.3333 18.3492 19.1146 19.7709 17.4688 20.8434C15.8229 21.9167 14 22.4534 12 22.4534Z"
                fill={color}
            />
        </svg>
    );
}