import RelatedStock from "@/containers/news/newsDetail/RelatedStock";
import RelatedArticle from "@/containers/news/newsDetail/RelatedArticle";
import Article from "@/containers/news/newsDetail/Article";
import IconButton from "@/components/Button/IconButton";

export default function NewsDetailPage() {
  return (
    <>
      <section className="w-[1200px] pb-[72px] mx-auto flex gap-5">
        <h2 className="hidden absolute w-0 h-0 leading-[0] indent-[-9999px]">
          뉴스
        </h2>
        <Article />
        <aside className="w-[384px]">
          <RelatedStock />
          <RelatedArticle />
        </aside>
      </section>
      <div className="fixed bottom-[38px] right-16">
        <IconButton size="fab" icon="fab" />
      </div>
    </>
  );
}
