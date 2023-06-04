import {memo} from "react";
import './style.css';
function UserDetail({userProfile, t}) {
  return (
    <div className="UserDetail">
      <h3 className="title">{t('user-profile-page.tile')}</h3>
      <p>{t('user-profile-page.name')}: <span className="userInfo">{userProfile.name}</span></p>
      <p>{t('user-profile-page.phone')}: <span className="userInfo">{userProfile.phone}</span></p>
      <p>{t('user-profile-page.email')}: <span className="userInfo">{userProfile.email}</span></p>
    </div>
  );
}

export default memo(UserDetail);
