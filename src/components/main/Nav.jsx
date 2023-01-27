import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Login from '../Auth/Login';
import Join from '../Auth/Join';

export const Nav = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);

  const onClickLogin = () => {
    setLoginModal(!loginModal);
  };
  const onClickJoin = () => {
    setJoinModal(!joinModal);
  };

  return (
    <NavWrap>
      <Logo>
        <Link to="/">Hi,카공</Link>
      </Logo>
      <Auth>
        <Link onClick={onClickLogin}>Login</Link>
        <Link onClick={onClickJoin}>Sign up</Link>
      </Auth>
      {loginModal && (
        <Login
          onClickLogin={onClickLogin}
          setJoinModal={setJoinModal}
          onClickJoin={onClickJoin}
        />
      )}
      {joinModal && <Join onClickJoin={onClickJoin} />}
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
