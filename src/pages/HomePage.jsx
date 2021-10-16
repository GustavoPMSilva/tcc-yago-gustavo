import React from "react";
import { useApi } from "../contexts/ApiContext";
import SignedInHomePage from "./SignedInHomePage";
import logo from "../logo.jpg";

function HomePage() {
  const { signed } = useApi();

  return (
    <>
      {signed ? (
        <SignedInHomePage />
      ) : (
        <>
          <br />
          <img src={logo} class="center" alt="Logo" />
        </>
      )}
    </>
  );
}

export default HomePage;
