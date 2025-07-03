import maleAvatar from '@/assets/images/male-doctor-avatar.jpg';
import femaleAvatar from '@/assets/images/female-doctor-avatar.jpg';
import { TGender } from '@/types';

const getProfilePhotoOrAvatar = (
    profilePhoto: string | null,
    gender: TGender,
) =>
    profilePhoto ? profilePhoto : gender === 'MALE' ? maleAvatar : femaleAvatar;

export default getProfilePhotoOrAvatar;
