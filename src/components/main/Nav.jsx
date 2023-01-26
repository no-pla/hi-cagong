import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Login from '../Auth/Login';
import SingUp from '../Auth/SingUp';

export const Nav = () => {
  const [loginModal, setLoginModal] = useState(false);
  // const [singupModal, setSingupModal] = useState(false);

  const onClickopenModal = () => {
    setLoginModal(!loginModal);
    // setSingupModal(!singupModal);
  };

  return (
    <NavWrap>
      <Logo>
        <Link to="/">Hi,카공</Link>
      </Logo>
      <Auth>
        <Link onClick={onClickopenModal}>Login</Link>
        <Link>Sign up</Link>
      </Auth>
      {loginModal && <Login onClickopenModal={onClickopenModal} />}
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
  font-size: 20px;
  font-weight: 600;
`;

const Auth = styled.div`
  > a {
    display: block;
    margin-bottom: 16px;
    text-decoration: none;
    color: inherit;
  }
`;
