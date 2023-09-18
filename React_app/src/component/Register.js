import React, { useState } from 'react';
import { useEffect } from 'react';
import './wallet.css';
import { Link } from 'react-router-dom';
 import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import Axios from 'axios';


const Registerpage = () => {
  const [referralCode, setReferralCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if MetaMask is installed and connected
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      // Check if the user is logged in to MetaMask
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts.length > 0) {
            setMessage(`Connected to MetaMask with address: ${accounts[0]}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setMessage('metamask not install');
    }
  }, []);


  const metamask = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/check-referral', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referralCode }),
      });
      const data = await response.json();

      if (data.success) {
        if (window.ethereum) {
          // Request MetaMask connection
          
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const userAddress = accounts[0];
       
          const serverResponse = await fetch('http://localhost:4000/api/store-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ referralCode,userAddress }),
        });
        const serverData = await serverResponse.json();
        if (serverData.success){
          setMessage('Connected to MetaMask.');
        } else {
          setMessage(<p className='message' style={{color:'green'}}>'you are already singin.'</p>);
        }
        // Referral code is valid, connect the wallet here
        toast.success('Wallet connected successfully');
      }// setMessage('Wallet connected successfully');
      } else {
        // Invalid referral code, display an error message
        // setMessage(data.message);
        toast.error(`${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage(<p className="message" style={{ color: 'red' }}>Error connecting to the server</p>);

     
    }
  };



  return (
      <div className="login-page pt-5">
         <ToastContainer/>
          <a className="logo">
            <img src="https://th.bing.com/th/id/OIP.1IiOj50GaPyqHMtOnAqu9gAAAA?pid=ImgDet&rs=1" style={{ maxWidth: '150px',backgroundColor:'#ffff' }} alt="Logo" />
          </a>
         {/* <h3>
          <p className="message" id="message" style={{ color: '#ffff', textAlign: 'center' }}></p>
        </h3>  */}
          <form className="login-form">
            <h1 className="pb-2">Register</h1>
            <sub style={{color:'red'}}>Connect to Wallet</sub>
            <br></br>
            <input type="text"
             placeholder="Enter Referal Code"
              id="sponsorid"
              value={referralCode}
        onChange={(e) => setReferralCode(e.target.value)}
              ></input>
            <div className="button-container">
            <button
             type="button"
             id="loginButton"
              className="btn btn-secondary btn-round"
               onClick={metamask}>
              
              <span id="lgbutton"></span> CONNECT TO WALLET
            </button>
            <p className="message">{message}</p>
            </div>
            <p className="message">Connect to Your wallet to enter the dashboard</p>
             <a><Link to ='/'>Login</Link> /if you don't have an account</a>
            <p className="message">
           
            </p>
          </form>
        // </div>
      
   
  );
};

export default Registerpage;