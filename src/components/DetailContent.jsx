import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Roadview } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { GetCageAverageRate } from "./GetCafeAverageRate";
import { useGetReviews } from "./Hooks/useGetReviews";
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

const StoreRate = styled.span`
  position: relative;
`;

const AverageRate = styled.span`
  margin-left: 4px;
  font-size: 14px;
`;

export const DetailContent = () => {
  const { stores, isLoading, x, y } = useGetStoreData();
  const { totalRate, averageRate } = GetCageAverageRate();

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
          <StoreInfoDesc>
            <div>평균 별점</div>
            <StoreRate>
              <FontAwesomeIcon
                icon={faStar}
                size="1x"
                color="magenta"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faStar}
                size="1x"
                color="magenta"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faStar}
                size="1x"
                color="magenta"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faStar}
                size="1x"
                color="magenta"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faStar}
                size="1x"
                color="magenta"
              ></FontAwesomeIcon>
              <AverageRate>
                {(totalRate / (averageRate * 5)).toFixed(2)}
              </AverageRate>
            </StoreRate>
            <div>({averageRate} 개)</div>
          </StoreInfoDesc>
        </StoreInfo>
      )}
    </StoreContent>
  );
};
