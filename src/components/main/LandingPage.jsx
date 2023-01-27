import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { searchStoreData } from '../atom';
import { IntroItem } from './IntroItem';
import MapContainer from './MapContainer';
const { kakao } = window;

function LandingPage() {
  const initialPlace = useRecoilValue(searchStoreData);
  const [InputText, setInputText] = useState(initialPlace);
  const [Place, setPlace] = useState(initialPlace);
  const [placeItem, setePlaceItem] = useState([]);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const setNamesState = useSetRecoilState(searchStoreData);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setNamesState(InputText);
    setInputText('');
  };

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(Place, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        let placeItem = [];

        for (let i = 0; i < data.length; i++) {
          data[i].category_group_code === 'CE7' && displayMarker(data[i]);
          placeItem.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i],
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setePlaceItem(placeItem);
        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다

      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          `<div class="overlaybox">
            <a style="text-decoration:none; color:#000; display:block;" href=${place.place_url} target="blank">${place.place_name}</a>
            <span class="title">${place.phone}</span>
          </div>`
        );
        infowindow.open(map, marker);
      });
    }
  }, [Place]);

  return (
    <>
      <IntroItem placeItem={placeItem} />
      <SearchWrap>
        <SearchForm className="inputForm" onSubmit={handleSubmit}>
          <p>
            가까운 <br />
            <span>카페</span>를 검색해 보세요.
          </p>
          <InputBox>
            <input
              placeholder="구 + 카페 를 검색해주세요. (예: 성동구 카페)"
              onChange={onChange}
              value={InputText}
            />
            <button type="submit">검색</button>
          </InputBox>
        </SearchForm>
        <MapContainer searchPlace={Place} />
      </SearchWrap>
    </>
  );
}

export default LandingPage;

const SearchWrap = styled.div`
  width: 100%;
  position: relative;
  height: 100vh;

  @media (max-width: 1100px) {
    order: 1;
    width: 100%;
    height: 50vh;
  }
`;
const SearchForm = styled.form`
  position: absolute;
  top: 5%;
  left: 5%;
  background-color: #fff;
  border: 1px solid #000;
  padding: 1em;
  z-index: 999;

  > p {
    margin-bottom: 1em;
    line-height: 1.3;
    font-size: 20px;
    font-weight: 600;

    > span {
      color: #33a264;
    }
  }
`;

const InputBox = styled.div`
  height: 30px;
  display: flex;

  > input {
    width: 240px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 50px;
  }
  > button {
    border-radius: 50px;
    border: 0;
    padding: 0 10px;
    color: #fff;
    font-weight: 500;
    background-color: #33a264;
  }
`;
