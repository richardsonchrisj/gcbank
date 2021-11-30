import Form from "../components/Form";

const NewAccount = () => {
  const accountForm = {
    name: "",
    password: "",
    accountType: false,
    amount: 0,
    image_url: "",
  };

  return <Form formId="add-account-form" accountForm={accountForm} />;
};

export default NewAccount;
