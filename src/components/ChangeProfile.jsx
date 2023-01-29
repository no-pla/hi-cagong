import { getAuth, updateCurrentUser, updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { useState } from "react";
import styled from "styled-components";
import { AuthTitle } from "./Auth/AuthModal";
import { onPhotoUploaded } from "./MyPage";

import {
  ButtonWrap,
  FormWrap,
  Input,
  ModalBackground,
  ModalWrap,
} from "./Auth/Login";
import CustomButton from "./common/CustomButton";
import { authService, storageService } from "../firebase";

const NewProfilePhotoPreview = styled.img`
  height: 150px;
  width: 150px;
  margin-inline: auto;
  margin-bottom: 30px;
  border-radius: 50%;
`;

export const ChangeProfileModal = ({
  openModal,
  setOpenModal,
  setProfileSetting,
}) => {
  const [newNickName, setNewNickName] = useState("");
  const auth = getAuth();

  const uploadPhoto = async (event) => {
    event.preventDefault();
    const theFile = event.target.files[0]; //
    const reader = new FileReader();
    reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
    console.log(reader);

    reader.onloadend = (finishedEvent) => {
      // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
      const contentimgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem("newProfilePhoto", contentimgDataUrl);
      document.getElementById("preview-photo").src = contentimgDataUrl;
    };
  };

  const ChangeProfile = async (event) => {
    event.preventDefault();
    let newPhoto = localStorage.getItem("newProfilePhoto");
    const imgRef = ref(
      storageService,
      `${authService.currentUser.uid}/${Date.now()}`
    );
    let downloadUrl;
    if (newPhoto) {
      const response = await uploadString(imgRef, newPhoto, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
    }

    setProfileSetting(false);
    if (newNickName === "") {
      alert("ㄷㄷㄷ");
      return;
    } else {
      await updateProfile(auth.currentUser, {
        displayName: newNickName || "닉네임 없음",
        photoURL: downloadUrl,
      })
        .then(() => {
          setNewNickName("");
          setProfileSetting((prev) => !prev);
          setOpenModal(false);
          alert("프로필 변경 성공!");
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      {openModal && (
        <ModalBackground>
          <ModalWrap>
            <AuthTitle style={{ color: "black" }}>프로필 변경</AuthTitle>
            <FormWrap onSubmit={ChangeProfile}>
              <NewProfilePhotoPreview
                id="preview-photo"
                src={auth.currentUser.photoURL}
              />
              <input type="file" accept="images/*" onChange={uploadPhoto} />
              <Input
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
