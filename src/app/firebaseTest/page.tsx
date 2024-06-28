"use client";

import fireStore from "@/firebase/firestore";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useState } from "react";

export default function TestPage() {
  const [userName, setUserName] = useState("");

  // 1. 컬렉션 (Collection): SQL의 테이블 (Table)과 비슷함.
  // 2. 문서 (Document): SQL의 행(Row) 또는 레코드(Record)와 비슷함. 데이터.

  // 컬렉션은 여러 문서(Document)를 포함하는 컨테이너입니다.
  // 각 컬렉션에는 여러 문서가 저장될 수 있으며, 컬렉션 자체는 데이터를 직접 포함하지 않습니다.
  // 문서는 키-값 쌍의 집합으로 이루어져 있으며, 하나의 고유한 식별자(ID)를 가집니다.
  // 각 문서는 특정 컬렉션에 속해 있습니다.
  //

  //
  // ===================생성======================

  // 1. addDoc: 컬렉션에 문서를 추가합니다. Firestore가 문서 ID를 자동으로 생성합니다.
  const btnAddDoc = async () => {
    const docRef = await addDoc(collection(fireStore, "user"), {
      // user 컬렉션에 userName을 저장함.
      userName: userName,
    });

    console.log("생성된 문서 (Document) 의 Id: ", docRef.id); // 자동 생성된 ID 값을 받아올 수 있다.
  };

  // 2. setDoc: 지정된 문서 ID를 사용하여 문서를 생성하거나 업데이트합니다.
  const btnSetDoc = async () => {
    const docRef = await setDoc(doc(fireStore, "user", "tempId"), {
      // user 컬렉션에 tempId 란 문서 이름으로 userName을 저장함.
      userName: userName,
    });
  };

  // ===================조회======================

  // 1. getDocs: 컬렉션에서 모든 문서를 조회합니다. (복수)
  const getAllData = async () => {
    const col = collection(fireStore, "user");
    const querySnapshot = await getDocs(col);
    const items = querySnapshot.docs.map((doc) => doc.data());

    console.log("All documents: ", items); // [ {userName: '윤채현1'}, {userName: '윤채현2'} ]
  };

  // 2. getDoc: 특정 문서를 조회합니다. (하나만)
  const getData = async (id: string) => {
    const docRef = doc(fireStore, "user", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data()); // {userName: '윤채현1'}
    } else {
      console.log("No such document!");
    }
  };

  // 업데이트
  const updateData = async (id: string) => {
    const docRef = doc(fireStore, "temp", "customDocID");
    await updateDoc(docRef, {
      field1: "new value",
    });
    console.log("Document updated");
  };

  // 삭제
  const deleteData = async (id: string) => {
    const docRef = doc(fireStore, "temp", "customDocID");
    await deleteDoc(docRef);
    console.log("Document deleted");
  };

  return (
    <div className="w-96 mx-auto mt-96">
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          className="block border border-navy-300 rounded p-2"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          onClick={btnAddDoc}
          className="block bg-navy-900 text-white rounded-lg py-2 px-4 mt-10"
        >
          생성
        </button>
      </form>
    </div>
  );
}
