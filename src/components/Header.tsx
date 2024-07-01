"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { LocaleTypes, fallbackLng } from "@/utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";

const navList = ["search", "news", "like", "settings"];

export default function Header() {
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "common");

  return (
    <>
      <header className="w-full py-2 bg-white flex justify-center items-center fixed top-0 left-0">
        <nav className="w-[1200px] flex items-center">
          <h1 className="mr-5">
            <Link href={`/${locale}/main`}>
              <Image
                src="/images/logo_dark.svg"
                alt="아잇나우 로고"
                width="183"
                height="64"
              />
            </Link>
          </h1>
          <ul className="flex items-center ">
            {navList.map((item) => (
              <li key={item} className="w-40">
                <Link
                  className="block py-2 text-lg text-center font-medium text-navy-900"
                  href={`/${locale && locale}/${item}`}
                >
                  {t(item)} {/* navList 항목을 번역하여 표시 */}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
