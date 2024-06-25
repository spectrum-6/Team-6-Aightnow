import Image from 'next/image';

export default function Home() {
 return (
  <div className="w-full h-screen bg-main-image bg-center bg-cover bg-no-repeat">
   <div className="w-full h-screen bg-neutral-900/50">
    <h1 className="max-w-[1200px] mx-auto py-[10px]">
     <Image src="/images/logo_light.svg" alt="logo" width="183" height="64" />
    </h1>

    <section className="w-auto flex flex-col gap-14 justify-center items-center mt-16 text-white text-center">
     <div>
      <h1 className="font-medium  mb-6">
       해외 주식은 <strong className="font-extrabold">아잇나우</strong>와 함께!
      </h1>
      <h4>
       해외 주식 뉴스 실시간 번역과
       <br />
       AI 애널리스트가 알려주는 어려운 해외주식 리포트
      </h4>
     </div>
     <button className="w-[386px] h-16 bg-navy-800 text-white rounded-lg text-lg font-medium">
      로그인
     </button>
    </section>

    <Image
     src="/images/main_laptop.png"
     alt="home image"
     width="1038"
     height="597"
     className="fixed top-[500px] left-1/2 -translate-x-1/2"
    />
   </div>
  </div>
 );
}
