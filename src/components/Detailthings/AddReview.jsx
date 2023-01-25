// import React from "react";
// import styled from "styled-components";

// function AddReview() {
//   return (
//     <>
//       <button onClick={onEditSubmit}> edit 완료 버튼</button>
//       <ReviewTitles>
//         {/* 리뷰와 리뷰등록 버튼 */}
//         <ReviewCount>
//           {/* 리뷰 라는 글 */}
//           리뷰
//           <ReviewCountNum>
//             {/* 리뷰 갯수 */}
//             (5)
//           </ReviewCountNum>
//         </ReviewCount>
//         <ReviewBtn> 리뷰 등록</ReviewBtn>
//       </ReviewTitles>
//       <ReviewContents>
//         {/* crud 될 리뷰들 */}
//         <UserIdTitleBtn>
//           {/* profile, createAt, userId, title, edit, delete btn */}
//           <UserID>
//             {/* profileImg, createAt, userNickname */}
//             <UserImg>image</UserImg>
//             {/* profileImg */}
//             <div
//               style={{
//                 display: "grid",
//                 marginLeft: 10,
//               }}
//             >
//               {/* createAt,userNickname */}
//               <ReviewDate></ReviewDate>
//               {/* createAt */}
//               <UserNickName>mr. 카공</UserNickName>
//               {/* userNickname */}
//             </div>
//           </UserID>
//         </UserIdTitleBtn>
//         <Recommend>추천 명당</Recommend>
//         <RecommendContents>
//           추천하는 이 카페의 나만의 명당은!?
//         </RecommendContents>
//         <NiceSpot>
//           {/* spotImaage, reason, location\ */}
//           <SpotImg>
//             <img src={`${reviewData?.image}`} />
//           </SpotImg>
//           <ReasonLocation>
//             {/* reason,location */}
//             <ReasonMap>
//               {/* 명당추천 */}
//               <Reason>명당 추천 이유</Reason>
//               {toggle ? (
//                 <input
//                   onChange={(event) => setReason(event.target.value)}
//                   type="text"
//                 />
//               ) : (
//                 <ReasonContents>{reviewData?.reason}</ReasonContents>
//               )}
//             </ReasonMap>
//             <LocationMap>
//               {/* 명당위치 */}
//               <Location>명당위치</Location>
//               {toggle ? (
//                 <input onChange={(event) => setLocation(event.target.value)} />
//               ) : (
//                 <LocationContents>{reviewData?.location}</LocationContents>
//               )}
//             </LocationMap>
//           </ReasonLocation>
//         </NiceSpot>
//         <GoodBad>
//           {/* good,bad,rate,menu */}
//           <Good>
//             <GoodTitle>장점</GoodTitle>
//             {toggle ? (
//               <input onChange={(event) => setGood(event.target.value)} />
//             ) : (
//               <GoodContents>{reviewData?.good}</GoodContents>
//             )}
//           </Good>
//           <Bad>
//             <BadTitle>단점</BadTitle>
//             {toggle ? (
//               <input
//                 type="text"
//                 onChange={(event) => setBad(event.target.value)}
//               />
//             ) : (
//               <BadContents>{reviewData?.bad}</BadContents>
//             )}
//           </Bad>
//           <RateMenu>
//             {/* rate, menu */}
//             {toggle ? (
//               <input
//                 type="text"
//                 onChange={(event) => setRate(event.target.value)}
//               />
//             ) : (
//               <Rate>평점 {reviewData?.rate}</Rate>
//             )}
//             <Menu>
//               <MenuTitle>추천메뉴</MenuTitle>
//               {toggle ? (
//                 <input
//                   type="text"
//                   onChange={(event) => setMenu(event.target.value)}
//                 />
//               ) : (
//                 <MenuContents>{reviewData?.menu}</MenuContents>
//               )}
//             </Menu>
//           </RateMenu>
//         </GoodBad>
//       </ReviewContents>
//     </>
//   );
// }

