import { useState } from "react";
import styled from "styled-components";
import { DetailContent } from "./DetailContent";
import Review from "./Detailthings/Review";

const DetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Detail = () => {
  const [review, setReview] = useState();

  return (
    <DetailPageContainer>
      <DetailContent />
      <Review review={review} setReview={setReview} />
    </DetailPageContainer>
  );
};
