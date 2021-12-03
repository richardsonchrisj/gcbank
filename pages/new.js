import Form from "../components/Form";

const NewAccount = () => {
  const accountForm = {
    name: "",
    amount: "",
    image_url: "",
  };

  return (
    <div className="card">
      <img src="images/BTAS.png" />{" "}
      <h5 className="account-name">CREATE ACCOUNT</h5>
      <div className="main-content">
        <p className="account-name">CREATE ACCOUNT</p>
        <Form formId="add-account-form" accountForm={accountForm} />
      </div>
    </div>
  );
};

export default NewAccount;
