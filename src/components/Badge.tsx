import IconAi from '@/icons/IconAi';

// Badge 컴포넌트의 Props 인터페이스를 정의
// variant: 뱃지의 배경색과 텍스트 색상을 결정
// reverse: 뱃지 내부의 요소 순서를 뒤집는다
// icon: 뱃지 내부에 표시할 아이콘 컴포넌트
interface BadgeProps {
 variant?: 'black' | 'gray' | 'skyblue';
 reverse?: boolean;
 icon?: React.ReactNode;
}

// Badge 컴포넌트 정의
const Badge: React.FC<BadgeProps> = ({
 variant = 'black', // 기본값은 'black'
 reverse = false, // 기본값은 false
 icon,
}) => {
 // 각 variant에 대한 스타일을 정의
 const variantStyles = {
  black: 'bg-black text-white',
  gray: 'bg-[#E6E9EF] text-[#18254C]',
  skyblue: 'bg-[#E1F5FD] text-[#005A9B]',
 };

 // 뱃지 요소를 렌더링
 return (
  <div
   // 뱃지의 스타일을 적용
   // 요소의 순서는 reverse 값에 따라 달라진다
   className={`w-[55px] h-8 px-2 py-1 rounded justify-start items-center gap-1 inline-flex ${
    reverse ? 'flex-row-reverse' : 'flex-row'
   } ${variantStyles[variant]}`}
  >
   {/* 아이콘이 있는 경우 렌더링 */}
   {icon && (
    <div className="w-6 h-5 relative">
     <IconAi
      // 아이콘의 색상은 variant에 따라 달라진다
      className="absolute w-4 h-4 left-[3.75px] top-[2.50px]"
      color={variant === 'gray' ? '#18254C' : 'white'}
     />
     <div className="w-[13.75px] h-[13.72px] left-[3.75px] top-[2.50px] absolute" />
    </div>
   )}
   {/* 'AI' 텍스트를 렌더링*/}
   <div className="text-center text-base font-semibold font-['Pretendard'] leading-normal">
    AI
   </div>
   {/* 아이콘이 있는 경우 렌더링*/}
   {icon && (
    <div className="w-6 h-5 relative">
     <IconAi
      // 아이콘의 색상은 variant에 따라 달라진다
      className="absolute w-4 h-4 left-[3.75px] top-[2.50px]"
      color={variant === 'gray' ? '#18254C' : 'white'}
     />
     <div className="w-[13.75px] h-[13.72px] left-[3.75px] top-[2.50px] absolute" />
    </div>
   )}
  </div>
 );
};

// 커스텀 훅->이를 통해 Badge 컴포넌트의 Props를 쉽게 설정

// reverse 옵션을 활성화
export const useBadgeReverse = (props: BadgeProps) => ({
 ...props,
 reverse: true,
});

// 'black' 스타일의 뱃지를 생성
export const useBadgeBlack = () => ({ variant: 'black' });

// 'gray' 스타일의 뱃지를 생성
export const useBadgeGray = () => ({ variant: 'gray' });

// 'skyblue' 스타일의 뱃지를 생성
export const useBadgeBlue = () => ({ variant: 'skyblue' });

// Badge 컴포넌트를 내보내기
export { Badge };
