// import { addDoc, collection } from "firebase/firestore";
// import React, { useState } from "react";
// import {
//   Mutation,
//   QueryClient,
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from "react-query";
// import styled from "styled-components";
// import { addReview, getReviews } from "../../api";
// import { dbService } from "../../firebase";

// export default function AddReview({ reviewData }) {
//   const queryClient = useQueryClient();

//   // const { data: reviewData, isLoading } = useQuery("reviewdata", getReviews);

//   // createMutate(data, {
//   //   onSuccess: () => {
//   //     queryClient.invalidateQueries("data");
//   //   },
//   // });

//   // review 작성 value 감지
//   // 완료 버튼 클릭 시 value 값 저장 및 newreview로 표시
//   // 실시간 review DB 감지

//   // add 관련

//   // review 관련
//   const [toggle, setToggle] = useState(false);
//   const [reason, setReason] = useState("");
//   const [location, setLocation] = useState("");
//   const [good, setGood] = useState("");
//   const [bad, setBad] = useState("");
//   const [rate, setRate] = useState(null);
//   const [menu, setMenu] = useState("");
//   const [reviewTitle, setReviewTitle] = useState("");
//   const [userNickname, setUserNickname] = useState("");

//   // createAt 현재 시간
//   const myDate = new Date();

//   const addReview = async () => {
//     await addDoc(collection(dbService, "review"), {
//       bad: bad,
//       createAt: myDate,
//       good: good,
//       location: location,
//       menu: menu,
//       rate: rate,
//       reason: reason,
//       reviewTitle: reviewTitle,
//       uid: UserID,
//       // id: reviewData?.id,
//       //image:image
//       userNickname: userNickname,
//     });
//   };

//   const { isLoading: createLoading, mutate: createMutate } =
//     useMutation(addReview);
//   const data = {
//     bad: bad,
//     createAt: myDate,
//     good: good,
//     location: location,
//     menu: menu,
//     rate: rate,
//     reason: reason,
//     reviewTitle: reviewTitle,
//     uid: "UserID",
//     // id: reviewData?.id,
//     //image:image
//     userNickname: userNickname,
//   };
//   // console.log(data);

//   // const onAddSubmit = async () => {
//   //   try {
//   //     const res = await addDoc(collection(dbService, "review"), {
//   //       bad: bad,
//   //       createAt: myDate,
//   //       good: good,
//   //       location: location,
//   //       menu: menu,
//   //       rate: rate,
//   //       reason: reason,
//   //       reviewTitle: reviewTitle,
//   //       uid: UserID,
//   //       // id: reviewData?.id,
//   //       //image:image
//   //       userNickname: userNickname,
//   //     });
//   //     console.log(res);
//   //   } catch (e) {
//   //     console.log(e);
//   //   }

//   const onAddSubmit = () => {
//     const reviewData = {
//       bad,
//       createAt: Date.now(),
//       good,
//       location,
//       menu,
//       rate,
//       reason,
//       reviewTitle,
//       uid: "임재영",
//       image:
//         "https://i.pinimg.com/564x/14/4d/d5/144dd55b7a21917ce042fc7f8cda19f8.jpg",
//       userNickname: "코쟁이",
//     };

//     // revieData를 가져오면 화면에 query로 바로 표시하는 것
//     // createMutate(reviewData, {
//     //   onSuccess: () => {
//     //     queryClient.invalidateQueries("reviewData");
//     //   },
//     // });

//     //input창에 입력 된 value값들을 data로 표시 중

//     // data를 가져오면 화면에 query로 바로 표시하는 것
//     // createMutate(data, {
//     //   onSuccess: () => {
//     //     queryClient.invalidateQueries("reviewdata");

//     //     console.log("test입니다", data);
//     //   },
//     // });
//   };

//   if (createLoading) return;

//   return (
//     <ReviewItems>
//       {/* <button onClick={onEditReview}> edit 완료 버튼</button> */}
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
//         <ReviewBtn
//           onClick={() => {
//             setToggle(!toggle);
//           }}
//         >
//           {" "}
//           리뷰 작성
//         </ReviewBtn>
//       </ReviewTitles>
//       <ReviewContents>
//         {/* crud 될 리뷰들 */}
//         <UserIdTitleBtn>
//           {/* profile, createAt, userId, title, edit, delete btn */}
//           <UserID>
//             {/* profileImg, createAt, userNickname */}
//             <UserImg>{/*{reviewData?.image}*/}</UserImg>
//             {/* profileImg */}
//             <div
//               style={{
//                 display: "grid",
//                 marginLeft: 10,
//               }}
//             >
//               {/* createAt,userNickname */}
//               <ReviewDate>{reviewData?.createAt}</ReviewDate>
//               {/* createAt */}
//               <UserNickName>{reviewData?.userNickname} ,</UserNickName>
//               {/* userNickname */}
//             </div>
//           </UserID>

