import { faEllipsis, faG } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import {
  FaCat,
  FaCode,
  FaGit,
  FaGithub,
  FaGoogle,
  FaGoogleDrive,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../firebase";
import { emailRegex } from "../../utils";
import CustomButton from "../common/CustomButton";
import AuthModal, { AuthTitle } from "./AuthModal";
import Join from "./Join";

const Login = ({ onClickLogin, onClickJoin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notMember, setNotMember] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const matchCheckEmail = email.match(emailRegex);
  const [githubUrl, setGithubUrl] = useState("");

  useEffect(() => {
    const githubFunc = async () => {
      const storage = getStorage();
      const reference = ref(storage, `asset/github.png`);
      await getDownloadURL(reference).then((url) => {
        setGithubUrl(url);
      });
    };

    if (githubUrl === "") {
      githubFunc();
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => {
        if (err.message.includes("user-not-found")) {
          setNotMember(!notMember);
        }
        if (err.message.includes("wrong-password")) {
          setWrongPassword(!wrongPassword);
        }
      });
  };

  const onGitHubSignIn = async () => {
    let provider = new GithubAuthProvider();
    await signInWithPopup(authService, provider);
  };
  const onGoogleSignIn = async () => {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(authService, provider);
  };

  return (
    <ModalBackground>
      <ModalWrap>
        <Title>?????????</Title>
        <FormWrap onSubmit={onSubmit}>
          <Input
            type="text"
            name={email}
            placeholder="???????????? ????????? ?????????."
            // required
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          />

          {!matchCheckEmail ? (
            email ? (
              <ErrorMessage>????????? ????????? ????????? ????????????.</ErrorMessage>
            ) : null
          ) : (
            <OkMessage>????????? ????????? ???????????????.</OkMessage>
          )}

          <Input
            name={password}
            type="password"
            placeholder="??????????????? ????????? ?????????."
            // required
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
            }}
          />

          <ButtonWrap>
            <CustomButton type="submit" bgColor="#33a264" height={12}>
              ?????????
            </CustomButton>
            <CustomButton height={12} bgColor="#000" onClick={onClickLogin}>
              ??????
            </CustomButton>
          </ButtonWrap>
        </FormWrap>

        <ButtonWrap>
          <span onClick={onGoogleSignIn}>
            <FontAwesomeIcon icon={faG} size="2x" color="#C3CAD9" />
          </span>
          <span onClick={onGitHubSignIn}>
            <img
              style={{ width: "35px", height: "35px" }}
              src={githubUrl}
              alt="?????????"
            />
          </span>
        </ButtonWrap>
        {/* ???????????? */}
        <Singup onClick={onClickJoin}>????????????</Singup>
        {signUp && <Join />}
      </ModalWrap>

      {/* ????????? ???????????? */}
      {notMember && (
        <AuthModal>
          <AuthTitle>????????? ????????????.</AuthTitle>
          <p>??????????????? ????????????</p>
          <CustomButton
            bgColor="#444444"
            height={8}
            width={16}
            onClick={() => setNotMember(!notMember)}
          >
            ???????????????
          </CustomButton>
        </AuthModal>
      )}
      {/* ??????????????? ???????????? */}
      {wrongPassword && (
        <AuthModal>
          <AuthTitle>??????????????? ???????????????.</AuthTitle>
          <p>?????? ?????? ????????????.</p>
          <CustomButton
            bgColor="#444444"
            height={8}
            width={16}
            onClick={() => setWrongPassword(!wrongPassword)}
          >
            ???????????????
          </CustomButton>
        </AuthModal>
      )}
    </ModalBackground>
  );
};

export default Login;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px 28px;
  background-color: #fff;
  border-radius: 16px;
  color: #000;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

export const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin: 1em 0;
`;

const Singup = styled.button`
  color: #33a264;
  font-weight: 600;
  margin-top: 16px;
  cursor: pointer;
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 4px 0;
  width: 100%;

  > span {
    cursor: pointer;
  }
`;

export const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #ddd;
  background: transparent;
  padding: 8px;
  margin: 4px 4px 8px 4px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  padding: 0 8px;
`;
export const OkMessage = styled.p`
  color: #33a264;
  font-size: 12px;
  padding: 0 8px;
`;
