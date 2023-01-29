import styled from "styled-components";
import { authService, dbService } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AverageRate, StoreRate } from "../DetailContent";
import { useState } from "react";
import CustomButton from "../common/CustomButton";
import { ButtonWrap } from "../Auth/Login";
import AuthModal, { AuthTitle } from "../Auth/AuthModal";

export const ReviewItem = (reviews) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [targetId, setTargetId] = useState("");

  const openConfirmModal = (event) => {
    setTargetId(event.target.id);
    setConfirmModal((prev) => !prev);
  };
  //Auth

  const delete_comment = async () => {
    if (targetId) {
      try {
        await deleteDoc(doc(dbService, "review", targetId));
        window.location.reload();
        setConfirmModal((prev) => !prev);
      } catch (error) {
        alert(error);
      }
    }
  };
  // data 날짜
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <>
      {confirmModal && (
        <AuthModal>
          <AuthTitle>정말로 삭제할까요?</AuthTitle>
          <p>삭제하면 되돌릴 수 없습니다.</p>
          <ButtonWrap>
            <CustomButton
              bgColor="#000"
              height={12}
              onClick={() => setConfirmModal((prev) => !prev)}
            >
              취소
            </CustomButton>
            <CustomButton
              onClick={() => delete_comment()}
              bgColor="#a23333"
              height={12}
              type="submit"
            >
              삭제
            </CustomButton>
          </ButtonWrap>
        </AuthModal>
      )}

      <ReviewItemContainer>
        {reviews.reviews.map((reviewData) => (
          <ReviewItems key={reviewData.docId}>
            <ReviewContents>
              {/* crud 될 리뷰들 */}
              <UserIdTitleBtn>
                {/* profile, createAt, userId, title, edit, delete btn */}
                <UserID>
                  {/* profileImg, createAt, userNickname */}
                  <UserImg src={reviewData?.profileImg}></UserImg>
                  {/* profileImg */}
                  <div
                    style={{
                      display: "grid",
                      alignContent: "space-around",
                      textAlign: "left",
                    }}
                  >
                    {/* createAt,userNickname */}
                    <ReviewDate>
                      {new Date(reviewData?.createAt).toLocaleDateString(
                        "kr-KO",
                        options
                      )}
                    </ReviewDate>
                    {/* createAt */}
                    <UserNickName>{reviewData?.userNickname}</UserNickName>
                    {/* userNickname */}
                  </div>
                </UserID>
                <ReviewTitle>{reviewData?.reviewTitle}</ReviewTitle>
                {reviewData.uid === authService.currentUser?.uid ? (
                  <EditDeleteBtn>
                    <DeleteBtn
                      id={reviewData?.docId}
                      onClick={(event) => openConfirmModal(event)}
                    >
                      삭제
                    </DeleteBtn>
                  </EditDeleteBtn>
                ) : null}
              </UserIdTitleBtn>
              <div
                style={{
                  display: "inline-flex",
                  marginLeft: 25,
                }}
              >
                <Recommend>추천 명당</Recommend>
                <RecommendContents>
                  추천하는 이 카페의 나만의 명당은!?
                </RecommendContents>
              </div>
              <NiceSpot>
                {/* spotImaage, reason, location\ */}
                <SpotImg
                  src={`${reviewData?.image}`}
                  width="246px"
                  height="201px"
                  alt="명당사진"
                ></SpotImg>
                <ReasonLocation>
                  {/* reason,location */}
                  <ReasonMap>
                    {/* 명당추천 */}
                    <Reason>명당 추천 이유</Reason>
                    <ReasonContents>{reviewData?.reason}</ReasonContents>
                  </ReasonMap>
                  <LocationMap>
                    {/* 명당위치 */}
                    <Location>명당위치</Location>
                    <LocationContents>{reviewData?.location}</LocationContents>
                  </LocationMap>
                </ReasonLocation>
              </NiceSpot>
              <GoodBad>
                {/* good,bad,rate,menu */}
                <Good>
                  <GoodTitle>장점</GoodTitle>
                  <GoodContents>{reviewData?.good}</GoodContents>
                </Good>
                <Bad>
                  <BadTitle>단점</BadTitle>
                  <BadContents>{reviewData?.bad}</BadContents>
                </Bad>
                <RateMenu>
                  {/* rate, menu */}
                  <Rate>
                    평점
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <StoreRate>
                        <AverageRate
                          style={{
                            width: reviewData?.rate * 20 + "%",
                          }}
                          className="rating"
                        />
                      </StoreRate>
                    </div>
                  </Rate>

                  <Menu>
                    <MenuTitle>추천메뉴</MenuTitle>
                    <MenuContents>{reviewData?.menu}</MenuContents>
                  </Menu>
                </RateMenu>
              </GoodBad>
            </ReviewContents>
          </ReviewItems>
        ))}
      </ReviewItemContainer>
    </>
  );
};

