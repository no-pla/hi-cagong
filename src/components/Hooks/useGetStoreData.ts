import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

const config = {
  headers: {
    Authorization: "KakaoAK 9000b6993dd65d1d3b7d2f30e697ad6e",
  },
};

export const useGetStoreData = () => {
  const getStoreData = useLocation();
  const { state: storeData } = getStoreData;
  const [x, y] = [storeData.storeInfo.x, storeData.storeInfo.y];
  const { data: stores, isLoading } = useQuery("cafeInfo", () => {
    return axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?sort=accuracy&category_group_code=CE7&page=1&size=15&query=${storeData.storeInfo.place_name}`,
      config
    );
  });
  return { stores, isLoading, x, y };
};
