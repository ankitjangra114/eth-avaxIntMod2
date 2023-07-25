import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function Home() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handle(account);
    }
  };
  const handle = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account is found like this");
    }
  };
  const connect = async () => {
    if (!ethWallet) {
      alert("Please Connect Metamask Wallet");
      return;
    }
    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handle(accounts);
    getATM();
  };
  const getATM = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };
  const getBalance = async (walladdress) => {
    if (atm) {
      alert(walladdress)
      setBalance((await atm.Balance(walladdress)).toNumber());
    }
  };
  const depo = async () => {
    alert(account)
    if (atm) {
      let tx = await atm.depoamount(1, { gasLimit: 3e7 });
      await tx.wait();
      getBalance(account[0]);
    }
  };
  const draw = async () => {
    if (atm) {
      let tx = await atm.drawamount(1, { gasLimit: 3e7 });
      await tx.wait();
      getBalance(account[0]);
    }
  };
  const initUser = () => {
    if (!ethWallet) {
      return <p>You need to install Metamask in order to use this ATM.</p>;
    }
    if (!account) {
      return (
        <button onClick={connect}>
          Connect your Metamask wallet
        </button>
      );
    }
    if (balance == undefined) {
      getBalance(account[0]);
    }
    return (
      <div class="overlay">
        <p>Balance: {balance}</p>
        <p>Account: {account}</p>
        <button onClick={depo}>Depo 1 ETH</button>
        <button onClick={draw} >draw 1 ETH</button>
        <button onClick={async () => {
          alert((await atm.Balance(prompt("Wallet Address: "))).toNumber())
        }}>check  others balance</button>
      </div>
    );
  };
  useEffect(() => {
    getWallet();
  }, []);
  return (
    <main className="container">
      <header>
        <p>welcome</p>
      </header>
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
            background-size: cover;
            
          }

          p {
            font-size: 22px;
          }

          button {
            margin:10px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            padding: 20px 30px;
            font-size: 20px;
            cursor: pointer;
            
          }

          button:hover {
            cursor: pointer;
          }
        `}
      </style>
    </main>
  );
}
