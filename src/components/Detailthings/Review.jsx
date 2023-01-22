import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getReviews } from "../../api";

function Review() {
  const { data: reviewData, isLoading } = useQuery("reviewdata", getReviews);
  console.log(isLoading);
  if (isLoading) return;
  console.log(reviewData);

  return (
    <AllReview>
      <ReviewTitle>
        <ReviewCount>
          리뷰
          <ReviewCountNum>(5)</ReviewCountNum>
        </ReviewCount>
        <ReviewBtn> 리뷰 등록</ReviewBtn>
      </ReviewTitle>
      <ReviewContents>
        <UserIdTitleBtn>
          <UserID>
            <UserImg>image</UserImg>
            <div
              style={{
                display: "grid",
                marginLeft: 10,
              }}
            >
              <ReviewDate>2023-01-21</ReviewDate>
              <UserNickName>mr. 카공</UserNickName>
            </div>
          </UserID>
        </UserIdTitleBtn>
      </ReviewContents>
    </AllReview>
  );
}

export default Review;

const AllReview = styled.section`
  display: inline-block;
  place-content: center;
  width: 700px;
  height: 1000px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  border: 1px solid tomato;
`;

const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-between;

  width: 700px;
  height: 30px;
`;

const ReviewCount = styled.div`
  display: flex;
  font-size: 18px;
  text-align: left;
  font-weight: 900;
`;

const ReviewCountNum = styled.div`
  margin-left: 4px;
  font-size: 18px;
  font-weight: 300;
`;

const ReviewBtn = styled.button`
  border-radius: 30px;
  background-color: #33a264;
  color: white;
  font-weight: 300;
  font-size: 18px;
  width: 100px;
  height: 100%;
  border: none;
  text-align: center;
`;

const ReviewContents = styled.section`
  width: 700px;
  height: 400px;
  border: 1px solid #aeb0af;
  border-radius: 10px;
  display: grid;
  margin-top: 10px;
`;

const UserIdTitleBtn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  background-color: tomato;
  margin: 10px;
`;

const UserID = styled.div`
  width: 40%;
  height: 100%;
  border: solid 1px black;
  display: inline-flex;
`;

const UserImg = styled.div`
  width: 48px;
  height: 48px;
  display: inline-block;
  justify-content: left;
  background-color: white;
  border-radius: 100px;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  font-weight: 200;
  color: gray;
  display: inline-flex;
  border: solid 1px tomato;
`;
const UserNickName = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: gray;
  display: contents;
  border: solid 1px tomato;
`;
