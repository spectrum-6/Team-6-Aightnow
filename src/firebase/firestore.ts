import firebasedb from "./firebasebd";
import { getFirestore } from "firebase/firestore";

const fireStore = getFirestore(firebasedb);
export default fireStore;
