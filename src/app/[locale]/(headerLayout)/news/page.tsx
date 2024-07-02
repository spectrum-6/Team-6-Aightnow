import PopularNews from "@/containers/news/PopularNews";
import FavoriteStockNews from "@/containers/news/FavoriteStockNews";
import LatestNews from "@/containers/news/LatestNews";

export default function NewsPage() {
  return (
    <>
      <PopularNews />
      <FavoriteStockNews />
      <LatestNews />
    </>
  );
}
