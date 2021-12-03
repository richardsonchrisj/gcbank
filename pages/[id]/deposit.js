import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Account from "../../models/Account";

const DepositPage = ({ account }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const accountID = router.query.id;

    try {
      await fetch(`/api/accounts/${accountID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the account.");
    }
  };

  const numbersWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [balance, setBalance] = useState(account.amount);

  const depositFive = () => {
    setBalance(balance + 5);
  };
  const depositTen = () => {
    setBalance(balance + 10);
  };
  const depositTwenty = () => {
    setBalance(balance + 20);
  };
  const depositHundred = () => {
    setBalance(balance + 100);
  };
  const depositThousand = () => {
    setBalance(balance + 1000);
  };
  const depositMillion = () => {
    setBalance(balance + 1000000);
  };
  return (
    <div key={account._id}>
      <div className="card">
        <img src={account.image_url} />
        <h5 className="account-name">{account.name}</h5>
        <div className="main-content">
          <p className="account-name">{account.name}</p>
          <p className="account-name">${numbersWithCommas(balance)}</p>
          {message && <p>{message}</p>}

          <div className="btn-container">
            <button className="btn edit" onClick={depositFive}>
              Deposit $5
            </button>

            <button className="btn edit" onClick={depositTen}>
              Deposit $10
            </button>

            <button className="btn edit" onClick={depositTwenty}>
              Deposit $20
            </button>

            <button className="btn edit" onClick={depositHundred}>
              Deposit $100
            </button>
            <button className="btn edit" onClick={depositThousand}>
              Deposit $1,000
            </button>
            <button className="btn edit" onClick={depositMillion}>
              Deposit $1 Million
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const account = await Account.findById(params.id).lean();
  account._id = account._id.toString();

  return { props: { account } };
}

export default DepositPage;
