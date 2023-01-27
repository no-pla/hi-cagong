import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../../firebase";

export const useGetReviews = (target, targetId) => {
  const [reviews, setReviews] = useState([]);

  const q = query(
    collection(dbService, "review"),
    where(target, "==", targetId)
    // orderBy("createAt", "desc")
  );

  const getMyReviewList = async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setReviews((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    getMyReviewList();
  }, []);

  return { reviews };
};
