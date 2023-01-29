import { useState } from 'react';
import styled from 'styled-components';
import { DetailContent } from './DetailContent';
import Review from './Detailthings/Review';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 160px);
  overflow-y: scroll;
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
