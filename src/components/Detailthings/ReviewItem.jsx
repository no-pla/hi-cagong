import styled from "styled-components";
import { deleteReview } from "../../api";
import { useMutation, useQueryClient } from "react-query";

export const ReviewItem = (reviews) => {
  // const queryClient = useQueryClient();
  // const { isLoading: deleteLoading, mutate: deleteMutate } =
  //   useMutation(deleteReview);

  // const onDeleteReview = () => {
  //   deleteMutate(reviews.id, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("reviewdata");
  //     },
  //   });
  // };

  return (
    <ReviewItemContainer>
      {reviews.reviews.map((reviewData) => (
        <ReviewItems>
          {/* <button onClick={onDeleteReview}> delete 버튼</button> */}
          {/* <button onClick={onEditReview}> edit 완료 버튼</button> */}

          <ReviewContents>
            {/* crud 될 리뷰들 */}
            <UserIdTitleBtn>
              {/* profile, createAt, userId, title, edit, delete btn */}
              <UserID>
                {/* profileImg, createAt, userNickname */}
                <UserImg>{/*{reviewData?.image}*/}</UserImg>
                {/* profileImg */}
                <div
                  style={{
                    display: "grid",
                    marginLeft: 10,
                  }}
                >
                  {/* createAt,userNickname */}
                  <ReviewDate>{reviewData?.createAt}</ReviewDate>
                  {/* createAt */}
                  <UserNickName>{reviewData?.userNickname} ,</UserNickName>
                  {/* userNickname */}
                </div>
              </UserID>
              <ReviewTitle>{reviewData?.reviewTitle}</ReviewTitle>
              <EditDeleteBtn>
                <EditBtn>수정</EditBtn>
                <DeleteBtn>삭제</DeleteBtn>
              </EditDeleteBtn>
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
              <SpotImg>
                <img src={`${reviewData?.image}`} width="100%" height="100%" />
              </SpotImg>
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
                <Rate>평점 {reviewData?.rate}</Rate>
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
  );
};

const ReviewItemContainer = styled.div`
  overflow-y: scroll;
`;

const ReviewItems = styled.div`
  width: 100%;
`;

const ReviewTitles = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  /* border: none; */
  text-align: center;
`;

const ReviewContents = styled.section`
  width: 932px;
  height: 529px;
  border: 1px solid #aeb0af;
  border-radius: 10px;
  display: grid;
  margin-top: 10px;
`;

const UserIdTitleBtn = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: auto;
  height: auto;
  margin: 25px;
`;

const UserID = styled.div`
  width: 20%;
  height: 100%;
  display: inline-flex;
`;

const UserImg = styled.div`
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
  font-size: 18px;
  font-weight: 600;
  display: contents;
`;
//

const ReviewTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 30%;
`;
const EditDeleteBtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  justify-content: flex-end;
  align-items: center;
`;
const EditBtn = styled.button`
  height: 80%;
  display: flex;
  color: blue;
  align-items: center;
  font-size: 15px;
  border-style: none;
  background-color: #ffffff;
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
  width: 100%;
  height: 200px;
  display: inline-flex;
  flex-direction: row;
  margin: 13px 25px;
`;

const SpotImg = styled.div`
  width: 280px;
  height: 100%;
  background-color: tomato;
  border: 1px solid black;
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
  width: 90%;
`;

const Reason = styled.div`
  display: flex;
  font-size: 18px;
  padding-bottom: 10px;
  font-weight: 400;
`;
const ReasonContents = styled.div`
  font-size: 12px;
  font-weight: 200;
  display: flex;
  text-align: left;
`;

const LocationMap = styled.div`
  display: inline-block;
  width: 90%;
`;

const Location = styled.div`
  display: flex;
  font-size: 18px;
  padding-bottom: 10px;
  font-weight: 400;
`;

const LocationContents = styled.div`
  font-size: 12px;
  font-weight: 200;
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
`;

const GoodContents = styled.div`
  font-size: 13px;
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
`;

const BadContents = styled.div`
  font-size: 13px;
  font-weight: 300;
  text-align: left;
`;

const RateMenu = styled.div`
  display: inline-grid;
  align-content: flex-start;
`;

const Rate = styled.div`
  display: flex;
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
  font-size: 12px;
  font-weight: 200;
`;
