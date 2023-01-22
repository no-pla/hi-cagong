import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

export const Mapsprac = () => {
  const [info, setInfo] = useState<any>();
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>();
  const markerImageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';
  const imageSize = { width: 22, height: 26 };
  const spriteSize = { width: 36, height: 98 };
  const coffeeOrigin = { x: 10, y: 0 };

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    // kakao.maps.event.addListener(map, 'idle', function () {});
    ps.categorySearch('CE7', (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore

          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i],
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <MapWrapp>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: '100%',
          height: '100vh',
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker: any) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
            image={{
              src: markerImageSrc,
              size: imageSize,
              options: {
                spriteSize: spriteSize,
                spriteOrigin: coffeeOrigin,
              },
            }}
          >
            {info && info.content === marker.content && (
              <div className="overlay_info">
                <MapInfor>
                  <a className="map-title" href={marker.content.place_url}>
                    {marker.content.place_name}
                  </a>
                  <div className="map-contents">
                    <div className="map-address">
                      {marker.content.road_address_name}
                    </div>
                    <div className="map-phone">{marker.content.phone}</div>
                  </div>
                </MapInfor>
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </MapWrapp>
  );
};

const MapWrapp = styled.div`
  width: 60%;
`;

const MapInfor = styled.div`
  font-size: 14px;

  .map-title {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    padding: 8px 8px 0 8px;
    color: #33a264;
    font-weight: 800;
    align-items: center;

    .map-url {
      display: inline-block;
      text-decoration: none;
      padding: 4px;
      color: #33a264;
      border-radius: 4px;
    }
  }
  .map-contents {
    font-size: 12px;
    padding: 8px;

    .map-phone {
      color: #33a264;
      margin: 8px 0 6px;
    }
  }
`;
