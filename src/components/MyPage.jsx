import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbService } from "../firebase";

const UserProfileContainer = styled.div`
  background: #f6f6f6;
  width: 220px;
  height: 280px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 16px 20px;
  position: relative;
  text-align: center;
`;

const UserProfileImg = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 100%;
  margin-top: 50px;
`;

const UserNickname = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 30px;
  color: #000000;
  margin-top: 15px;
`;

const UserEmail = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 30px;
  color: #adb8cc;
`;

const UserProfileChangeButton = styled.button`
  width: 24px;
  height: 24px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
  border-radius: 100px;
  border: none;
  color: black;
  position: absolute;
  right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserProfilChangeMenu = styled.div`
  position: absolute;
  right: -24%;
  top: 10%;
  text-align: left;
  font-size: 12px;
  background-color: whitesmoke;
  border-radius: 5px;

  & div {
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px 12px;
    margin: -1px 0;
  }
  & div:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const ReviewList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 3fr));
  grid-template-rows: repeat(auto-fill, 330px);
  gap: 12px 16px;
  overflow-y: scroll;
  width: 100%;
  margin-right: 40px;
`;

const Review = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 5px;
  height: 320px;

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ReviewImg = styled.div`
  background: ${(props) => `url(${props.ImgSrc})`};
  background-size: cover;
  width: 100%;
  height: 40%;
`;

const ReviewDesc = styled.div`
  position: relative;
  padding: 16px;
  border-radius: 5px;
`;

const ReviewTitle = styled.div`
  padding-top: 1px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const StoreGoodPoint = styled.div`
  font-size: 12px;
  color: #adb8cc;
  font-weight: 700;
  margin-bottom: 40px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  padding: 6px 8px;
  border: 1px solid #dedede;
  border-radius: 2px;
  color: red;
  background-color: transparent;
  position: absolute;
  bottom: -28px;
  right: 12px;
  cursor: pointer;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
  margin: 80px 40px 40px 40px;
`;

export const MyPage = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [profileSetting, setProfileSetting] = useState(false);

  const currentUid = "김태훈"; // 임시값 추후 수정 예정

  const q = query(
    collection(dbService, "review"),
    where("uid", "==", currentUid)
  );

  const getMyReviewList = async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setMyReviews((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    getMyReviewList();
  }, []);

  return (
    <>
      <SectionContainer>
        <Title>내프로필</Title>
        <UserProfileContainer>
          <UserProfileChangeButton
            onClick={() => setProfileSetting((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faEllipsis} size="1x" color="#C3CAD9" />
          </UserProfileChangeButton>
          {profileSetting && (
            <UserProfilChangeMenu>
              <div>프로필 변경</div>
            </UserProfilChangeMenu>
          )}
          <UserProfileImg
            src="https://i0.wp.com/www.rachelenroute.com/wp-content/uploads/2019/05/cafe-35.jpg?fit=4127%2C2751" // 임시값
            alt=""
          />
          <UserNickname>Hello Alfred Bryant</UserNickname>
          <UserEmail>adrain.nader@yahoo.com</UserEmail>
        </UserProfileContainer>
      </SectionContainer>
      <SectionContainer>
        <Title>내가쓴리뷰</Title>
        <ReviewList>
          {myReviews &&
            myReviews.map((review) => {
              return (
                <Review>
                  <ReviewImg ImgSrc={review.image} alt="" />
                  <ReviewDesc>
                    <ReviewTitle>{review.reviewTitle}</ReviewTitle>
                    <StoreGoodPoint>{review.good}</StoreGoodPoint>
                    <DeleteButton>삭제하기</DeleteButton>
                  </ReviewDesc>
                </Review>
              );
            })}
        </ReviewList>
      </SectionContainer>
    </>
  );
};