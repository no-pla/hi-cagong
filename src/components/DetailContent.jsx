import { Roadview } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useGetStoreData } from "./Hooks/useGetStoreData";

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
  const { stores, isLoading, x, y } = useGetStoreData();

  return (
    <StoreContent>
      <Roadview // 로드뷰를 표시할 Container
        position={{
          // 지도의 중심좌표
          lat: +y,
          lng: +x,
          radius: 100,
        }}
        style={{
          // 지도의 크기
          width: "340px",
          height: "240px",
          borderRadius: "5px 5px 0px 0px",
        }}
      />
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
