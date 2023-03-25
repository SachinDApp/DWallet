import "./Main.css";
import {useState} from 'react';


function SendEther({web3, account}) {
  const [receipt, setReceipt]= useState({});
  function sendEther(event){
    event.preventDefault();
    const _to=document.querySelector("#to").value;
    const _value=document.querySelector("#value").value;
    const weiValue= web3.utils.toWei(_value,"ether");
    web3.eth.sendTransaction({
      from: account,
      to:_to,
      value:weiValue,
    }).then(function(reciept){
      setReceipt(reciept);
      console.log(reciept);
  

    });
  }

  return (
    <>
      <form className="box" onSubmit={sendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <pre className="json">
          <h3>(Json Response)</h3>
        </pre>
      </div>
    </>
  );
}

export default SendEther;
