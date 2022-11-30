// eslint-disable-next-line
import { dbService } from "../fbase";
import { useState, useEffect } from "react";
// eslint-disable-next-line
import { collection, addDoc, getDocs, onSnapshot, doc } from "firebase/firestore";
import Nweet from "components/Nweet";



const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid, 
    });
    setNweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
    <form onSubmit={onSubmit}>
      <input
      value={nweet}
      onChange={onChange}
      type="text"
      placeholder="오늘의 한줄?"
      maxLength={120}
      />
    
    <input type="submit" value="입력" />
    </form>
    <div>
      {nweets.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
        </div>
        </div>
        );
      };
      
      
      export default Home;