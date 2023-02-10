import { atom, selector } from 'recoil';
import { userType } from '../../types';



export const userState = atom<userType>({
  key: 'userInfo',
  default: {
    userId: '',
    profileImg: 'https://ifh.cc/v-BH3aJj',
  },
});
