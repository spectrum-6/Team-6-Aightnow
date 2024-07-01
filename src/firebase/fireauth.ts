import { getAuth } from "firebase/auth";
import firebasedb from "./firebasedb";

const fireAuth = getAuth(firebasedb);
export default fireAuth;
