// import { addDoc, collection, query } from "firebase/firestore";
import { useRef, useState } from "react";
import {
  // Mutation,
  // QueryClient,
  // useMutation,
  useQuery,
  useQueryClient,
  // useEffect,
} from "react-query";
import styled from "styled-components";
import { getReviews } from "../../api";
import { dbService, storageService } from "../../firebase";
// import { uuid } from "uuidv4";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  // ref,
  // uploadBytes,
  // getDownloadURL,
  uploadString,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { readBuilderProgram } from "typescript";

export const AddReview = (reviews) => {
  useQueryClient();

  let id = crypto.randomUUID();
  // const uid = reviews.reviews[0];
  // console.log(uid);

  // console.log("id", id);
  // const { data: reviewData, isLoading } = useQuery("reviewdata", getReviews);
  // add 관련

  // review 관련
  const [toggle, setToggle] = useState(false);
  const [reason, setReason] = useState("");
  const [location, setLocation] = useState("");
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [rate, setRate] = useState(null);
  const [menu, setMenu] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [cafeId, setCafeId] = useState("");
  // const [userNickname, setUserNickname] = useState("");
  // image 관련 state
  const [imageUpload, setImageUpload] = useState(null);
  const [url, setUrl] = useState(null);
  const [attachment, setAttachment] = useState();

  // console.log(setUrl);
  // console.log(rate);

  const { data: reviewData, isLoading } = useQuery("reviewdata", getReviews);

  // 이미지 업로드 부분
  const handleImageChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // const uid = reviws.uid;
  // console.log(reviws);

  const onClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = null;
  };

  const onAddSubmit = async () => {
    const fileRef = ref(storageService, `${reviews.uid}/${id}`);
    const response = await uploadString(fileRef, attachment, "data_url");
    const attachmentUrl = await getDownloadURL(response.ref);

    await addDoc(collection(dbService, "review"), {
      bad: bad,
      createAt: Date.now(),
      good: good,
      location: location,
      menu: menu,
      rate: rate,
      reason: reason,
      reviewTitle: reviewTitle,
      uid: "임재영",
      // id: reviewData?.id,
      image: attachmentUrl,
      userNickname: "코쟁이",
      cafeId: cafeId,
    });
    // console.log(id);
    alert("입력되었습니다 !");
    // const fileInput = useRef()
    const imageRef = ref(storageService, "image");
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "사진을 가져오는데 문제가 생겼습니다. ");
          });
        setImageUpload(null);
      })
      .catch((error) => {
        console.log(error.message);
      });

    if (isLoading) return;
    console.log("isloading");
  };

  const fileInput = useRef();
  // const onAddSubmit = () => {
  //   const reviewData = {
  //     bad: bad,
  //     createAt: myDate,
  //     good: good,
  //     location: location,
  //     menu: menu,
  //     rate: rate,
  //     reason: reason,
  //     reviewTitle: reviewTitle,
  //     uid: "임재영",
  //     // id: reviewData?.id,
  //     image:
  //       "https://i.pinimg.com/564x/14/4d/d5/144dd55b7a21917ce042fc7f8cda19f8.jpg",
  //     userNickname: "코쟁이",
  //   };
  //   console.log(reviewData);
  // };

  //input창에 입력 된 value값들을 data로 표시 중

  // data를 가져오면 화면에 query로 바로 표시하는 것
  // createMutate(reviewData, {
  //   onSuccess: () => {
  //     // queryClient.invalidateQueries("reviewdata");
  //   },
  // });

  // if (isLoading) return;

  return (
    <ReviewItems>
      {/* <button onClick={onEditReview}> edit 완료 버튼</button> */}
      <ReviewTitles>
        {/* 리뷰와 리뷰등록 버튼 */}
        <ReviewCount>
          {/* 리뷰 라는 글 */}
          리뷰
          <ReviewCountNum>
            {/* 리뷰 갯수 */}
            (5)
          </ReviewCountNum>
        </ReviewCount>
        <ReviewBtn
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {" "}
          리뷰 작성
        </ReviewBtn>
      </ReviewTitles>
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
              <ReviewDate>{Date.now()}</ReviewDate>
              {/* createAt */}
              <UserNickName>
                {reviewData?.userNickname || "닉네임"} ,
              </UserNickName>
              {/* userNickname */}
            </div>
          </UserID>

          <RevieTitleinput
            value={reviewTitle}
            placeholder="제목을 입력해 주세요."
            type="text"
            onChange={(event) => setReviewTitle(event.target.value)}
          />
        </UserIdTitleBtn>
        <GoodBad>
          {/* good,bad,rate,menu */}
          <Good>
            <GoodTitle>장점</GoodTitle>
            <GoodInput
              value={good}
              onChange={(event) => setGood(event.target.value)}
              placeholder="장점을 입력해주세요. 30글자 이내"
            />
          </Good>
          <Bad>
            <BadTitle>단점</BadTitle>
            <BadInput
              value={bad}
              type="text"
              onChange={(event) => setBad(event.target.value)}
              placeholder="단점을 입력해주세요. 30글자 이내"
            />
          </Bad>
          <RateMenu>
            {/* rate, menu */}
            {toggle ? (
              <div>
                평점
                <input
                  type="text"
                  onChange={(event) => setRate(event.target.value)}
                />
              </div>
            ) : (
              <Rate>평점 {reviewData?.rate}</Rate>
            )}
            <Menu>
              <MenuTitle>추천메뉴</MenuTitle>
              <MenuInput
                value={menu}
                placeholder="추천메뉴를 작성해주세요."
                type="text"
                onChange={(event) => setMenu(event.target.value)}
              />
            </Menu>
          </RateMenu>
        </GoodBad>
        <NiceSpot>
          {/* spotImaage, reason, location\ */}
          <SpotImg>
            {/* <img
              // value={image}
              src={`${reviewData?.image}`}
              style={{ objectFit: "fill", width: "inherit", height: "inherit" }}
            /> */}
            <input
              type="file"
              onChange={handleImageChange}
              // id="new-review-image"
              className="new-review-image"
              accept="images/*"
              src={url}
              ref={fileInput}
              // ref={imageRef}
            />
            {attachment && <SpotImgs src={attachment} />}
          </SpotImg>
          <button onClick={onClearAttachment}>취소</button>
          <ReasonLocation>
            {/* reason,location */}
            <ReasonMap>
              {/* 명당추천 */}
              <Reason>명당 추천 이유</Reason>
              <ReasonInput
                value={reason}
                placeholder="명당 추천 이유를 입력해 주세요. 100글자 이내"
                onChange={(event) => setReason(event.target.value)}
                type="text"
              />
            </ReasonMap>
            <LocationMap>
              {/* 명당위치 */}
              <Location>명당위치</Location>
              <LocationInput
                value={location}
                placeholder="명당 위치를 자세히 작성해주세요. 100글자 이내"
                onChange={(event) => setLocation(event.target.value)}
                type="text"
              />
            </LocationMap>
          </ReasonLocation>
        </NiceSpot>
        {/* 완료 취소 버튼 */}
        <AddCancleBtn>
          <AddBtn onClick={onAddSubmit}>완료</AddBtn>
          <CancleBtn>취소</CancleBtn>
        </AddCancleBtn>
      </ReviewContents>
    </ReviewItems>
  );
};

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
  margin-left: 5px;
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
  /* width: 932px;
  height: 529px; */
  border: 1px solid #aeb0af;
  border-radius: 10px;
  display: grid;
  margin-top: 10px;
  padding: 25px;
