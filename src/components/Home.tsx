import styled from 'styled-components';
import { IntroItem } from './main/IntroItem';
import { Mapsprac } from './main/Mapsprac';
import { Nav } from './Nav';

export const Home = () => {
  return (
    <MainContent>
      <IntroItem />
      <Mapsprac />
    </MainContent>
  );
};

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 160px);
`;
