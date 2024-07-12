// import { IconClose, IconTime } from "@/icons";

import { IconClose, IconTime } from "@/icons";

// export default function RcSrcList() {
//   return (
//     <div className="flex w-[542px] h-[40px] justify-between items-center">
//       <div className="flex gap-2 items-center">
//         <IconTime />
//         <span className="font-medium text-grayscale-600 text-base">테슬라</span>
//       </div>
//       <div className="flex gap-2 items-center">
//         <span className="font-regular text-sm text-grayscale-400">06.14</span>
//         <IconClose />
//       </div>
//     </div>
//   );
// }

type TRcSrcListProps = {
  term: string;
  onDelete: (term: string) => void;
};

export default function RcSrcList({ term, onDelete }: TRcSrcListProps) {
  return (
    <div className="flex w-[542px] h-[40px] justify-between items-center">
      <div className="flex gap-2 items-center">
        <IconTime />
        <span className="font-medium text-grayscale-600 text-base">{term}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-regular text-sm text-grayscale-400">06.14</span>
        <span className="cursor-pointer" onClick={() => onDelete(term)}>
          <IconClose />
        </span>
      </div>
    </div>
  );
}
