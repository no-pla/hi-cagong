/*global kakao*/
import styled from "styled-components";
import { useGetStoreData } from "./Hooks/useGetStoreData";
const { kakao } = window;

const RoadMap = styled.div`
  width: max(330px, 30%);
  height: 250px;
  border-radius: 5px 5px 0px 0px;
  border: 1px solid black;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const StoreInfo = styled.div`
  margin-left: 30px;
`;

const StoreInfoDesc = styled.div`
  div {
    margin: 13px 0;
  }
  div:first-child {
    color: #33a264;
    font-weight: 700;
    font-size: 16px;
  }
  div:last-child {
    color: #5b5b5b;
    font-weight: 400;
    font-size: 14px;
  }
`;

const StoreName = styled.h1`
  font-size: 24px;
  color: #33a264;
  @media (max-width: 720px) {
    margin-top: 30px;
  }
`;

const StoreContent = styled.div`
  display: flex;
  margin: 50px 0;
  align-items: center;
  justify-content: center;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const DetailContent = () => {
  const { stores, isLoading } = useGetStoreData();

  const roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
  const roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
  const position = new kakao.maps.LatLng(
    +stores?.data.documents[0].y,
    +stores?.data.documents[0].x
  );

  // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
  roadviewClient.getNearestPanoId(position, 50, (panoId) => {
    if (roadviewContainer) {
      new kakao.maps.Roadview(roadviewContainer, {
        panoId: +panoId,
        panoX: position.La, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수평 좌표값
        panoY: position.Ma, // panoId가 유효하지 않을 경우 지도좌표를 기반으로 데이터를 요청할 수직 좌표값
        pan: 68, // 로드뷰 처음 실행시에 바라봐야 할 수평 각
        tilt: 1, // 로드뷰 처음 실행시에 바라봐야 할 수직 각
        zoom: -1, // 로드뷰 줌 초기값
      });
    }
  });

  // });

  return (
    <StoreContent>
      <RoadMap id="roadview" />
      {isLoading ? (
        <h1>로딩중</h1>
      ) : (
        <StoreInfo>
          <StoreName>{stores?.data.documents[0].place_name}</StoreName>
          <StoreInfoDesc>
            <div>주소</div>
            <div>{stores?.data.documents[0].road_address_name}</div>
          </StoreInfoDesc>
          <StoreInfoDesc>
            <div>전화번호</div>
            <div>{stores?.data.documents[0].phone}</div>
          </StoreInfoDesc>
        </StoreInfo>
      )}
    </StoreContent>
  );
};
