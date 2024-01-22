import { atom } from 'recoil';

export const AlertAtom = atom<boolean>({
  key: 'alert-atom',
  default: false,
});
