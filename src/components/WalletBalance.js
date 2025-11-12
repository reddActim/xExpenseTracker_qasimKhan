import React from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import './WalletBalance.css'
import Modal from "./Modal";
import BalanceForm from "./BalanceForm";

export default function WalletBalance({ balance, handleBalance, showBalanceModal, setShowBalanceModal }) {
    const handleBalanceSubmit = (event)=>{
        event.preventDefault();
        handleBalance((prev)=>(prev+Number(event.target.balance.value)))
        // localStorage.setItem("balance", balance)
            setShowBalanceModal(false);
    }
    return (
        <>
            <div className="expense-container">
                <div className="expense-card">
                    <p className="style">
                        Wallet Balance: <span>₹{balance}</span>
                    </p>
                    <button type="button" className="add-income-btn" onClick={()=>setShowBalanceModal(true)}>+ Add Income</button>
                </div>
            </div>
             <Modal isOpen={showBalanceModal} onClose={() => setShowBalanceModal(false)}>
        <BalanceForm onSubmit={(event)=>handleBalanceSubmit(event)} />
      </Modal>
        </>
    );
}