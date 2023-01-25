import axios from 'axios';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useGetRoadMap } from './Hooks/useGetRoadMap';

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
`;

const StoreContent = styled.div`
  display: flex;
  margin: 50px 0;
  align-items: center;
  justify-content: center;
`;

const config = {
  headers: {
    Authorization: 'KakaoAK 9000b6993dd65d1d3b7d2f30e697ad6e',
  },
};

export const DetailContent = () => {
  const { data: stores, isLoading } = useQuery('test', () => {
    const detailStoreName = '스타벅스 서울대입구역점'; //임시값 추후 수정 예정 정확한 상점명이 들어와야 함
    return axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?sort=accuracy&category_group_code=CE7&page=1&size=15&query=${detailStoreName}`,
      config
    );
  });

  useGetRoadMap(+stores?.data.documents[0].y, +stores?.data.documents[0].x); // 로드맵 불러오기

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
