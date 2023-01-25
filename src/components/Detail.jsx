import React, { useState } from "react";
import CafeInfo from "./DetailThings/CafeInfo";
import Review from "./DetailThings/Review";

export const Detail = () => {
  const [review, setReview] = useState();

  return (
    <>
      {/* //지현님이 하는 카페정보 */}
      <CafeInfo />
      {/* Review part */}
      <Review review={review} setReview={setReview} />
    </>
  );
};
