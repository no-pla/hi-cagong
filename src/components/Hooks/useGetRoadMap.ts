/*global kakao*/
import { useEffect } from "react";
const { kakao } = window;

export const useGetRoadMap = (x: number, y: number) => {
  return useEffect(() => {
    const container = document.getElementById("roadview");
    const roadview = new kakao.maps.Roadview(container);
    const roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
    const position = new kakao.maps.LatLng(x, y); // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.

    roadviewClient.getNearestPanoId(position, 50, function (panoId: number) {
      roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });
  }, [x, y]);
};
