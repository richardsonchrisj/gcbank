import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const Form = ({ formId, accountForm, forNewAccount = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: accountForm.name,
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
    if (!form.password) err.amount = "A password is required";
    if (!form.amount) err.amount = "starting amount is required";
    if (!form.image_url) err.image_url = "Image URL is required";
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="20"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          maxLength="20"
          name="password"
          autoComplete="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="amount">Funds</label>
        <input
          type="number"
          name="amount"
          pattern="[0-9]*"
          value={form.amount}
          onChange={handleChange}
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-dark">
          Submit
        </button>
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

export default Form;
