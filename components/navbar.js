import Image from "next/image";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavBar(user) {
  const [session, loading] = useSession();
  return (
    <Navbar bg="light" expand="lg" id="myNavbar">
      <Navbar.Brand>
        {" "}
        <Link href="/">
          <a className="navbar-brand p-3">
            <Image
              src="/images/logo.svg"
              alt="Gotham City Bank Logo"
              width={40}
              height={40}
            />
          </a>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" id="myNavItem">
          {!session && (
            <>
              Not signed in <br />
              <button onClick={signIn}>Sign in</button>
            </>
          )}{" "}
          {session && (
            <span className="navbar-text">Signed in {session.user.email}</span>
          )}
          <Nav.Link href="/" id="myNavItem">
            Home
          </Nav.Link>
          <Nav.Link href="contact" id="myNavItem">
            Contact
          </Nav.Link>
          <Nav.Link href="about" id="myNavItem">
            About Us
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
