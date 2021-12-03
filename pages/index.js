import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Account from "../models/Account";
import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Index({ accounts }) {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          <Image
            alt=""
            src="/images/city.jpg"
            width="1920"
            height="1080"
          ></Image>

          <h1 className="entryText">MUST SIGN IN TO ACCESS GOTHAM CITY BANK</h1>
          <br />
        </>
      )}
      {session && (
        <>
          <div>
            {" "}
            <Image
              alt=""
              src="/images/city.jpg"
              width="1920"
              height="1080"
            />{" "}
            <Link href="/secret">
              <h1 className="entryText">WELCOME TO GOTHAM BANK: </h1>
            </Link>
            <h2 className="entryText">ALL ACCESS</h2>
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
