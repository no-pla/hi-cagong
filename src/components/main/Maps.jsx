import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';

export const Maps = () => {
  const mapRef = useRef();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions([
      { lat: 37.27943075229118, lng: 127.01763998406159 },
      {
        lat: 37.55915668706214,
        lng: 126.92536526611102,
      },
      {
        lat: 35.13854258261161,
        lng: 129.1014781294671,
      },
      {
        lat: 37.55518388656961,
        lng: 126.92926237742505,
      },
      {
        lat: 35.20618517638034,
        lng: 129.07944301057026,
      },
      {
        lat: 37.561110808242056,
        lng: 126.9831268386891,
      },
      {
        lat: 37.86187129655063,
        lng: 127.7410250820423,
      },
    ]);
  }, []);

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 36.2683,
        lng: 127.6358,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '450px',
      }}
      level={14} // 지도의 확대 레벨
      ref={mapRef}
    >
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={10} // 클러스터 할 최소 지도 레벨
        disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
      >
        {positions?.map((pos) => (
          <MapMarker
            key={`${pos.lat}-${pos.lng}`}
            position={{
              lat: pos.lat,
              lng: pos.lng,
            }}
          />
        ))}
      </MarkerClusterer>
    </Map>
  );
};
