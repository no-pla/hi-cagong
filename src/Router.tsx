import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { SignIn } from './components/Auth/SignIn';
import { SignUp } from './components/Auth/SignUp';
import { Detail } from './components/Detail';
import { Home } from './components/Home';
import { MyPage } from './components/MyPage';
import { Nav } from './components/Nav';

export const Router = () => {
  return (
    <BrowserRouter>
      <ContentWrap>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/:cafeId" element={<Detail />}></Route>
          <Route path="/mypage/:id" element={<MyPage />}></Route>
        </Routes>
      </ContentWrap>
    </BrowserRouter>
  );
};

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
