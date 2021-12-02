import Form from "../components/Form";

const NewAccount = () => {
  const accountForm = {
    name: "",
    amount: "",
    image_url: "",
  };

  return (
    <div className="card">
      <div className="main-content">
        <Form formId="add-account-form" accountForm={accountForm} />
      </div>
    </div>
  );
};

export default NewAccount;
