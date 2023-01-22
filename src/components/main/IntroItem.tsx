import styled from 'styled-components';

export const IntroItem = () => {
  return (
    <IntronItemWrap>
      <IntronItemTitle>
        <em>📚</em>
        <span>
          여러분만의 카공 장소를
          <br /> 소개해 주세요 !
        </span>
      </IntronItemTitle>
      <ItemTitle> 평점 높은 순</ItemTitle>
      <ItemWrap>
        <Item>
          <div className="img-wrap">
            <img src="https://t1.daumcdn.net/cfile/tistory/998BF13D5ACD603C20" />
          </div>
          <div className="item-content">
            <h4 className="item-title">스타벅스 (서울대 입구역)</h4>
            <p className="item-address">
              서울특별시 관악구 장군봉 11길 128 (서울대입구역 3번 출구 앞)
            </p>
            <p>⭐⭐⭐⭐</p>
          </div>
        </Item>
        <Item>
          <div className="img-wrap">
            <img src="https://t1.daumcdn.net/cfile/tistory/998BF13D5ACD603C20" />
          </div>
          <div className="item-content">
            <h4 className="item-title">스타벅스 (서울대 입구역)</h4>
            <p className="item-address">
              서울특별시 관악구 장군봉 11길 128 (서울대입구역 3번 출구 앞)
            </p>
            <p>⭐⭐⭐⭐</p>
          </div>
        </Item>
        <Item>
          <div className="img-wrap">
            <img src="https://t1.daumcdn.net/cfile/tistory/998BF13D5ACD603C20" />
          </div>
          <div className="item-content">
            <h4 className="item-title">스타벅스 (서울대 입구역)</h4>
            <p className="item-address">
              서울특별시 관악구 장군봉 11길 128 (서울대입구역 3번 출구 앞)
            </p>
            <p>⭐⭐⭐⭐</p>
          </div>
        </Item>
        <Item>
          <div className="img-wrap">
            <img src="https://t1.daumcdn.net/cfile/tistory/998BF13D5ACD603C20" />
          </div>
          <div className="item-content">
            <h4 className="item-title">스타벅스 (서울대 입구역)</h4>
            <p className="item-address">
              서울특별시 관악구 장군봉 11길 128 (서울대입구역 3번 출구 앞)
            </p>
            <p>⭐⭐⭐⭐</p>
          </div>
        </Item>
        <Item>
          <div className="img-wrap">
            <img src="https://t1.daumcdn.net/cfile/tistory/998BF13D5ACD603C20" />
          </div>
          <div className="item-content">
            <h4 className="item-title">스타벅스 (서울대 입구역)</h4>
            <p className="item-address">
              서울특별시 관악구 장군봉 11길 128 (서울대입구역 3번 출구 앞)
            </p>
            <p>⭐⭐⭐⭐</p>
          </div>
        </Item>
        <Item>
          <div className="img-wrap">
            <img src="https://t1.daumcdn.net/cfile/tistory/998BF13D5ACD603C20" />
          </div>
          <div className="item-content">
            <h4 className="item-title">스타벅스 (서울대 입구역)</h4>
            <p className="item-address">
              서울특별시 관악구 장군봉 11길 128 (서울대입구역 3번 출구 앞)
            </p>
            <p>⭐⭐⭐⭐</p>
          </div>
        </Item>
      </ItemWrap>
    </IntronItemWrap>
  );
};

const IntronItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4em;
  width: 40%;
  overflow-y: scroll;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const IntronItemTitle = styled.h2`
  display: flex;
  gap: 8px;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.3;
`;

const ItemTitle = styled.h3`
  font-size: 20px;
  margin: 1.5em 0;
  font-weight: 800;
`;

const ItemWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
`;

const Item = styled.div`
  width: calc(100% / 2 - 16px);
  border: 1px solid #ebebeb;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  .img-wrap {
    width: 100%;
    height: 160px;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .item-content {
    padding: 20px 16px;

    .item-title {
      font-size: 16px;
      font-weight: 600;
    }

    .item-address {
      margin: 16px 0;
      font-size: 14px;
      line-height: 1.3;
      color: #8a8a8a;
    }
  }
`;
