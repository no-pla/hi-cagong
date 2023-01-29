import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import styled from "styled-components";
import AuthModal, { AuthTitle } from "./Auth/AuthModal";
import {
  ButtonWrap,
  FormWrap,
  Input,
  ModalBackground,
  ModalWrap,
} from "./Auth/Login";
import CustomButton from "./common/CustomButton";
import { authService, storageService } from "../firebase";
import { useRecoilValue } from "recoil";
import { currentUserUid } from "./atom";

const ImgWrap = styled.label`
  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;
  width: 150px;
  height: 150px;
  margin: 0px auto;
  > img {
    width: 100%;
    height: 100%;
    text-align: center;
    object-fit: cover;
  }
`;

export const ChangeProfileModal = ({
  openModal,
  setOpenModal,
  setProfileSetting,
}) => {
  const [newNickName, setNewNickName] = useState("");
  const [noChange, setNoChange] = useState(false);
  const [longNickName, setLongNickName] = useState(false);
  const [success, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const auth = getAuth();

  const uploadPhoto = async (event) => {
    event.preventDefault();
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.

    reader.onloadend = (finishedEvent) => {
      // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
      const contentimgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem("newProfilePhoto", contentimgDataUrl);
      document.getElementById("preview-photo").src = contentimgDataUrl;
    };
  };

  const ChangeProfile = async (event) => {
    event.preventDefault();
    // 변경할 이미지를 올리면 데이터 url로 로컬 스토리지에 임시 저장이 되는데
    // 그 값 가져와서 firestore에 업로드
    let newPhoto = localStorage.getItem("newProfilePhoto");
    const imgRef = ref(
      storageService,
      `${authService.currentUser.uid}/${Date.now()}`
    );

    let downloadUrl;
    if (newPhoto) {
      const response = await uploadString(imgRef, newPhoto, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
    } // 새롭게 변경할 프로필 이미지가 있으면 웹이 이해할 수 있는 형식으로 바꾸어서 반환
    setProfileSetting(false);
    if (newNickName === "" && downloadUrl === undefined) {
      // 새로운 닉네임과 프로필 사진이 없으면 리턴
      setNoChange((prev) => !prev);
      return;
    } else if (newNickName.length > 15) {
      setLongNickName((prev) => !prev);
      return;
    } else {
      await updateProfile(auth.currentUser, {
        displayName:
          newNickName === "" ? auth.currentUser.displayName : newNickName,
        photoURL:
          downloadUrl === undefined ? auth.currentUser.photoURL : downloadUrl,
      })
        .then(() => {
          setNewNickName("");
          setOpenModal((prev) => !prev);
          setProfileSetting((prev) => !prev);
        })
        .catch((error) => {
          alert("에러가 발생했습니다. 다시 시도해 주세요.");
          console.log(error);
          setError((prev) => !prev);
        });
    }
  };

  return (
    <>
      {error && (
        <>
          <AuthModal>
            <AuthTitle>에러가 발생했습니다.</AuthTitle>
            <p>에러가 발생했습니다. 다시 시도해 주세요.</p>
            <CustomButton
              bgColor="#444444"
              height={8}
              width={16}
              onClick={() => setError((prev) => !prev)}
            >
              닫기
            </CustomButton>
          </AuthModal>
        </>
      )}
      {success && (
        <>
          <AuthModal>
            <AuthTitle>프로필이 수정되었습니다.</AuthTitle>
            <p>프로필이 성공적으로 수정되었습니다.</p>
            <CustomButton
              bgColor="#444444"
              height={8}
              width={16}
              onClick={() => setSucess((prev) => !prev)}
            >
              닫기
            </CustomButton>
          </AuthModal>
        </>
      )}
      {noChange && (
        <>
          <AuthModal>
            <AuthTitle>프로필이 변경되지 않았습니다.</AuthTitle>
            <p>프로필 사진과 닉네임 중 하나는 수정해야 합니다.</p>
            <CustomButton
              bgColor="#444444"
              height={8}
              width={16}
              onClick={() => setNoChange((prev) => !prev)}
            >
              되돌아가기
            </CustomButton>
          </AuthModal>
        </>
      )}
      {longNickName && (
        <>
          <AuthModal>
            <AuthTitle>닉네임이 너무 깁니다.</AuthTitle>
            <p>닉네임은 15자 이하여야 합니다.</p>
            <CustomButton
              bgColor="#444444"
              height={8}
              width={16}
              onClick={() => setLongNickName((prev) => !prev)}
            >
              되돌아가기
            </CustomButton>
          </AuthModal>
        </>
      )}
      {openModal && (
        <ModalBackground>
          <ModalWrap>
            <AuthTitle style={{ color: "black" }}>프로필 변경</AuthTitle>
            <FormWrap onSubmit={ChangeProfile}>
              <ImgWrap htmlFor="file">
                <img
                  id="preview-photo"
                  src={auth.currentUser.photoURL}
                  alt="프로필사진"
                />
              </ImgWrap>
              <input
                id="file"
                type="file"
                style={{ display: "none" }}
                accept="images/*"
                onChange={uploadPhoto}
              />
              <Input
                style={{ marginTop: "16px" }}
                placeholder="변경할 닉네임을 입력해 주세요."
                onChange={(event) => setNewNickName(event.target.value)}
              />
              <ButtonWrap>
                <CustomButton type="submit" bgColor="#33a264" height={12}>
                  변경
                </CustomButton>
                <CustomButton
                  height={12}
                  bgColor="#000"
                  onClick={() => setOpenModal(false)}
                >
                  취소
                </CustomButton>
              </ButtonWrap>
            </FormWrap>
          </ModalWrap>
        </ModalBackground>
      )}
    </>
  );
};
