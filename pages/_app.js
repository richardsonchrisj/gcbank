import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import { Provider } from "next-auth/client";
import NavBar from "../components/navbar";
import { Container } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Gotham City Bank</title>
      </Head>
      <NavBar />

      <div className="grid">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