// const ReviewTitles = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 700px;
//   height: 30px;
// `;

// const ReviewCount = styled.div`
//   display: flex;
//   font-size: 18px;
//   text-align: left;
//   font-weight: 900;
// `;

// const ReviewCountNum = styled.div`
//   margin-left: 4px;
//   font-size: 18px;
//   font-weight: 300;
// `;

// const ReviewBtn = styled.button`
//   border-radius: 30px;
//   background-color: #33a264;
//   color: white;
//   font-weight: 300;
//   font-size: 18px;
//   width: 100px;
//   height: 100%;
//   border: none;
//   text-align: center;
// `;

// const ReviewContents = styled.section`
//   width: 700px;
//   height: 400px;
//   border: 1px solid #aeb0af;
//   border-radius: 10px;
//   display: grid;
//   margin-top: 10px;
// `;

// const UserIdTitleBtn = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   height: 48px;
//   background-color: tomato;
//   margin: 10px;
// `;

// const UserID = styled.div`
//   width: 40%;
//   height: 100%;
//   border: solid 1px black;
//   display: inline-flex;
// `;

// const UserImg = styled.div`
//   width: 48px;
//   height: 48px;
//   display: inline-block;
//   justify-content: left;
//   background-color: white;
//   border-radius: 100px;
// `;

// const ReviewDate = styled.input`
//   font-size: 12px;
//   font-weight: 200;
//   color: gray;
//   display: inline-flex;
//   border: solid 1px tomato;
// `;
// const UserNickName = styled.div`
//   font-size: 18px;
//   font-weight: 400;
//   color: gray;
//   display: contents;
//   border: solid 1px tomato;
// `;

// const Recommend = styled.div`
//   font-size: 20px;
//   font-weight: 500;
// `;

// const RecommendContents = styled.div`
//   font-size: 15px;
//   margin-left: 10px;
//   font-weight: 200;
// `;

// const NiceSpot = styled.section`
//   width: 100%;
//   height: 40%;
//   display: inline-block;
//   border: solid 1px tomato;
// `;

// const SpotImg = styled.div`
//   width: 100px;
//   height: 100%;
//   background-color: tomato;
// `;

// const ReasonLocation = styled.div`
//   display: flex;
// `;

// const ReasonMap = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const Reason = styled.div`
//   font-size: 18px;
//   padding-bottom: 5px;
//   font-weight: 300;
// `;
// const ReasonContents = styled.div`
//   font-size: 12px;
//   font-weight: 200;
// `;

// const LocationMap = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const Location = styled.div`
//   font-size: 18px;
//   font-weight: 300;
//   padding-bottom: 5px;
// `;

// const LocationContents = styled.div`
//   font-size: 12px;
//   font-weight: 200;
// `;

// const GoodBad = styled.div`
//   display: inline-block;
//   width: 100%;
//   height: 200px;
// `;

// const Good = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 300px;
//   height: 150px;
// `;

// const GoodTitle = styled.div`
//   font-size: 18px;
//   font-weight: 300;
// `;

// const GoodContents = styled.div`
//   font-size: 12px;
//   font-weight: 200;
// `;

// const Bad = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 300px;
//   height: 150px;
// `;

// const BadTitle = styled.div`
//   font-size: 18px;
//   font-weight: 300;
// `;

// const BadContents = styled.div`
//   font-size: 12px;
//   font-weight: 200;
// `;

// const RateMenu = styled.div`
//   display: flex;
// `;

// const Rate = styled.div`
//   display: flex;
//   font-size: 18px;
//   font-weight: 300;
// `;
// const Menu = styled.div`
//   display: flex;
// `;
// const MenuTitle = styled.div`
//   display: flex;
//   font-size: 18px;
//   font-weight: 300;
// `;
// const MenuContents = styled.div`
//   font-size: 12px;
//   font-weight: 200;
// `;

// export default AddReview;
