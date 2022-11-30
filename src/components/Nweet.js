import { dbService } from "fbase";
import React, { useState } from "react";
// eslint-disable-next-line
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false); 
  const [newNweet, setNewNweet] = useState(nweetObj.text); 
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    //console.log(ok);
    if(ok){
      await deleteDoc(doc(dbService, "nweets", nweetObj.id));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();

    await updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target:{value},
    } = event;
    setNewNweet(value);
  }

  return (
  <div>
    {editing ? (
      <>
      {isOwner && (
      <>
      <form onSubmit={onSubmit}>
        <input 
        type="text" 
        placeholder="오늘의 한줄" 
        value={newNweet} 
        required
        onChange={onChange}
        />
        <input type="submit" value="업데이트" />
      </form>
      <button onClick={toggleEditing}>취소</button>
      </>
      )}
      </>
      ) : (
    <>
    <h4>{nweetObj.text}</h4>
    {isOwner && (
    <>
    <button onClick={onDeleteClick}>삭제</button>
    <button onClick={toggleEditing}>수정</button>
    </>
    )}
    </>
       )}
  </div>
  );
    };

export default Nweet;