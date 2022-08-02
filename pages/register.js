import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../components/UserPool';
import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [user_type, setUser_type] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [OTP, setOTP] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    );
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'name',
        Value: name,
      })
    );

    attributeList.push(({
        Name: 'custom:user_type',
        Value: user_type,
      })
    );
    
    UserPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up");
      } else {
        console.log(data);
        setVerifyProcess(true);
        alert('User Added Successfully');
      }
    });
  };

  const verifyAccount = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
    console.log(user);
    user.confirmRegistration(OTP, true, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't verify account");
      } else {
        console.log(data);
        alert('Account verified successfully');
        window.location.href = '/login';
      }
    });
  };

  return (
    <div>
      {verifyProcess === false ? (
        <form onSubmit={onSubmit}>
          
          Name:
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          User Type:
          <input
            type="radio"
            id='user_type'
            value={user_type}
            onChange={(e) => setUser_type('VENDOR')}
          />VENDOR
          <input
            type="radio"
            id='user_type'
            value={user_type}
            onChange={(e) => setUser_type('BUSINESS')}
          />BUSINESS
          <br />
          UserName:
          <input
            type="text"
            value={username.toLowerCase().trim()}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={verifyAccount}>
          Enter the OTP:
          <input
            type="text"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <br />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
}

export default Register;
