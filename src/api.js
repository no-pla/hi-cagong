// import { async } from "@firebase/util";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   orderBy,
//   query,
// } from "firebase/firestore";
// import { dbService } from "./firebase";

// export const getReviews = async () => {
//   let data;
//   const q = query(collection(dbService, "review"), orderBy("createAt", "desc"));
//   const docs = await getDocs(q);

//   docs.forEach((doc) => {
//     data = {
//       id: doc.id,
//       ...doc.data(),
//     };
//   });
//   return data;
// };

// // export const addReview = async (item) => {
// //   await addDoc(collection(dbService, "review"), item);
// // };

// export const deleteReview = async (item) => {
//   await deleteDoc(doc(dbService, `review/${item}`), item);
// };

// // export const editReview = async (item) => {};

// // 수정버튼 (id 확인 후 표시 ) -> 버튼 클릭시 input창으로 변경 -> input창 입력 후 (editData)target.value값을 가져오기 -> 수정 완료 버튼 클릭시 -> editData 가져오기 -> 표시 create와 유사
