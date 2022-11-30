import { authService } from "../fbase";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true); //eslint-disable-line no-unused-vars
  // eslint-disable-next-line
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if ( name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;   
      if (newAccount) {     
        // create newAccount      
        data = await authService.createUserWithEmailAndPassword(
          email, 
          password
          );    
      } else {     
        // log in
        // eslint-disable-next-line      
        data = await authService.signInWithEmailAndPassword(email, password); 
      }  
      console.log(data);
    } catch (error) {   
      setError(error.message);
    }  
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        required 
        value={email} 
        onChange={onChange} 
        />
        <input 
        name="password" 
        type="password" 
        placeholder="Password" 
        required 
        value={password} 
        onChange={onChange} 
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </div>
  );
};
export default Auth;