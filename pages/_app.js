import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import { Provider } from "next-auth/client";
import NavBar from "../components/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Gotham City Bank</title>
      </Head>
      <NavBar />

      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
