// eslint-disable-next-line
import { collection } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import { updateProfile } from "firebase/auth";

const Profile = ({refreshUser ,userObj}) => {

  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const auth = getAuth();  
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
    };
    
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
      event.preventDefault();
      if (userObj.displayName !== newDisplayName) {
        await userObj.updateProfile({
          displayName: newDisplayName,
        });
        refreshUser();
      }
    };

    return (
    <>
    <form onSubmit={onSubmit}>
      <input 
      onChange={onChange}
      type="text" 
      placeholder="프로필 수정"
      value={newDisplayName}
      />
      <input type="submit" value="업데이트" />
      </form>
      <button onClick={onLogOutClick}>로그아웃</button>
      </>
      );
    };

    export default Profile;

