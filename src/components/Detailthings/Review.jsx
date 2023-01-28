import { getAuth } from "firebase/auth";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getReviews } from "../../api";
import { useGetReviews } from "../Hooks/useGetReviews";
import { AddReview } from "./AddReview";

import { ReviewItem } from "./ReviewItem";

function Review() {
  //currentuser.uid 값
  // const auth = getAuth().currentUser;
  // const authuid = auth.uid;
  // console.log(authuid);
  // const uid = reviews.reviews[0].uid;
  // console.log(uid);
  // console.log("id", id); // "12c0d24a-ff4z-1e51-a571-accd11a5779a"
  const cafeId = useParams().cafeId;
  const { reviews } = useGetReviews("cafeId", cafeId); //임시값
  // const auth = getAuth();
  // const user = auth.currentUser;
  // const userUid = user.uid;
  // console.log(userUid);
  // console.log("맞나", reviews);
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
        {/* const uid = reviews.reviews[0].uid;
  console.log(uid); */}
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
  /* margin: 10px; */
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;
