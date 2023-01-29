import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetReviews } from "../Hooks/useGetReviews";
import { AddReview } from "./AddReview";

import { ReviewItem } from "./ReviewItem";

function Review() {
  const cafeId = useParams().cafeId;
  const { reviews } = useGetReviews("cafeId", cafeId);
  return (
    <div
      style={{
        display: "grid",
      }}
    >
      <AllReview
        style={{
          display: "grid",
        }}
      >
        <AddReview reviews={reviews} />
        <ReviewItem reviews={reviews} />
      </AllReview>
    </div>
  );
}
export default Review;

const AllReview = styled.section`
  display: inline-flex;
  place-content: center;
  padding: 10px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;
