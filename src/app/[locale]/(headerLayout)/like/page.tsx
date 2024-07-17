import FavoriteStockList from "@/containers/like/FavoriteStock";
import PageHead from "@/containers/like/PageHead";

export default async function LikePage() {
  return (
    <>
      <div className="w-[1214px] pb-12 mx-auto">
        <PageHead />
        <FavoriteStockList />
      </div>
    </>
  );
}
