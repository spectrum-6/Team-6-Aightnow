"use client";

import IconButton from "@/components/Button/IconButton";
import TextButton from "@/components/Button/TextButton";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Popup from "@/components/Popup/Popup";
import { IconApple, IconClose } from "@/icons";
import Link from "next/link";
import { useState } from "react";

export default function LikePage() {
  const [inputValue, setInputValue] = useState("");
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const openDeletePopup = () => {
    setIsDeletePopupVisible(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupVisible(false);
  };

  const openAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  return (
    <>
      <Header />
      <main className="pt-[81px]">
        <div className="w-[1214px] pt-14 pb-12 mx-auto ">
          <div className="flex justify-between">
            <h2 className="mb-6 text-navy-900 text-3xl font-bold">
              김스팩님의 관심종목
            </h2>
            <TextButton
              variant="primary"
              additionalClass="w-[189px] h-9 text-sm"
              onClick={openAddModal}
            >
              관심종목 추가
            </TextButton>
          </div>
          <ul className="flex gap-[19px] flex-wrap">
            <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
              <div>
                <div className="flex gap-2">
                  <p>
                    <IconApple width={32} height={32} />
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="block text-grayscale-900 text-2xl font-bold">
                      애플
                    </strong>
                    <span className="text-grayscale-600 text-lg">AAPL</span>
                  </p>
                </div>
                <p>
                  <span className="text-grayscale-900">$00.00</span>
                  <span className="ml-2 text-warning-100">▲1.75</span>
                  <span className="ml-2 text-warning-100">+0.82%</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <p className="w-[136px] h-[136px] bg-blue-100">차트</p>
                <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
                  <li className="flex justify-between">
                    주가<span className="text-blue-600">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <TextButton
                  variant="grayscale"
                  additionalClass="w-40 h-14"
                  onClick={openDeletePopup}
                >
                  삭제하기
                </TextButton>
                <TextButton variant="primary" additionalClass="w-40 h-14">
                  자세히 보기
                </TextButton>
              </div>
            </li>
            <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
              <div>
                <div className="flex gap-2">
                  <p>
                    <IconApple width={32} height={32} />
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="block text-grayscale-900 text-2xl font-bold">
                      애플
                    </strong>
                    <span className="text-grayscale-600 text-lg">AAPL</span>
                  </p>
                </div>
                <p>
                  <span className="text-grayscale-900">$00.00</span>
                  <span className="ml-2 text-warning-100">▲1.75</span>
                  <span className="ml-2 text-warning-100">+0.82%</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <p className="w-[136px] h-[136px] bg-blue-100">차트</p>
                <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
                  <li className="flex justify-between">
                    주가<span className="text-blue-600">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <TextButton
                  variant="grayscale"
                  additionalClass="w-40 h-14"
                  onClick={openDeletePopup}
                >
                  삭제하기
                </TextButton>
                <TextButton variant="primary" additionalClass="w-40 h-14">
                  자세히 보기
                </TextButton>
              </div>
            </li>
            <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
              <div>
                <div className="flex gap-2">
                  <p>
                    <IconApple width={32} height={32} />
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="block text-grayscale-900 text-2xl font-bold">
                      애플
                    </strong>
                    <span className="text-grayscale-600 text-lg">AAPL</span>
                  </p>
                </div>
                <p>
                  <span className="text-grayscale-900">$00.00</span>
                  <span className="ml-2 text-warning-100">▲1.75</span>
                  <span className="ml-2 text-warning-100">+0.82%</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <p className="w-[136px] h-[136px] bg-blue-100">차트</p>
                <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
                  <li className="flex justify-between">
                    주가<span className="text-blue-600">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <TextButton
                  variant="grayscale"
                  additionalClass="w-40 h-14"
                  onClick={openDeletePopup}
                >
                  삭제하기
                </TextButton>
                <TextButton variant="primary" additionalClass="w-40 h-14">
                  자세히 보기
                </TextButton>
              </div>
            </li>
            <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
              <div>
                <div className="flex gap-2">
                  <p>
                    <IconApple width={32} height={32} />
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="block text-grayscale-900 text-2xl font-bold">
                      애플
                    </strong>
                    <span className="text-grayscale-600 text-lg">AAPL</span>
                  </p>
                </div>
                <p>
                  <span className="text-grayscale-900">$00.00</span>
                  <span className="ml-2 text-warning-100">▲1.75</span>
                  <span className="ml-2 text-warning-100">+0.82%</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <p className="w-[136px] h-[136px] bg-blue-100">차트</p>
                <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
                  <li className="flex justify-between">
                    주가<span className="text-blue-600">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <TextButton
                  variant="grayscale"
                  additionalClass="w-40 h-14"
                  onClick={openDeletePopup}
                >
                  삭제하기
                </TextButton>
                <TextButton variant="primary" additionalClass="w-40 h-14">
                  자세히 보기
                </TextButton>
              </div>
            </li>
            <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
              <div>
                <div className="flex gap-2">
                  <p>
                    <IconApple width={32} height={32} />
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="block text-grayscale-900 text-2xl font-bold">
                      애플
                    </strong>
                    <span className="text-grayscale-600 text-lg">AAPL</span>
                  </p>
                </div>
                <p>
                  <span className="text-grayscale-900">$00.00</span>
                  <span className="ml-2 text-warning-100">▲1.75</span>
                  <span className="ml-2 text-warning-100">+0.82%</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <p className="w-[136px] h-[136px] bg-blue-100">차트</p>
                <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
                  <li className="flex justify-between">
                    주가<span className="text-blue-600">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <TextButton
                  variant="grayscale"
                  additionalClass="w-40 h-14"
                  onClick={openDeletePopup}
                >
                  삭제하기
                </TextButton>
                <TextButton variant="primary" additionalClass="w-40 h-14">
                  자세히 보기
                </TextButton>
              </div>
            </li>
            <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
              <div>
                <div className="flex gap-2">
                  <p>
                    <IconApple width={32} height={32} />
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="block text-grayscale-900 text-2xl font-bold">
                      애플
                    </strong>
                    <span className="text-grayscale-600 text-lg">AAPL</span>
                  </p>
                </div>
                <p>
                  <span className="text-grayscale-900">$00.00</span>
                  <span className="ml-2 text-warning-100">▲1.75</span>
                  <span className="ml-2 text-warning-100">+0.82%</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <p className="w-[136px] h-[136px] bg-blue-100">차트</p>
                <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
                  <li className="flex justify-between">
                    주가<span className="text-blue-600">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <TextButton
                  variant="grayscale"
                  additionalClass="w-40 h-14"
                  onClick={openDeletePopup}
                >
                  삭제하기
                </TextButton>
                <TextButton variant="primary" additionalClass="w-40 h-14">
                  자세히 보기
                </TextButton>
              </div>
            </li>
            <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
              <div>
                <div className="flex gap-2">
                  <p>
                    <IconApple width={32} height={32} />
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="block text-grayscale-900 text-2xl font-bold">
                      애플
                    </strong>
                    <span className="text-grayscale-600 text-lg">AAPL</span>
                  </p>
                </div>
                <p>
                  <span className="text-grayscale-900">$00.00</span>
                  <span className="ml-2 text-warning-100">▲1.75</span>
                  <span className="ml-2 text-warning-100">+0.82%</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <p className="w-[136px] h-[136px] bg-blue-100">차트</p>
                <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
                  <li className="flex justify-between">
                    주가<span className="text-blue-600">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <TextButton
                  variant="grayscale"
                  additionalClass="w-40 h-14"
                  onClick={openDeletePopup}
                >
                  삭제하기
                </TextButton>
                <TextButton variant="primary" additionalClass="w-40 h-14">
                  자세히 보기
                </TextButton>
              </div>
            </li>
            <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
              <div>
                <div className="flex gap-2">
                  <p>
                    <IconApple width={32} height={32} />
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="block text-grayscale-900 text-2xl font-bold">
                      애플
                    </strong>
                    <span className="text-grayscale-600 text-lg">AAPL</span>
                  </p>
                </div>
                <p>
                  <span className="text-grayscale-900">$00.00</span>
                  <span className="ml-2 text-warning-100">▲1.75</span>
                  <span className="ml-2 text-warning-100">+0.82%</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <p className="w-[136px] h-[136px] bg-blue-100">차트</p>
                <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
                  <li className="flex justify-between">
                    주가<span className="text-blue-600">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <TextButton
                  variant="grayscale"
                  additionalClass="w-40 h-14"
                  onClick={openDeletePopup}
                >
                  삭제하기
                </TextButton>
                <TextButton variant="primary" additionalClass="w-40 h-14">
                  자세히 보기
                </TextButton>
              </div>
            </li>
            <li className="w-[392px] h-[360px] p-8 pb-4 mt-6 rounded-2xl bg-white">
              <div>
                <div className="flex gap-2">
                  <p>
                    <IconApple width={32} height={32} />
                  </p>
                  <p className="flex items-center gap-2">
                    <strong className="block text-grayscale-900 text-2xl font-bold">
                      애플
                    </strong>
                    <span className="text-grayscale-600 text-lg">AAPL</span>
                  </p>
                </div>
                <p>
                  <span className="text-grayscale-900">$00.00</span>
                  <span className="ml-2 text-warning-100">▲1.75</span>
                  <span className="ml-2 text-warning-100">+0.82%</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <p className="w-[136px] h-[136px] bg-blue-100">차트</p>
                <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
                  <li className="flex justify-between">
                    주가<span className="text-blue-600">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                  <li className="flex justify-between">
                    주가<span className="text-warning-100">▲0.0%</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <TextButton
                  variant="grayscale"
                  additionalClass="w-40 h-14"
                  onClick={openDeletePopup}
                >
                  삭제하기
                </TextButton>
                <TextButton variant="primary" additionalClass="w-40 h-14">
                  자세히 보기
                </TextButton>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <div className="fixed bottom-[38px] right-16">
        <IconButton size="fab" icon="fab" />
      </div>
      {isDeletePopupVisible && (
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
      )}
      {isAddModalVisible && (
        <div className="w-[794px] h-[735px] p-10 rounded-[32px] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <h3 className="mb-10 text-navy-900 text-2xl font-bold text-center">
              관심 종목 추가
            </h3>
            <button
              className="flex items-center justify-center absolute right-0 top-0"
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
            <div>
              <h4 className="mb-4 text-navy-900 text-lg font-medium">
                검색 결과
              </h4>
              <ul>
                <li className="h-12">
                  <Link href="#" className="w-full h-full block">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p>
                          <IconApple />
                        </p>
                        <strong className="ml-4 text-grayscale-900">
                          애플
                        </strong>
                        <span className="text-grayscale-600 before:content-['∙'] before:mx-1">
                          AAPL
                        </span>
                      </div>
                      <div className="flex items-center gap-5">
                        <p className="text-blue-600">
                          <span className="text-grayscale-900 font-medium">
                            $00.00
                          </span>
                          <span className="ml-2 text-sm">▼1.75</span>
                          <span className="ml-2 text-sm">-0.82%</span>
                        </p>
                        <TextButton
                          variant="primary"
                          additionalClass="w-[120px] h-9 text-sm font-medium"
                        >
                          추가
                        </TextButton>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-navy-900 text-lg font-medium">
                    최근 검색한 종목
                  </h4>
                  <button className="text-grayscale-600 text-sm font-medium underline">
                    전체삭제
                  </button>
                </div>
                <ul className="overflow-auto flex gap-5">
                  <li className="w-[255px] h-24 px-4 py-6 border border-navy-100 rounded-2xl flex-shrink-0">
                    <Link href="#" className="w-full h-full block">
                      <div className="flex justify-between">
                        <div className="flex gap-6">
                          <p>
                            <IconApple />
                          </p>
                          <p>
                            <strong className="block">애플</strong>
                            <span className="text-sm">AAPL</span>
                          </p>
                        </div>
                        <p className="text-right">
                          <strong className="block font-medium">$00.00</strong>
                          <span className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="w-[255px] h-24 px-4 py-6 border border-navy-100 rounded-2xl flex-shrink-0">
                    <Link href="#" className="w-full h-full block">
                      <div className="flex justify-between">
                        <div className="flex gap-6">
                          <p>
                            <IconApple />
                          </p>
                          <p>
                            <strong className="block">애플</strong>
                            <span className="text-sm">AAPL</span>
                          </p>
                        </div>
                        <p className="text-right">
                          <strong className="block font-medium">$00.00</strong>
                          <span className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </span>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li className="w-[255px] h-24 px-4 py-6 border border-navy-100 rounded-2xl flex-shrink-0">
                    <Link href="#" className="w-full h-full block">
                      <div className="flex justify-between">
                        <div className="flex gap-6">
                          <p>
                            <IconApple />
                          </p>
                          <p>
                            <strong className="block">애플</strong>
                            <span className="text-sm">AAPL</span>
                          </p>
                        </div>
                        <p className="text-right">
                          <strong className="block font-medium">$00.00</strong>
                          <span className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </span>
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="py-2">
                <h4 className="mb-4 text-navy-900 text-lg font-medium">
                  인기 검색어
                </h4>
                <div className="p-6 border border-navy-100 rounded-2xl flex gap-6">
                  <ul>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="w-[321px] h-12 py-2">
                      <Link href="#" className="w-full h-full block">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-navy-900 font-medium">1</span>
                            <p className="ml-4">
                              <IconApple width={32} height={32} />
                            </p>
                            <strong className="ml-2 text-grayscale-600 font-medium">
                              테슬라
                            </strong>
                          </div>
                          <p className="text-blue-600 text-sm">
                            <span>▼1.75</span>
                            <span className="ml-2">-0.82%</span>
                          </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
