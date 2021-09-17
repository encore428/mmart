import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import { AppShell } from "./app-shell";
import './index.css';
import BrowsePage from './Browse-page';
import SpecForm from './Spec-form';
import HomePage from './Home-page';
import ObjectPage from './Object-page';

ReactDOM.render(
  <BrowserRouter>
      <AppShell>
        <Route path="/browse">
          <BrowsePage />
        </Route>
        <Route path="/spec">
          <SpecForm />
        </Route>
        <Route path="/art/:objectId">
          <ObjectPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </AppShell>
  </BrowserRouter>,
  document.getElementById('root')
);
