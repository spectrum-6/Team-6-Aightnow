import IconButton from "@/components/Button/IconButton";
import TextButton from "@/components/Button/TextButton";
import Header from "@/components/Header";
import MainWrapper from "@/containers/news/MainWrapper";
import Article from "@/containers/news/newsDetail/Article";
import RelatedArticle from "@/containers/news/newsDetail/RelatedArticle";
import RelatedStock from "@/containers/news/newsDetail/RelatedStock";
import { IconApple, IconNewsAi } from "@/icons";
import Image from "next/image";
import Link from "next/link";

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
