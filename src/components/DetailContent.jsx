import { Roadview } from "react-kakao-maps-sdk";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetCafeAverageRate } from "./GetCafeAverageRate";
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

  margin: 50px auto;
  align-items: center;
  justify-content: center;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const StoreRate = styled.span`
  font-size: 20px;
  position: relative;
  display: inline-block;
  &::before {
    content: "★★★★★";
    color: #e5e5e5;
    filter: drop-shadow(0 0.6rem 0.3rem rgba(0, 0, 0, 0.05));
  }
`;

const AverageRate = styled.span`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  &::before {
    content: "★★★★★";
    color: #fcd939;
  }
`;

const RateCount = styled.span`
  font-size: 12px;
  margin-left: 4px;
`;

export const DetailContent = () => {
  const { cafeId } = useParams();
  const { stores, isLoading, x, y } = useGetStoreData();
  const { totalRate, averageRate } = GetCafeAverageRate();

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
          width: "360px",
          height: "300px",
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
          <StoreInfoDesc>
            {totalRate ? (
              <>
                <div>평균 별점 ({(totalRate / averageRate).toFixed(2)})</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StoreRate>
                    <AverageRate
                      style={{
                        width: (totalRate / averageRate).toFixed(2) * 20 + "%",
                      }}
                    />
                  </StoreRate>
                  <RateCount>({averageRate}개)</RateCount>
                </div>
              </>
            ) : (
              <>
                <div>평균 별점</div>
                <div>아직 평가가 없습니다.</div>
              </>
            )}
          </StoreInfoDesc>
        </StoreInfo>
      )}
    </StoreContent>
  );
};
