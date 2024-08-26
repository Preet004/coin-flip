import React, { useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({ supportedChainIds: [5] });

const coinflipAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const coinflipABI = [
    "function flip(bool _choice) external payable returns (bool)"
];

function App() {
    const { activate, account, library } = useWeb3React();
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);

    const connectWallet = async () => {
        try {
            await activate(injected);
        } catch (error) {
            console.error(error);
        }
    };

    const flipCoin = async (choice) => {
        if (!amount || !library) return;

        const signer = library.getSigner();
        const contract = new ethers.Contract(coinflipAddress, coinflipABI, signer);

        try {
            const tx = await contract.flip(choice, { value: ethers.utils.parseEther(amount) });
            await tx.wait();
            setResult("You won!");
        } catch (error) {
            console.error(error);
            setResult("You lost!");
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Coin Flip Game</h1>
            <button onClick={connectWallet}>
                {account ? `Connected: ${account}` : "Connect Wallet"}
            </button>
            <br /><br />
            <input
                type="text"
                placeholder="Amount to bet"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <br /><br />
            <button onClick={() => flipCoin(true)}>Heads</button>
            <button onClick={() => flipCoin(false)}>Tails</button>
            <br /><br />
            <h2>{result}</h2>
        </div>
    );
}

export default App;
