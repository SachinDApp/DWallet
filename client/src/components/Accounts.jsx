import "./Main.css";
import { useState,useEffect } from "react";

function Accounts({web3, setAddress}) {
  const[provider,setProvider]=useState('none');
  const[balance,setBalance]=useState('none');
  const[account,setAccount]=useState('none');


  useEffect(()=>{
  async function allAccount(){
    const select=document.querySelector("#selectNumber");
    try{
    const option = await web3.eth.getAccounts();
    setProvider('Ganache');
    for(let i=0; i<option.length;i++){
      let opt=option[i];
      let element= document.createElement("option");
      element.textContent=opt;
      element.value=opt;
      select.appendChild(element);
    }
  }catch(error){
    setProvider("not connected");
  }

  }
  web3 && allAccount();

},[web3])

async function selectAccount(){
  let selectedAccount=document.querySelector("#selectNumber").value;
  if(selectedAccount && selectedAccount!='select an account'){
    setAddress(selectedAccount);
    let accountBalance=await web3.eth.getBalance(selectedAccount);
    let etherBalance= web3.utils.fromWei(accountBalance, "ether");
    setAccount(selectedAccount);
    setBalance(etherBalance);
  }

}



  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="selectNumber">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option>select an account</option>
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance: {balance}</span>
      <br></br>
      <span className="provider">Provider :{provider}</span>
    </>
  );
}

export default Accounts;
