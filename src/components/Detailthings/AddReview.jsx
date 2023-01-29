import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { getReviews } from "../../api";
import { dbService, storageService } from "../../firebase";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { addDoc, collection, getCountFromServer } from "firebase/firestore";
import { getAuth, reload } from "firebase/auth";
import { useParams } from "react-router-dom";
// import { uid } from "uid";
// import { click } from "@testing-library/user-event/dist/click";

export const AddReview = (reviews) => {
  let id = crypto.randomUUID();
  const reviewCount = reviews.reviews.length;
  // review 관련
  const [toggle, setToggle] = useState(true);
  const [reason, setReason] = useState("");
  const [location, setLocation] = useState("");
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [menu, setMenu] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  // const [userNickname, setUserNickname] = useState("")

  // image 관련 state
  const [imageUpload, setImageUpload] = useState(null);
  const [url, setUrl] = useState(null);
  const [attachment, setAttachment] = useState();

  // 카페 id 불러오는 부분
  const cafeId = useParams().cafeId;

  // reviewdata 가져오는 부분
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

  // 이미지 버튼 취소 클릭
  const onClearAttachment = () => {
    setAttachment(null);
    fileInput.current.value = null;
    console.log("first");
  };

  //review 등록 부분
  const onAddSubmit = async () => {
    const fileRef = ref(storageService, `${reviews.uid}/${id}`);
    const response = await uploadString(fileRef, attachment, "data_url");
    const attachmentUrl = await getDownloadURL(response.ref);
    const auth = getAuth();
    const user = auth.currentUser;
    // if (user !== null) {
    const userUid = user.uid;
    // }
    console.log("Adduseruid 참고", userUid);
    await addDoc(collection(dbService, "review"), {
      reviewTitle: reviewTitle,
      bad: bad,
      createAt: Date.now(),
      good: good,
      location: location,
      menu: menu,
      rate: rated,
      reason: reason,
      uid: userUid,
      image: attachmentUrl,
      userNickname: userNickName,
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

    console.log("isloading");
    console.log("uid", userUid);

    {
      return window.location.reload();
      //임시로..
    }
  };

  // start rating 관련 test
  const ARRAY = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    // const rateNum = clickStates.toString(true);

    setClicked(clickStates);
  };

  // Auth 자료 가져오는 것
  const auth = getAuth();
  const userddd = auth?.currentUser;
  if (userddd !== null) {
    const displayName = userddd?.displayName;
    const email = userddd?.email;
    const photoURL = userddd?.photoURL;
    const emailVerified = userddd?.emailVerified;
    const uid = userddd?.uid;
  }
  const userNickName = userddd?.displayName;
  const userProfile = userddd?.photoURL;

  useEffect(() => {
    sendReview();
  }, [clicked]); //컨디마 컨디업

  const sendReview = () => {
    // let score = clicked.filter(Boolean).length;
    // console.log("score", score);
  };
  //별점을 rate라는 함수에 숫자로 표시
  const rated = clicked.filter(Boolean).length;
  // console.log("rate", rated);

  const fileInput = useRef();
  return (
    <ReviewItems>
      {/* <button onClick={onEditReview}> edit 완료 버튼</button> */}
      <ReviewTitles>
        {/* 리뷰와 리뷰등록 버튼 */}
        <ReviewCount>
          {/* 리뷰 라는 글 */}
          리뷰
          <ReviewCountNum>
            ({reviewCount}){/* 리뷰 갯수 */}
            {/* {reviewData.length} */}
          </ReviewCountNum>
        </ReviewCount>
        {toggle ? (
          <ReviewBtn
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            {" "}
            리뷰 작성
          </ReviewBtn>
        ) : null}
      </ReviewTitles>
      {toggle ? null : (
        <ReviewContents>
          {/* crud 될 리뷰들 */}
          <UserIdTitleBtn>
            {/* profile, createAt, userId, title, edit, delete btn */}
            <UserID>
              {/* profileImg, createAt, userNickname */}
              <UserImg> </UserImg>
              {/* profileImg */}
              <div
                style={{
                  display: "flex",
                  // marginLeft: 10,
                  alignContent: "flex-end",
                  textAlign: "left",
                }}
              >
                {/* createAt,userNickname */}
                <ReviewDate></ReviewDate>
                {/* createAt */}
                <UserNickName>
                  {reviewData?.userNickname || userNickName} ,
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
              <Wrap>
                <RatingText>평점</RatingText>
                <Stars>
                  {ARRAY.map((el, idx) => {
                    return (
                      <FaStar
                        key={idx}
                        size="25"
                        onClick={() => handleStarClick(el)}
                        className={clicked[el] && "yellowStar"}
                      />
                    );
                  })}
                </Stars>
              </Wrap>
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
          <div
            style={{
              display: "inline-flex",
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
              <input
                type="file"
                onChange={handleImageChange}
                // id="new-review-image"
                className="new-review-image"
                accept="images/*"
                src={url}
                ref={fileInput}
                // ref={imageRef}
                style={{
                  height: "201px",
                  width: "246px",
                  display: "flex",
                  // visibility: "hidden",
                }}
              />
              {attachment && <SpotImgs src={attachment} />}
            </SpotImg>
            <ImgCancleBtn onClick={onClearAttachment}> X </ImgCancleBtn>
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
            <CancleBtn
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              취소
            </CancleBtn>
          </AddCancleBtn>
        </ReviewContents>
      )}
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
  margin: 10px 0px 30px 0px;
  padding: 25px;
  gap: 20px;
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
  gap: 10px;
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
  align-items: flex-start;
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
`;

const SpotImg = styled.div`
  height: 201px;
  width: 246px;
  background-color: tomato;
  display: flex;
`;

const SpotImgs = styled.img`
  height: 201px;
  width: 246px;
`;

const ImgCancleBtn = styled.button`
  display: flex;
  color: tomato;
  font-size: 15px;
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

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
`;

const RatingText = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  flex-direction: column-reverse;
`;

const Stars = styled.div`
  display: flex;
  padding-left: 10px;
  align-items: flex-start;
  vertical-align: middle;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
