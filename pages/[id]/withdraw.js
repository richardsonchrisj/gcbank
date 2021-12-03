import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Account from "../../models/Account";

const WithdrawPage = ({ account }) => {
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

  const takeFive = () => {
    if (balance - 5 < 0) {
      setMessage("You've passed your maximum withdrawal!");
    } else {
      setBalance(balance - 5);
    }
  };
  const takeTen = () => {
    if (balance - 10 < 0) {
      setMessage("You've passed your maximum withdrawal!");
    } else {
      setBalance(balance - 10);
    }
  };
  const takeTwenty = () => {
    if (balance - 20 < 0) {
      setMessage("You've passed your maximum withdrawal!");
    } else {
      setBalance(balance - 20);
    }
  };
  const takeHundred = () => {
    if (balance - 100 < 0) {
      setMessage("You've passed your maximum withdrawal!");
    } else {
      setBalance(balance - 100);
    }
  };
  const takeThousand = () => {
    if (balance - 1000 < 0) {
      setMessage("You've passed your maximum withdrawal!");
    } else {
      setBalance(balance - 1000);
    }
  };
  const takeMillion = () => {
    if (balance - 1000000 < 0) {
      setMessage("Ha. You don't have that kind of money!");
    } else {
      setBalance(balance - 1000000);
    }
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
            <button className="btn edit" onClick={takeFive}>
              Withdraw $5
            </button>

            <button className="btn edit" onClick={takeTen}>
              Withdraw $10
            </button>

            <button className="btn edit" onClick={takeTwenty}>
              Withdraw $20
            </button>

            <button className="btn edit" onClick={takeHundred}>
              Withdraw $100
            </button>
            <button className="btn edit" onClick={takeThousand}>
              Withdraw $1,000
            </button>
            <button className="btn edit" onClick={takeMillion}>
              Withdraw $1 Million
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

export default WithdrawPage;
