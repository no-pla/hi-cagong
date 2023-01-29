import styled from 'styled-components';

import LandingPage from './main/LandingPage';

export const Home = () => {
  return (
    <MainContent>
      <LandingPage />
    </MainContent>
  );
};

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 160px);
  overflow: hidden;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;
