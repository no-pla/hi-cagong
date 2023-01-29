import { getAuth } from "firebase/auth";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getReviews } from "../../api";
import { useGetReviews } from "../Hooks/useGetReviews";
import { AddReview } from "./AddReview";

import { ReviewItem } from "./ReviewItem";

function Review() {
  const cafeId = useParams().cafeId;
  // console.log("auth", getAuth().currentUser.uid);
  const { reviews } = useGetReviews("cafeId", cafeId); //임시값
  // const auth = getAuth();
  // const user = auth.currentUser;
  // const userUid = user.uid;
  // console.log(userUid);
  // console.log("맞나", reviews);
  // const useruser = firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     var uid = user.uid;
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });
  // //Auth
  // const auth = getAuth();
  // const userddd = auth.currentUser;
  // if (userddd !== null) {
  //   const displayName = userddd.displayName;
  //   const email = userddd.email;
  //   const photoURL = userddd.photoURL;
  //   const emailVerified = userddd.emailVerified;
  //   const uid = userddd.uid;
  // }
  // const userNickName = userddd?.displayName;
  // const userProfile = userddd?.photoURL;
  // const userUid = userddd?.uid;
  // console.log(userUid);
  console.log(reviews);
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
