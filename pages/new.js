import Form from "../components/Form";

const NewAccount = () => {
  const accountForm = {
    name: "",
    accountType: false,
    amount: "",
    image_url: "",
  };

  return <Form formId="add-account-form" accountForm={accountForm} />;
};

export default NewAccount;