//           <RevieTitleinput
//             value={reviewTitle}
//             placeholder="제목을 입력해 주세요."
//             type="text"
//             onChange={(event) => setReviewTitle(event.target.value)}
//           />
//         </UserIdTitleBtn>
//         <div
//           style={{
//             display: "inline-flex",
//             height: "fit-contents",
//           }}
//         >
//           <Recommend>추천 명당</Recommend>
//           <RecommendContents>
//             추천하는 이 카페의 나만의 명당은!?
//           </RecommendContents>
//         </div>
//         <GoodBad>
//           {/* good,bad,rate,menu */}
//           <Good>
//             <GoodTitle>장점</GoodTitle>
//             <GoodInput
//               value={good}
//               onChange={(event) => setGood(event.target.value)}
//               placeholder="장점을 입력해주세요. 30글자 이내"
//             />
//           </Good>
//           <Bad>
//             <BadTitle>단점</BadTitle>
//             <BadInput
//               value={bad}
//               type="text"
//               onChange={(event) => setBad(event.target.value)}
//               placeholder="단점을 입력해주세요. 30글자 이내"
//             />
//           </Bad>
//           <RateMenu>
//             {/* rate, menu */}
//             {toggle ? (
//               <div>
//                 평점
//                 <input
//                   type="text"
//                   onChange={(event) => setRate(event.target.value)}
//                 />
//               </div>
//             ) : (
//               <Rate>평점 {reviewData?.rate}</Rate>
//             )}
//             <Menu>
//               <MenuTitle>추천메뉴</MenuTitle>
//               <MenuInput
//                 value={menu}
//                 placeholder="추천메뉴를 작성해주세요."
//                 type="text"
//                 onChange={(event) => setMenu(event.target.value)}
//               />
//             </Menu>
//           </RateMenu>
//         </GoodBad>
//         <NiceSpot>
//           {/* spotImaage, reason, location\ */}
//           <SpotImg>
//             <img
//               // value={image}
//               src={`${reviewData?.image}`}
//               style={{ objectFit: "fill", width: "inherit", height: "inherit" }}
//             />
//           </SpotImg>
//           <ReasonLocation>
//             {/* reason,location */}
//             <ReasonMap>
//               {/* 명당추천 */}
//               <Reason>명당 추천 이유</Reason>
//               <ReasonInput
//                 value={reason}
//                 placeholder="명당 추천 이유를 입력해 주세요. 100글자 이내"
//                 onChange={(event) => setReason(event.target.value)}
//                 type="text"
//               />
//             </ReasonMap>
//             <LocationMap>
//               {/* 명당위치 */}
//               <Location>명당위치</Location>
//               <LocationInput
//                 value={location}
//                 placeholder="명당 위치를 자세히 작성해주세요. 100글자 이내"
//                 onChange={(event) => setLocation(event.target.value)}
//                 type="text"
//               />
//             </LocationMap>
//           </ReasonLocation>
//         </NiceSpot>
//         {/* 완료 취소 버튼 */}
//         <AddCancleBtn>
//           <AddBtn onClick={onAddSubmit}>완료</AddBtn>
//           <CancleBtn>취소</CancleBtn>
//         </AddCancleBtn>
//       </ReviewContents>
//     </ReviewItems>
//   );
// }

// const ReviewItems = styled.div`
//   width: 100%;
// `;

// const ReviewTitles = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   height: 30px;
// `;

// const ReviewCount = styled.div`
//   display: flex;
//   font-size: 18px;
//   text-align: left;
//   font-weight: 900;
// `;

// const ReviewCountNum = styled.div`
//   margin-left: 5px;
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
//   /* border: none; */
//   text-align: center;
// `;

// const ReviewContents = styled.section`
//   width: 932px;
//   height: 529px;
//   border: 1px solid #aeb0af;
//   border-radius: 10px;
//   display: grid;
//   margin-top: 10px;
//   padding: 25px;
// `;

// const UserIdTitleBtn = styled.div`
//   display: inline-flex;
//   justify-content: space-between;
//   width: auto;
//   height: fit-content;
// `;

// const UserID = styled.div`
//   width: 20%;
//   height: 100%;
//   display: inline-flex;
// `;

// const UserImg = styled.div`
//   width: 48px;
//   height: 48px;
//   display: inline-block;
//   justify-content: left;
//   background-color: tomato;
//   border-radius: 100px;
// `;

// const ReviewDate = styled.div`
//   font-size: 12px;
//   font-weight: 200;
//   color: gray;
//   display: inline-flex;
// `;
// const UserNickName = styled.div`
//   font-size: 18px;
//   font-weight: 600;
//   display: contents;
// `;
// //

// const RevieTitleinput = styled.input`
//   font-size: 22px;
//   font-weight: 600;
//   display: flex;
//   flex-direction: row;
//   justify-content: left;
//   align-items: center;
//   border: solid #b9b9b9;
//   border-width: 0 0 4px 0;
//   width: 80%;

//   ::placeholder {
//     color: #b9b9b9;
//     font-weight: bold;
//   }
// `;

