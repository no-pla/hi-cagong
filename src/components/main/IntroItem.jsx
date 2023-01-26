import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const IntroItem = ({ placeItem }) => {
  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/${id}`, {
      state: {
        storeInfo: placeItem.find((cafe) => cafe.content.id === id).content,
      },
    });
  };

  return (
    <>
      <IntronItemWrap>
        <IntronItemTitle>
          <em>📚</em>
          <span>
            여러분만의 카공 장소를
            <br /> 소개해 주세요 !
          </span>
        </IntronItemTitle>
        <ItemTitle> 평점 높은 순</ItemTitle>
        {Array.isArray(placeItem) && placeItem.length === 0 ? (
          <SearchTitle>가까운 카페를 검색해 주세요.</SearchTitle>
        ) : (
          <ItemWrap>
            {placeItem?.map(
              (item) =>
                //카테고리가 카페 인것만 나올 수 있도록
                item.content.category_group_code === 'CE7' && (
                  <Item
                    key={item.content.x}
                    onClick={() => goToDetail(`${item.content.id}`)}
                  >
                    <div className="img-wrap">
                      <img
                        src="https://t1.daumcdn.net/cfile/tistory/998BF13D5ACD603C20"
                        alt="이미지"
                      />
                    </div>
                    <div className="item-content">
                      <h4 className="item-title">{item.content.place_name}</h4>
                      <p className="item-address">
                        {item.content.address_name}
                      </p>
                      <p className="item-address">
                        {item.content.category_group_code}
                      </p>
                      <p>⭐⭐⭐⭐</p>
                    </div>
                  </Item>
                )
            )}
          </ItemWrap>
        )}
      </IntronItemWrap>
    </>
  );
};

const IntronItemWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 4em;

  overflow-y: scroll;

  @media (max-width: 1100px) {
    height: 100%;
    order: 2;
    width: calc(100% - 16px);
    box-sizing: border-box;
    margin: 0 auto;
    overflow-y: auto;
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

const SearchTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #898989;
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
