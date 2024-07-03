import { getFirestore } from "firebase/firestore";
import firebasedb from "./firebasebd";

const fireStore = getFirestore(firebasedb);

export default fireStore;
