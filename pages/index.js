import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Account from "../models/Account";

const Index = ({ accounts }) => (
  <>
    {/* Create a card for each account */}
    {accounts.map((account) => (
      <div key={account._id}>
        <div className="card">
          <img src={account.image_url} />
          <h5 className="account-name">{account.name}</h5>
          <div className="main-content">
            <p className="account-name">{account.name}</p>
            <p className="amount">Amount: ${account.amount}</p>

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${account._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${account._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

/* Retrieves pet(s) data from mongodb database */
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

export default Index;
