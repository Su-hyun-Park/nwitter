import React from "react";
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
      <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
      <input 
      onChange={onChange}
      type="text" 
      autoFocus
      placeholder="프로필 수정"
      value={newDisplayName}
      className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
      />
      
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
      );
    };

    export default Profile;

