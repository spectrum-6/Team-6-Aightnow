// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { IconEdit } from "@/icons";

// export default function EditProfile() {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(true);

//   useEffect(() => {
//     if (!isOpen) {
//       router.back();
//     }
//   }, [isOpen, router]);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const handleButtonClick = () => {
//     setIsOpen(false);
//     router.push("/mypage"); // 'mypage' 경로로 이동
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
//       onClick={(event) => {
//         if (event.target === event.currentTarget) {
//           setIsOpen(false);
//         }
//       }}
//     >
//       <div className="bg-white rounded-[32px] w-[590px] h-[688px] p-10 flex flex-col items-center justify-center">
//         <h3 className="font-bold text-navy-900 text-center mb-10">
//           프로필 수정
//         </h3>
//         <div className="relative w-[120px] h-[120px] mb-8 flex items-center justify-center">
//           <img
//             src="https://i.ibb.co/3BtYXVs/Vector.png"
//             alt="프로필"
//             className="w-[100px] h-[100px] rounded-full"
//           />
//           <button>
//             <IconEdit className="absolute w-[33.33px] h-[33.33px] left-[65%] top-[65%] bg-grayscale-400 rounded-full" />
//           </button>
//         </div>
//         <div className="w-[386px] mb-6 flex flex-col items-center">
//           <label
//             htmlFor="nickname"
//             className="block text-navy-900 mb-1 text-base font-medium self-start"
//           >
//             닉네임
//           </label>
//           <div className="relative w-full h-[56px] border border-gray-300 rounded-lg p-2 flex items-center">
//             <input
//               id="nickname"
//               type="text"
//               className="w-full h-full px-2 focus:outline-none"
//             />
//             <button className="absolute top-1/2 right-4 transform -translate-y-1/2 w-[120px] h-[36px] bg-navy-900 text-white rounded-lg text-sm font-medium">
//               중복 확인
//             </button>
//           </div>
//         </div>
//         <div className="w-[386px] mb-14 flex flex-col items-center">
//           <label
//             htmlFor="interests"
//             className="block text-navy-900 mb-1 text-base font-medium self-start"
//           >
//             관심 종목
//           </label>
//           <input
//             id="interests"
//             type="text"
//             className="w-full h-[56px] border border-gray-300 rounded-lg px-4 focus:outline-none"
//           />
//         </div>
//         <button
//           className="w-[396px] h-[64px] bg-grayscale-200 hover:bg-navy-700 text-grayscale-300 hover:text-white font-medium py-2 px-6 rounded-lg text-lg"
//           onClick={handleButtonClick}
//         >
//           수정하기
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconEdit } from "@/icons";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import Image from "next/image";
import SerchDropdown from "@/containers/account/signUp/SerchDropdown";

export default function EditProfile() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  // 추가
  const [userNickname, setUserNickname] = useState("");
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [inputState, setInputState] = useState<"warning" | "success" | null>(
    "warning",
  );

  const [tagLength, setTagLength] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      router.back();
    }
  }, [isOpen, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleButtonClick = () => {
    setIsOpen(false);
    router.push("/mypage"); // 'mypage' 경로로 이동
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="bg-white rounded-[32px] w-[590px] h-[688px] p-10 flex flex-col items-center justify-center">
        <h3 className="font-bold text-navy-900 text-center mb-10">
          프로필 수정
        </h3>
        <div className="relative w-[120px] h-[120px] mb-8 flex items-center justify-center">
          {/* 이 이미지는 버튼까지 붙어있는거라서 일단 버튼 따로 되어있는걸로 적용시켜뒀습니다!
          + 적절한걸로 골라서 쓰세요! 🍀 */}
          {/* <Image
            src={"/images/profile_img.png"}
            alt="사용자 기본 프로필"
            width={120}
            height={120}
          /> */}
          {/* 프로필 이미지 */}
          <img
            src="https://i.ibb.co/3BtYXVs/Vector.png"
            alt="프로필"
            className="w-[100px] h-[100px] rounded-full"
          />
          {/* 이미지 수정 버튼 */}
          <button>
            <IconEdit className="absolute w-[33.33px] h-[33.33px] left-[65%] top-[65%] bg-grayscale-400 rounded-full" />
          </button>
        </div>
        {/* DuplicateCheckInput 에서 가져온 인풋 테스트 */}
        <div className="w-[386px] mb-6">
          <DuplicateCheckInput
            type="text"
            label="닉네임"
            // caption={captionText}
            // state={inputState}
            inputValue={userNickname}
            setInputValue={(e) => setInputValue(e.target.value)}
            // buttonClickHandler={() => console.log("중복확인 버튼 클릭")}
            placeholder="닉네임을 입력해 주세요."
          />
        </div>

        {/* 닉네임 input */}
        {/* <div className="w-[386px] mb-6 flex flex-col items-center">
          <label
            htmlFor="nickname"
            className="block text-navy-900 mb-1 text-base font-medium self-start"
          >
            닉네임
          </label>
          <div className="relative w-full h-[56px] border border-gray-300 rounded-lg p-2 flex items-center">
            <input
              id="nickname"
              type="text"
              className="w-full h-full px-2 focus:outline-none"
            />
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 w-[120px] h-[36px] bg-navy-900 text-white rounded-lg text-sm font-medium">
              중복 확인
            </button>
          </div>
        </div> */}

        {/* 관심종목 input */}
        <div className="w-[386px] mb-14 flex flex-col items-center">
          <label
            htmlFor="interests"
            className="block text-navy-900 mb-1 text-base font-medium self-start"
          >
            관심 종목
          </label>
          <input
            id="interests"
            type="text"
            className="w-full h-[56px] border border-gray-300 rounded-lg px-4 focus:outline-none"
          />
        </div>
        <button
          className="w-[396px] h-[64px] bg-grayscale-200 hover:bg-navy-700 text-grayscale-300 hover:text-white font-medium py-2 px-6 rounded-lg text-lg"
          onClick={handleButtonClick}
        >
          수정하기
        </button>
      </div>
    </div>
  );
}
