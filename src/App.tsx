import * as React from "react";
import { CssBaseline } from "@material-ui/core";
import ResponsiveLayout from "./components/responsive-layout/ResponsiveLayout";
import "./styles.css";

export default function App() {
  const isLoggedIn = true;
  return (
    <>
      <CssBaseline />
      <ResponsiveLayout disabled={isLoggedIn}>
        <div className="App">
          <h1>Hello ABC CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
      </ResponsiveLayout>
    </>
  );
}
