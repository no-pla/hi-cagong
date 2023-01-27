import { useQuery, useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { getReviews } from "../../api";
import { useGetReviews } from "../Hooks/useGetReviews";
import AddReview from "./AddReview";

import { ReviewItem } from "./ReviewItem";

function Review() {
  const { reviews } = useGetReviews("uid", "임재영"); //임시값

  // const { data: reviewData, isLoading } = useQuery("reviewdata", getReviews);

  // useQueryClient 사용
  // const queryClient = useQueryClient();

  // // mutation 사용해서 addReview만들기 -> add 버튼 -> 나중에 revieitem에 넣어줘야됨
  // const { isLoading: createLoading, mutate: createMutate } =
  //   useMutation(addReview);

  // const addCreateReview = () => {
  //   const reviewData = {
  //     bad: "냄새가 많이나요 냄새가 많이나요 냄새가 많이나요 냄새가 많이나요 냄새가 많이나요 냄새가 많이나요",
  //     createAt: Date.now(),
  //     good: "집중이 잘되는 분위기입니다 mutate test입니다 집중이 잘되는 분위기입니다 mutate test입니다 집중이 잘되는 분위기입니다 mutate test입니다",
  //     location:
  //       "화장실 바로앞에 있는 자리입니다 화장실 바로앞에 있는 자리입니다 화장실 바로앞에 있는 자리입니다",
  //     menu: "아메리카노 디카페인",
  //     rate: "⭐️⭐️⭐️",
  //     reason:
  //       "조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요 조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요 조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요 조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요",
  //     reviewTitle: "제목이에요 여긴",
  //     uid: "임재영",
  //     image:
  //       "https://i.pinimg.com/564x/14/4d/d5/144dd55b7a21917ce042fc7f8cda19f8.jpg",
  //     userNickname: "코쟁이",
  //   };
  // };

  return (
    <div
      style={{
        display: "grid",
      }}
    >
      {/* <button
        // onClick={addCreateReview}
        style={{
          display: "inline-flex",
        }}
      >
        create 버튼
      </button> */}
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
  margin: 10px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;
