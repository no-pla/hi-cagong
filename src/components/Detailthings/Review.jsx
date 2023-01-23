import React from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import styled from "styled-components";
import { addReview, deleteReview, getReviews } from "../../api";
import AddReview from "./AddReview";
import { ReviewItem } from "./ReviewItem";

function Review() {
  const { data: reviewData, isLoading } = useQuery("reviewdata", getReviews);

  const queryClient = useQueryClient();

  const { isLoading: createLoading, mutate: createMutate } =
    useMutation(addReview);
  const addCreateReview = () => {
    const reviewData = {
      bad: "냄새가 많이나요 냄새가 많이나요 냄새가 많이나요 냄새가 많이나요 냄새가 많이나요 냄새가 많이나요",
      createAt: "2022-32-32",
      good: "집중이 잘되는 분위기입니다 mutate test입니다 집중이 잘되는 분위기입니다 mutate test입니다 집중이 잘되는 분위기입니다 mutate test입니다",
      location:
        "화장실 바로앞에 있는 자리입니다 화장실 바로앞에 있는 자리입니다 화장실 바로앞에 있는 자리입니다",
      menu: "아메리카노 디카페인",
      rate: "⭐️⭐️⭐️",
      reason:
        "조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요 조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요 조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요 조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요",
      reviewTitle: "제목이에요 여긴",
      uid: "김태훈",
      image:
        "https://i.pinimg.com/564x/14/4d/d5/144dd55b7a21917ce042fc7f8cda19f8.jpg",
      userNickname: "코쟁이",
    };

    createMutate(reviewData, {
      onSuccess: () => {
        queryClient.invalidateQueries("reviewdata");
      },
    });
  };

  if (isLoading) return;

  return (
    <div>
      <button
        onClick={addCreateReview}
        style={{
          display: "inline-flex",
        }}
      >
        {" "}
        create 버튼
      </button>
      <AllReview>
        {/* 모든 리뷰에 관한 것들  */}

        {/* <AddReview reviewData={reviewData} /> */}
        <ReviewItem reviewData={reviewData}></ReviewItem>
      </AllReview>
    </div>
  );
}

export default Review;

const AllReview = styled.section`
  display: inline-flex;
  place-content: center;
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;
