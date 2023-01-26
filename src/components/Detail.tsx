import { ModalSignIn } from "./Auth/SignIn";
import { ModalSignUp } from "./Auth/SignUp";
export const Detail = () => {
  return (
    <>
      <h1>디테일</h1>
      <ModalSignIn />
      <ModalSignUp />
    </>
  );
};