// const Recommend = styled.div`
//   display: inline-flex;
//   flex-direction: row;
//   font-size: 25px;
//   font-weight: 700;
//   align-items: flex-end;
// `;

// const RecommendContents = styled.div`
//   display: inline-flex;
//   font-size: 15px;
//   margin-left: 10px;
//   font-weight: 200;
//   align-items: flex-end;
// `;

// const NiceSpot = styled.section`
//   width: 100%;
//   height: 200px;
//   display: inline-flex;
//   flex-direction: row;
//   margin: 13px 0px;
// `;

// const SpotImg = styled.div`
//   height: 201px;
//   width: 246px;
//   background-color: tomato;
// `;

// const ReasonLocation = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   width: 100%;
//   padding-left: 20px;
//   gap: 15px;
// `;

// const ReasonMap = styled.div`
//   display: inline-block;
//   height: 50%;
//   width: 100%;
// `;

// const Reason = styled.div`
//   display: flex;
//   font-size: 18px;
//   font-weight: 400;
//   width: 100%;
//   height: 30%;
// `;
// const ReasonInput = styled.input`
//   font-size: 14px;
//   font-weight: 200;
//   display: flex;
//   border: 1px solid #b9b9b9;
//   border-radius: 7px;
//   vertical-align: top;
//   text-align: left;
//   width: 100%;
//   height: 70%;
//   ::placeholder {
//     color: #b9b9b9;
//     font-weight: 400;
//   }
// `;

// const LocationMap = styled.div`
//   display: inline-block;
//   height: 50%;
//   width: 100%;
// `;

// const Location = styled.div`
//   display: flex;
//   font-size: 18px;
//   font-weight: 400;
//   height: 30%;
// `;

// const LocationInput = styled.input`
//   font-size: 14px;
//   font-weight: 200;
//   display: flex;
//   border: 1px solid #b9b9b9;
//   border-radius: 7px;
//   vertical-align: top;
//   text-align: left;
//   width: 100%;
//   height: 70%;
//   ::placeholder {
//     color: #b9b9b9;
//     font-weight: 400;
//   }
// `;

// const GoodBad = styled.div`
//   display: inline-flex;
//   justify-content: space-evenly;
//   width: 100%;
//   height: 100%;
//   gap: 20px;
// `;

// const Good = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-items: left;
//   align-content: flex-start;
//   height: 100%;
//   flex: 1;
// `;

// const GoodTitle = styled.div`
//   font-size: 18px;
//   font-weight: 400;
//   margin-bottom: 10px;
//   text-align: left;
// `;

// const GoodInput = styled.input`
//   font-size: 13px;
//   font-weight: 300;
//   text-align: left;
//   width: inherit;
//   height: 100%;
//   border: 1px solid #b9b9b9;
//   border-radius: 7px;
//   ::placeholder {
//     color: #b9b9b9;
//     font-weight: 400;
//     font-size: 14px;
//   }
// `;

// const Bad = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-items: left;
//   align-content: flex-start;
//   height: 100%;
//   flex: 1;
// `;

// const BadTitle = styled.div`
//   font-size: 18px;
//   font-weight: 400;
//   margin-bottom: 10px;
//   text-align: left;
// `;

// const BadInput = styled.input`
//   font-size: 13px;
//   font-weight: 300;
//   text-align: left;
//   width: inherit;
//   height: 100%;
//   border: 1px solid #b9b9b9;
//   border-radius: 7px;
//   ::placeholder {
//     color: #b9b9b9;
//     font-weight: 400;
//     font-size: 14px;
//   }
// `;

// const RateMenu = styled.div`
//   display: flex;
//   align-content: flex-start;
//   flex-direction: column;
//   flex: 1;
//   justify-content: space-between;
// `;

// const Rate = styled.div`
//   display: flex;
//   font-size: 18px;
//   font-weight: 400;
//   text-align: left;
//   height: 35%;
// `;
// const Menu = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-content: flex-start;
//   text-align: left;
//   height: 65%;
// `;
// const MenuTitle = styled.div`
//   display: flex;
//   font-size: 18px;
//   font-weight: 400;
//   margin-bottom: 10px;
// `;
// const MenuInput = styled.input`
//   font-size: 13px;
//   font-weight: 300;
//   text-align: left;
//   width: inherit;
//   height: 100%;
//   border: 1px solid #b9b9b9;
//   border-radius: 7px;
//   ::placeholder {
//     color: #b9b9b9;
//     font-weight: 400;
//     font-size: 14px;
//   }
// `;

// const AddCancleBtn = styled.div`
//   display: flex;
//   justify-content: right;
//   flex-direction: row;
// `;
// const AddBtn = styled.button`
//   background-color: #33a264;
//   border-radius: 100px;
//   width: 90px;
//   height: 30px;
//   border-width: none;
//   font-size: 16px;
//   color: white;
// `;
// const CancleBtn = styled.button`
//   font-size: 16px;
//   margin-left: 15px;
//   background-color: black;
//   color: white;
//   border-radius: 100px;
//   width: 90px;
//   height: 30px;
//   border-width: none;
// `;
