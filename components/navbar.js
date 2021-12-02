import Image from "next/image";
import { Nav, Navbar, Container } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/client";

export default function NavBar(user) {
  const [session, loading] = useSession();
  return (
    <Navbar variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image
            alt=""
            src="/images/BTAS.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{" "}
          Gotham City Bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/new">Create Account</Nav.Link>
          </Nav>
          <Nav>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
