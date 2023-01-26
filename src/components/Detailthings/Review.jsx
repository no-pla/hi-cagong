import React, { useEffect, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import styled from "styled-components";
import { addReview, getReviews } from "../../api";
import AddReview from "./AddReview";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ReviewItem } from "./ReviewItem";
import { dbService } from "../../firebase";

function Review() {
  const [myReviews, setMyReviews] = useState([]);
  // firebase에서 review 데이터들을 가져오는 것
  const { data: reviewData, isLoading } = useQuery("reviewdata", getReviews);

  const [reviews, setReviews] = useState(reviewData);

  // useQueryClient 사용
  const queryClient = useQueryClient();

  // mutation 사용해서 addReview만들기 -> add 버튼 -> 나중에 revieitem에 넣어줘야됨
  const { isLoading: createLoading, mutate: createMutate } =
    useMutation(addReview);

  // cafeId와 일치하는 review들을 화면에 띄움
  const q = query(
    collection(dbService, "review"),
    where(target, "==", targetId)
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

  // 버튼 클릭시 revieData를 가져오는 함수
  const addCreateReview = () => {
    const reviewData = {
      bad: "냄새가 많이나요 냄새가 많이나요 냄새가 많이나요 냄새가 많이나요 냄새가 많이나요 냄새가 많이나요",
      createAt: Date.now(),
      good: "집중이 잘되는 분위기입니다 mutate test입니다 집중이 잘되는 분위기입니다 mutate test입니다 집중이 잘되는 분위기입니다 mutate test입니다",
      location:
        "화장실 바로앞에 있는 자리입니다 화장실 바로앞에 있는 자리입니다 화장실 바로앞에 있는 자리입니다",
      menu: "아메리카노 디카페인",
      rate: "⭐️⭐️⭐️",
      reason:
        "조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요 조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요 조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요 조용하고 콘센트가있는데 분위기도 좋고 책상도 좋아요",
      reviewTitle: "제목이에요 여긴",
      uid: "임재영",
      image:
        "https://i.pinimg.com/564x/14/4d/d5/144dd55b7a21917ce042fc7f8cda19f8.jpg",
      userNickname: "코쟁이",
    };

    // revieData를 가져오면 화면에 query로 바로 표시하는 것
    createMutate(reviewData, {
      onSuccess: () => {
        queryClient.invalidateQueries("reviewData");
      },
    });
    console.log(reviewData);

    // setReview((prev) => {
    //   return [...prev, reviewData];
    // });
  };

  if (isLoading) return;

  return (
    <div
      style={{
        display: "grid",
      }}
    >
      <button
        onClick={addCreateReview}
        style={{
          display: "inline-flex",
        }}
      >
        {" "}
        create 버튼
      </button>
      <AllReview
        style={{
          display: "grid",
        }}
      >
        {/* 모든 리뷰에 관한 것들  */}

        {/* 리뷰등록 Btn 클릭시 생기는 생성 컴포넌트 */}
        <AddReview setReviews={setReviews} reviews={reviews} />

        {/* ReviewItem들 : 등록되어있는 리뷰들 */}
        <ReviewItem reviewData={reviewData} myReviews={myReviews}></ReviewItem>
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
