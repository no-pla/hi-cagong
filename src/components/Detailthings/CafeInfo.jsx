import React from 'react';
import styled from 'styled-components';

function CafeInfo() {
  return (
    <CafeInfor>
      <CafeImg>
        {/* Info 전체 */}
        <img
          style={{
            width: 350,
            height: 300,
            backgroundColor: 'tomato',
            display: 'flex',
            flexDirection: 'inherit',
            alignItems: 'center',
          }}
        />
      </CafeImg>
      <div
        style={{
          display: 'inline-block',
          textAlign: 'left',
          margin: 20,
        }}
      >
        {/* info text */}
        <h2
          style={{
            fontSize: '30px',
            fontWidth: 100,
            color: '#33A264',
          }}
        >
          스타벅스 (서울대 입구역)
        </h2>
        <div
          style={{
            padding: 10,
          }}
        >
          {/* 주소 */}
          <div
            style={{
              fontSize: 20,
              color: '#33A264',
            }}
          >
            주소
          </div>
          <div>
            서울특별시 관악구 장군봉 11길 128 (서울대입구역 3번 출구 앞)
          </div>
        </div>
        <div
          style={{
            padding: 10,
          }}
        >
          {/* 전화번호 */}
          <div
            style={{
              fontSize: 20,
              color: '#33A264',
            }}
          >
            전화번호
          </div>
          <div>02 - 123 - 1234</div>
        </div>
        <div
          style={{
            padding: 10,
          }}
        >
          {/* 평균 점수 */}
          <div
            style={{
              fontSize: 20,
              color: '#33A264',
            }}
          >
            평균 점수
          </div>
          <div>⭐️⭐️⭐️⭐️⭐️</div>
        </div>
      </div>
    </CafeInfor>
  );
}

export default CafeInfo;

const CafeInfor = styled.section`
  display: inline-flex;
  place-content: center;
  padding: 10px;
  /* margin: 10px; */
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;

const CafeImg = styled.div`
  display: flex;
  flex-direction: inherit;
  align-items: center;
`;
