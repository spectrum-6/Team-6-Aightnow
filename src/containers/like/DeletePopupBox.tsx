import Popup from "@/components/Popup/Popup";
import TextButton from "@/components/Button/TextButton";

type TDeletePopupBoxProps = {
  closeDeletePopup: () => void;
};

export default function DeletePopupBox(props: TDeletePopupBoxProps) {
  const { closeDeletePopup } = props;

  return (
    <>
      <Popup title="관심 종목을 삭제하시겠습니까?">
        <p className="flex gap-2">
          <TextButton variant="grayscale" additionalClass="w-[157px]">
            삭제하기
          </TextButton>
          <TextButton
            variant="primary"
            additionalClass="w-[157px]"
            onClick={closeDeletePopup}
          >
            돌아가기
          </TextButton>
        </p>
      </Popup>
    </>
  );
}
