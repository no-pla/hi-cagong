import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <NavWrap>
      <Logo>
        <Link to="/">Hi,카공</Link>
      </Logo>
      <Auth>
        <p>Login</p>
        <p>Sing up</p>
      </Auth>
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
  > a {
    text-decoration: none;
    color: #fff;
  }
`;

const Auth = styled.div`
  > p {
    margin-bottom: 16px;
  }
`;
