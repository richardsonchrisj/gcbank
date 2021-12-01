import Image from "next/image";
import Link from "next/link";
import { Nav, Navbar, Container } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavBar(user) {
  const [session, loading] = useSession();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/images/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Gotham City Bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Link</Nav.Link>
          </Nav>

          {!session && (
            <Navbar.Text className="justify-content-end">
              <Nav.Link href="/">
                Not signed in <br />
                <button onClick={signIn}>Sign in</button>
              </Nav.Link>
            </Navbar.Text>
          )}
          {session && (
            <Navbar.Text>
              <Nav.Link href="about">
                {" "}
                Signed in {session.user.email}{" "}
                <button onClick={signOut}>Sign Out</button>
              </Nav.Link>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
