import { useRouter } from "next/router";
import useSWR from "swr";
import WForm from "../../components/WForm";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditAccount = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: account, error } = useSWR(
    id ? `/api/accounts/${id}` : null,
    fetcher
  );

  if (error) return <p>Failed to load</p>;
  if (!account) return <p>Loading...</p>;

  const accountForm = {
    name: account.name,
    password: account.password,
    amount: account.amount,
    image_url: account.image_url,
  };

  const numbersWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="card">
      <img src={account.image_url} />
      <h5 className="account-name">{account.name}</h5>
      <div className="main-content">
        <p className="account-name">{account.name}</p>
        <p className="account-name">
          Current Balance: ${numbersWithCommas(account.amount)}
        </p>

        <WForm
          formId="edit-account-form"
          accountForm={accountForm}
          forNewAccount={false}
        />
      </div>
    </div>
  );
};

export default EditAccount;
