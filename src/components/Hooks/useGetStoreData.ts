import axios from "axios";
import { useQuery } from "react-query";

const config = {
  headers: {
    Authorization: "KakaoAK 9000b6993dd65d1d3b7d2f30e697ad6e",
  },
};

export const useGetStoreData = () => {
  const { data: stores, isLoading } = useQuery("cafeInfo", () => {
    const detailStoreName = "스타벅스 서울대입구역점"; //임시값 추후 수정 예정 정확한 상점명이 들어와야 함
    return axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?sort=accuracy&category_group_code=CE7&page=1&size=15&query=${detailStoreName}`,
      config
    );
  });
  return { stores, isLoading };
};