`;

const UserIdTitleBtn = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: auto;
  height: fit-content;
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

const RevieTitleinput = styled.input`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  border: solid #b9b9b9;
  border-width: 0 0 4px 0;
  width: 80%;

  ::placeholder {
    color: #b9b9b9;
    font-weight: bold;
  }
`;

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

const NiceSpot = styled.section`
  width: 100%;
  height: 200px;
  display: inline-flex;
  flex-direction: row;
  margin: 13px 0px;
`;

const SpotImg = styled.div`
  height: 201px;
  width: 246px;
  background-color: tomato;
`;

const SpotImgs = styled.img`
  height: 201px;
  width: 246px;
`;

const ReasonLocation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-left: 20px;
  gap: 15px;
`;

const ReasonMap = styled.div`
  display: inline-block;
  height: 50%;
  width: 100%;
`;

const Reason = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 400;
  width: 100%;
  height: 30%;
`;
const ReasonInput = styled.input`
  font-size: 14px;
  font-weight: 200;
  display: flex;
  border: 1px solid #b9b9b9;
  border-radius: 7px;
  vertical-align: top;
  text-align: left;
  width: 100%;
  height: 70%;
  ::placeholder {
    color: #b9b9b9;
    font-weight: 400;
  }
`;

const LocationMap = styled.div`
  display: inline-block;
  height: 50%;
  width: 100%;
`;

const Location = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 400;
  height: 30%;
`;

const LocationInput = styled.input`
  font-size: 14px;
  font-weight: 200;
  display: flex;
  border: 1px solid #b9b9b9;
  border-radius: 7px;
  vertical-align: top;
  text-align: left;
  width: 100%;
  height: 70%;
  ::placeholder {
    color: #b9b9b9;
    font-weight: 400;
  }
`;

const GoodBad = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const Good = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: left;
  align-content: flex-start;
  height: 100%;
  flex: 1;
`;

const GoodTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  text-align: left;
`;

const GoodInput = styled.input`
  font-size: 13px;
  font-weight: 300;
  text-align: left;
  width: inherit;
  height: 100%;
  border: 1px solid #b9b9b9;
  border-radius: 7px;
  ::placeholder {
    color: #b9b9b9;
    font-weight: 400;
    font-size: 14px;
  }
`;

const Bad = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: left;
  align-content: flex-start;
  height: 100%;
  flex: 1;
`;

const BadTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  text-align: left;
`;

const BadInput = styled.input`
  font-size: 13px;
  font-weight: 300;
  text-align: left;
  width: inherit;
  height: 100%;
  border: 1px solid #b9b9b9;
  border-radius: 7px;
  ::placeholder {
    color: #b9b9b9;
    font-weight: 400;
    font-size: 14px;
  }
`;

const RateMenu = styled.div`
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const Rate = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 400;
  text-align: left;
  height: 35%;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  text-align: left;
  height: 65%;
`;
const MenuTitle = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
`;
const MenuInput = styled.input`
  font-size: 13px;
  font-weight: 300;
  text-align: left;
  width: inherit;
  height: 100%;
  border: 1px solid #b9b9b9;
  border-radius: 7px;
  ::placeholder {
    color: #b9b9b9;
    font-weight: 400;
    font-size: 14px;
  }
`;

const AddCancleBtn = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: row;
`;
const AddBtn = styled.button`
  background-color: #33a264;
  border-radius: 100px;
  width: 90px;
  height: 30px;
  border-width: none;
  font-size: 16px;
  color: white;
`;
const CancleBtn = styled.button`
  font-size: 16px;
  margin-left: 15px;
  background-color: black;
  color: white;
  border-radius: 100px;
  width: 90px;
  height: 30px;
  border-width: none;
`;
