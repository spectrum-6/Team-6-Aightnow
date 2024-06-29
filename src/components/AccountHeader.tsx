"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { LocaleTypes, fallbackLng } from "@/utils/localization/settings";

export default function AccountHeader() {
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;

  return (
    <>
      <Link href={`/${locale}/`} className="block w-48">
        <Image src="/images/logo_dark.svg" alt="logo" width="183" height="64" />
      </Link>
    </>
  );
}
