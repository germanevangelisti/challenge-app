import React, { Component } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AlertsList from "./pages/AlertsList";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

export default function App() {
  const pages = ["Dashboard", "Alerts Listing"];
  const routes = ["/dashboard", "/alertsList"];

  return (
    <BrowserRouter>
      <NavBar pages={pages} routes={routes} />
      <TopBar />
      <CssBaseline />
      <div className="container-app">
        <Route exact path="/" component={Dashboard} />
        <Route path={routes[0]} component={Dashboard} />
        <Route path={routes[1]} component={AlertsList} />
      </div>
    </BrowserRouter>
  );
}
