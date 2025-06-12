import { authKey } from '@/constants/auth.constant';
import { setToLocalStorage } from '@/utils/localStorage';

const storeUserInfo = (token: string) => {
    return setToLocalStorage(authKey, token);
};

export default storeUserInfo;
