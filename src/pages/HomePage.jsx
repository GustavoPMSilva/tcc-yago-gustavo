import React from "react";
import { useApi } from "../contexts/ApiContext";
import SignedInHomePage from "./SignedInHomePage";

function HomePage() {
  const { signed } = useApi();

  return <>{signed ? <SignedInHomePage /> : <p>Home</p>}</>;
}

export default HomePage;
