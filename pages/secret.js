import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Account from "../models/Account";
import dbConnect from "../lib/dbConnect";
import Link from "next/link";
import { CardGroup } from "react-bootstrap";

export default function Secret({ accounts }) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();

      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main>
        <div>
          <h1> You aren't signed in.</h1>
        </div>
      </main>
    );
  }

  const numbersWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <main>
      {/* Create a card for each account */}
      <CardGroup>
        {accounts.map((account) => (
          <div key={account._id}>
            <div className="card">
              <img src={account.image_url} />
              <h5 className="account-name">{account.name}</h5>
              <div className="main-content">
                <p className="account-name">{account.name}</p>
                <p className="amount">${numbersWithCommas(account.amount)}</p>

                <div className="btn-container">
                  <Link href="/[id]/edit" as={`/${account._id}/edit`}>
                    <button className="btn edit">Edit Account</button>
                  </Link>
                  <Link href="/[id]" as={`/${account._id}`}>
                    <button className="btn view">Transactions</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardGroup>
    </main>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Account.find({});
  const accounts = result.map((doc) => {
    const account = doc.toObject();
    account._id = account._id.toString();
    return account;
  });

  return { props: { accounts: accounts } };
}
