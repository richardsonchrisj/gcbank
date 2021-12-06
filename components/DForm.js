import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const DForm = ({ formId, accountForm, forNewAccount = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: accountForm.name,
    email: accountForm.email,
    password: accountForm.password,
    amount: accountForm.amount,
    image_url: accountForm.image_url,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/accounts/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/accounts/${id}`, data, false); // Update the local data without a revalidation
      alert(
        `Contratulations, ${form.name} has been updated at Gotham City Bank!`
      );

      router.push("/secret");
    } catch (error) {
      setMessage("Failed to update account");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      alert(
        `Contratulations, ${form.name} has opened an account at Gotham City Bank`
      );
      router.push("/secret");
    } catch (error) {
      setMessage("Failed to add account");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewAccount ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure pet info is filled for pet name, owner name, accountType, and image url*/
  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.email) err.email = "An email address is required";
    if (!form.password) err.amount = "A password is required";
    if (!form.amount) err.amount = "starting amount is required";
    if (!form.image_url) err.image_url = "Image URL is required";
    return err;
  };

  const d5 = () => {
    setForm({
      ...form,
      amount: (accountForm.amount += 5),
    });
  };
  const d10 = () => {
    setForm({
      ...form,
      amount: (accountForm.amount += 10),
    });
  };
  const d20 = () => {
    setForm({
      ...form,
      amount: (accountForm.amount += 20),
    });
  };
  const d100 = () => {
    setForm({
      ...form,
      amount: (accountForm.amount += 100),
    });
  };
  const d1000 = () => {
    setForm({
      ...form,
      amount: (accountForm.amount += 1000),
    });
  };
  const d1m = () => {
    setForm({
      ...form,
      amount: (accountForm.amount += 1000000),
    });
  };

  const numbersWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <p className="account-name">
        New Balance:<p> ${numbersWithCommas(accountForm.amount)}</p>
      </p>
      <form id={formId} onSubmit={handleSubmit}>
        <div className="text-center">
          <button type="button" className="btn btn-dark" onClick={d5}>
            $5
          </button>
          <button type="button" className="btn btn-dark" onClick={d10}>
            $10
          </button>
          <button type="button" className="btn btn-dark" onClick={d20}>
            $20
          </button>
          <button type="button" className="btn btn-dark" onClick={d100}>
            $100
          </button>
          <button type="button" className="btn btn-dark" onClick={d1000}>
            $1,000
          </button>
          <button type="button" className="btn btn-dark" onClick={d1m}>
            $1M
          </button>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" className="btn btn-danger">
            Submit
          </button>
        </div>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default DForm;
