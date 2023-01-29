import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from '../Auth/Login';
import Join from '../Auth/Join';
import { authService } from '../../firebase';
import { signOut } from 'firebase/auth';
import { currentUserUid, searchStoreData } from '../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const Nav = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const setNamesState = useSetRecoilState(currentUserUid);
  const setCurrentSearchData = useSetRecoilState(searchStoreData);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoginIn(true);
        setUserObj(user);
        setNamesState(user.uid);
      } else {
        setIsLoginIn(false);
      }
    });
  });

  const onClickLogin = () => {
    setLoginModal(!loginModal);
  };

  const onClickJoin = () => {
    setJoinModal(!joinModal);
  };

  const onLogOutClick = () => {
    signOut(authService);
    setCurrentSearchData('스타벅스 강남');
    setNamesState(null);
    // window.location.reload();
  };

  // window.addEventListener("beforeunload", () => {
  //   setCurrentSearchData("스타벅스 강남");
  // });

  return (
    <NavWrap>
      <Logo>
        <Link to="/">Hi,카공</Link>
      </Logo>
      {isLoginIn ? (
        <Auth>
          <Link to="/" onClick={onLogOutClick}>
            Log out
          </Link>
          <Link to="/mypage">마이페이지</Link>
        </Auth>
      ) : (
        <Auth>
          <Link onClick={onClickLogin}>Login</Link>
          <Link onClick={onClickJoin}>Sign up</Link>
        </Auth>
      )}
      {loginModal && !isLoginIn && (
        <Login onClickLogin={onClickLogin} onClickJoin={onClickJoin} />
      )}
      {joinModal && <Join onClickJoin={onClickJoin} userObj={userObj} />}
    </NavWrap>
  );
};

const NavWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 160px;
  padding: 24px 16px;
  background-color: #33a264;
  color: #fff;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 800;

  > a {
    color: inherit;
    text-decoration: none;
  }
`;

const Auth = styled.div`
  > a {
    display: block;
    margin-bottom: 16px;
    text-decoration: none;
    color: inherit;
  }
`;