const ReviewItemContainer = styled.div`
  width: 932px;
`;

const ReviewItems = styled.div`
  width: 932px;
`;

const ReviewContents = styled.section`
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  display: grid;
  margin: 10px 0px 25px 0px;
`;

const UserIdTitleBtn = styled.div`
  display: inline-flex;
  justify-content: left;
  width: auto;
  height: auto;
  margin: 25px;
  gap: 35px;
`;

const UserID = styled.div`
  width: 30%;
  height: 100%;
  display: inline-flex;
  gap: 15px;
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  display: inline-block;
  justify-content: left;
  background-color: tomato;
  border-radius: 100px;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  font-weight: 200;
  color: gray;
  display: inline-flex;
`;
const UserNickName = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: contents;
  align-items: flex-start;
`;
//

const ReviewTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 60%;
`;

const EditDeleteBtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteBtn = styled.button`
  height: 80%;
  display: flex;
  color: red;
  margin-left: 10px;
  align-items: center;
  font-size: 15px;
  border-style: none;
  background-color: #ffffff;
  cursor: pointer;
`;

const Recommend = styled.div`
  display: inline-flex;
  flex-direction: row;
  font-size: 25px;
  font-weight: 700;
  align-items: flex-end;
`;

const RecommendContents = styled.div`
  display: inline-flex;
  font-size: 15px;
  margin-left: 10px;
  font-weight: 200;
  align-items: flex-end;
`;

const NiceSpot = styled.section`
  width: auto;
  height: 200px;
  display: inline-flex;
  flex-direction: row;
  margin: 13px 25px;
`;

const SpotImg = styled.img`
  width: 280px;
  height: 100%;
  background-color: tomato;
  background-size: cover;
  margin-right: 20px;
`;

const ReasonLocation = styled.div`
  display: grid;
  justify-content: left;
`;

const ReasonMap = styled.div`
  display: inline-block;
  margin-bottom: 20px;
  padding-top: 5px;
  width: 80%;
`;

const Reason = styled.div`
  display: flex;
  font-size: 18px;
  padding-bottom: 10px;
  font-weight: 400;
`;
const ReasonContents = styled.div`
  font-size: 15px;
  font-weight: 300;
  display: flex;
  text-align: left;
`;

const LocationMap = styled.div`
  display: inline-block;
  width: 80%;
`;

const Location = styled.div`
  display: flex;
  font-size: 18px;
  padding-bottom: 10px;
  font-weight: 400;
`;

const LocationContents = styled.div`
  font-size: 15px;
  font-weight: 300;
  display: flex;
  text-align: left;
`;

const GoodBad = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 80%;
  height: 150px;
  margin: 10px 25px;
`;

const Good = styled.div`
  display: grid;
  justify-items: left;
  align-content: flex-start;
  width: 35%;
  height: 100%;
`;

const GoodTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  text-align: left;
`;

const GoodContents = styled.div`
  font-size: 15px;
  font-weight: 300;
  text-align: left;
`;

const Bad = styled.div`
  display: grid;
  justify-items: left;
  align-content: flex-start;
  width: 35%;
  height: 100%;
`;

const BadTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  text-align: left;
`;

const BadContents = styled.div`
  font-size: 15px;
  font-weight: 300;
  text-align: left;
`;

const RateMenu = styled.div`
  display: inline-grid;
  align-content: flex-start;
`;

const Rate = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 35px;
  text-align: left;
`;
const Menu = styled.div`
  display: inline-grid;
  align-content: flex-start;
`;
const MenuTitle = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
`;
const MenuContents = styled.div`
  font-size: 15px;
  font-weight: 300;
  text-align: left;
`;
