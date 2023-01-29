import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const searchStoreData = atom({
  key: 'storeData',
  default: '스타벅스 강남',
  effects_UNSTABLE: [persistAtom],
});

export const currentUserUid = atom({
  key: 'currentUserUid',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
