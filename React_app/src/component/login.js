import React, { useEffect, useState } from 'react';
import './wallet.css';
import { Link,useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Axios from 'axios';

const LoginPage = () => {
  const [message, setMessage] = useState('');
  const [network, setNetwork] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userFound, setUserFound] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
    
  // });

  


  const metamask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Request accounts if not already connected
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // console.log(accounts);
        if (accounts.length > 0) {
          // setMessage(`@Connected to MetaMask with address: ${accounts[0]}`);
          const web3 = new Web3(window.ethereum);
          // console.log(web3);
          const networkId = await web3.eth.getChainId();
          if (networkId !== 1n) {
            // If network is not Ethereum Mainnet, show an error message
            setMessage('Network ID not found. Please use Ethereum Mainnet.');
            return;
          }
         
          console.log(networkId);
          switch (networkId) {
            case 1n:
              setNetwork('Ethereum:Mainnet');
              break;
            case 3n:
              setNetwork('Ropsten Testnet');
              break;
            case 4n:
              setNetwork('Rinkeby Testnet');
              break;
            case 42n:
              setNetwork('Kovan Testnet');
              break;
            case 56n:
              setNetwork('Binance');
              break;
            default:
              setNetwork('Unknown Network');
              alert('please use Etherium wallet');
              break;
              // return;
          }

         
        


          const response = await Axios.post('http://localhost:4000/api/verify-address', { userAddress: accounts[0] });
          if (response.data.success) {
            setUserFound(true); 
            setMessage(response.data.message);

            navigate('/Profile');
          }else{
            setUserFound(false);
            setMessage(response.data.message);
          } 

        } 

      } else {
        setMessage('MetaMask not installed.');
      }
    } catch (error) {
      console.error(error);
      setMessage(<p className='message' style={{color:'red'}}>Error connecting to MetaMask.</p>);
    }
  };

  return (
    <section className="pb-5">
      <div className="login-page pt-5">
        <div className="login-logo">
          <a className="logo">
            <img
              src="https://th.bing.com/th/id/OIP.1IiOj50GaPyqHMtOnAqu9gAAAA?pid=ImgDet&rs=1"
              style={{ maxWidth: '150px', backgroundColor: '#ffff' }}
              alt="Logo"
            />
          </a>
        </div>
        <h3>
          <p className="message" id="message" style={{ color: '#ffff', textAlign: 'center' }}>
            {message}
          </p>

          {userFound && (
          <p className="message">Network: {network}</p> 
          )}

        </h3>
        <div className="form ml-3 mr-3">
          <form className="login-form">
            <h1 className="pb-2">Login</h1>
            <button
              type="button"
              id="loginButton"
              className="btn btn-secondary btn-round"
              onClick={metamask}
            >
              <span id="lgbutton"></span> AUTOMATIC LOGIN
            </button>
            <p className="message">Connect to your wallet to enter the dashboard</p>
            <p className="message">
              <a>
                <Link to="Registerpage">Register</Link> /if you don't have an account
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;


