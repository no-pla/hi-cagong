import styled from "styled-components";
import { useGetRoadMap } from "./Hooks/useGetRoadMap";

const RoadMap = styled.div`
  width: 45%;
  height: 250px;
  border-radius: 5px 5px 0px 0px;
  border: 1px solid black;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const DetailContent = () => {
  const x = 37.481266; // 임시 입력 추후 수정 예정
  const y = 126.951359; // 임시 입력 추후 수정 예정
  useGetRoadMap(x, y); // 로드맵 불러오기

  return (
    <>
      <RoadMap id="roadview" />
    </>
  );
};
