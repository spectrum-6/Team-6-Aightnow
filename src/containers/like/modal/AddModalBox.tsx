import Input from "@/components/Input";
import { IconClose } from "@/icons";
import SearchResult from "./SearchResult";
import SearchContainer from "./SearchContainer";

type TAddModalBoxProps = {
  closeAddModal: () => void;
  inputValue: string;
  setInputValue: (e: string) => void;
  isFavoriteStock: boolean;
  toggleFavoriteStock: () => void;
};

export default function AddModalBox(props: TAddModalBoxProps) {
  const {
    closeAddModal,
    inputValue,
    setInputValue,
    isFavoriteStock,
    toggleFavoriteStock,
  } = props;
  console.log(props);

  return (
    <>
      <div
        className="fixed inset-0 bg-[#4C4C4C] opacity-53"
        onClick={closeAddModal}
      ></div>
      <div className="w-[794px] h-[735px] p-10 rounded-[32px] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <h3 className="mb-10 text-navy-900 text-2xl font-bold text-center">
            관심 종목 추가
          </h3>
          <button
            className="w-12 h-12 flex items-center justify-center absolute right-0 -top-2"
            onClick={closeAddModal}
          >
            <IconClose />
          </button>
        </div>
        <p className="mb-6">
          <Input
            inputValue={inputValue}
            setInputValue={(e) => setInputValue(e.target.value)}
            iconType="search"
            iconPosition="right"
            placeholder="검색어를 입력해주세요."
          />
        </p>
        {inputValue ? (
          <SearchResult
            isFavoriteStock={isFavoriteStock}
            toggleFavoriteStock={toggleFavoriteStock}
          />
        ) : (
          <SearchContainer />
        )}
      </div>
    </>
  );
}
