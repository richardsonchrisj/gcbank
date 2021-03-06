import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const AddToAccount = () => {
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
    email: account.email,
    password: account.password,
    amount: account.amount,
    image_url: account.image_url,
  };

  return (
    <Form
      formId="edit-account-form"
      addToaccountForm={accountForm}
      forNewAccount={false}
    />
  );
};

export default AddToAccount;
