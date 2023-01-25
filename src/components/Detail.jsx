import { useState } from "react";
import { DetailContent } from "./DetailContent";
import Review from "./Detailthings/Review";

export const Detail = () => {
  const [review, setReview] = useState();

  return (
    <>
      <DetailContent />
      <Review review={review} setReview={setReview} />
    </>
  );
};
