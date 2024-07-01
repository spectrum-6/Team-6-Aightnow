import PopularNews from "@/containers/news/PopularNews";
import FavoriteStockNews from "@/containers/news/FavoriteStockNews";
import LatestNews from "@/containers/news/LatestNews";
import IconButton from "@/components/Button/IconButton";

export default function NewsPage() {
  return (
    <>
      <PopularNews />
      <FavoriteStockNews />
      <LatestNews />
      <div className="fixed bottom-[38px] right-16">
        <IconButton size="fab" icon="fab" />
      </div>
    </>
  );
}
