import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './redux/slice/authSlice'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleLogin = () => {
    // Check if the password is '5', then dispatch loginSuccess action
    if (password === '5') {
      dispatch(loginSuccess());
      navigate('/')
      
    } else {
      dispatch(loginFailure());
      alert('Incorrect password. Please try again.');
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      
      <h1>Login</h1>
      (Password is 5)
      
      <input type="password" value={password} onChange={handleChange} />
      <button onClick={handleLogin} style={{margin:"10px",width:'80px',backgroundColor:'light-blue'}}>Login</button>
     
    </div>
  );
};

export default Login;
