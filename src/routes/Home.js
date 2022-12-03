// eslint-disable-next-line
import { dbService } from "../fbase";
import { useState, useEffect } from "react";
// eslint-disable-next-line
import { collection, addDoc, getDocs, onSnapshot, doc } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFacotry from "components/NweetFactory";



const Home = ({ userObj }) => {
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


  return (
    <div>
    <NweetFacotry userObj={userObj} />
    <div>
      {nweets.map((nweet) => (
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
        </div>
        </div>
        );
      };
      
      
      export default Home;