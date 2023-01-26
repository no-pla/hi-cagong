import { useState } from "react";
import styled from "styled-components";
import { DetailContent } from "./DetailContent";
import Review from "./Detailthings/Review";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Detail = () => {
  const [review, setReview] = useState();

  return (
    <DetailContainer>
      <DetailContent />
      <Review review={review} setReview={setReview} />
    </DetailContainer>
  );
};
