import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "./firebase";

export const getReviews = async () => {
  let data;
  const q = query(collection(dbService, "review"), orderBy("creatAt", "desc"));
  const docs = await getDocs(q);

  docs.forEach((doc) => {
    data = {
      id: doc.id,
      ...doc.data(),
    };
  });
  return data;
};
