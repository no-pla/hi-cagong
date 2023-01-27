import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Detail } from './components/Detail';
import { Home } from './components/Home';
import { MyPage } from './components/MyPage';
import { Nav } from './components/main/Nav';
import { ModalSignIn } from './components/Auth/SignIn';
// import { ModalSignUp } from "./components/Auth/SignUp";

export const Router = () => {
  return (
    <BrowserRouter>
      <ContentWrap>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:cafeId" element={<Detail />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/test" element={<ModalSignIn />}></Route>
          {/* <Route path="/test1" element={<ModalSignUp />}></Route> */}
        </Routes>
      </ContentWrap>
    </BrowserRouter>
  );
};

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  /* overflow: hidden; */
`;
