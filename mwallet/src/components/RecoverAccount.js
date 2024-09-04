import React, { useState } from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const { TextArea } = Input;

function RecoverAccount({ setWallet, setSeedPhrase }) {
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);

  function seedAdjust(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }

  function recoverWallet() {
    let recoveredWallet;
    try {
      const secretKey = bs58.decode(typedSeed.trim());
      recoveredWallet = Keypair.fromSecretKey(secretKey);
    } catch (err) {
      setNonValid(true);
      return;
    }

    setSeedPhrase(typedSeed);
    setWallet(recoveredWallet.publicKey.toString());
    navigate("/yourwallet");
    return;
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <BulbOutlined style={{ fontSize: "20px" }} />
          <div>
            Paste your base58 encoded secret key in the field below to recover your wallet.
          </div>
        </div>
        <TextArea
          value={typedSeed}
          onChange={seedAdjust}
          rows={4}
          className="seedPhraseContainer"
          placeholder="Paste your secret key here..."
        />
        <Button
          disabled={typedSeed.trim().length === 0}
          className="frontPageButton"
          type="primary"
          onClick={() => recoverWallet()}
        >
          Recover Wallet
        </Button>
        {nonValid && <p style={{ color: "red" }}>Invalid Secret Key</p>}
        <p className="frontPageBottom" onClick={() => navigate("/")}>
          <span>Back Home</span>
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;
