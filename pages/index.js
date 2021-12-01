import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Account from "../models/Account";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Index({ accounts }) {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <div>
            {" "}
            <button>
              <Link href="/secret">All Access</Link>
            </button>
          </div>
        </>
      )}
    </>
  );
}

/* Retrieves account(s) data from mongodb database */
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
