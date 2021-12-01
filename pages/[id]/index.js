import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Account from "../../models/Account";

const AccountPage = ({ account }) => {
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

  return (
    <div key={account._id}>
      <div className="card">
        <img src={account.image_url} />
        <h5 className="account-name">{account.name}</h5>
        <div className="main-content">
          <p className="account-name">{account.name}</p>
          <p className="account-name">Funds: ${account.amount}</p>

          <div className="btn-container">
            <Link href="/[id]/add" as={`/${account._id}/add`}>
              <button className="btn edit">Add Funds</button>
            </Link>
            <br />
            <Link href="/[id]/withdraw" as={`/${account._id}/withdraw`}>
              <button className="btn edit">Withdraw Funds</button>
            </Link>
            <br />
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const account = await Account.findById(params.id).lean();
  account._id = account._id.toString();

  return { props: { account } };
}

export default AccountPage;
