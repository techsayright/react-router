import "./App.css";
import React, { Fragment, lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Route, Switch } from "react-router";
import AllQuotes from "./pages/AllQuotes";
// import QuoteDetails from "./pages/QuoteDetails";
// import NewQuotes from "./pages/NewQuotes";
import HeaderNavigation from "./components/layout/HeaderNavigation";
import loader from '../src/loader/loader.gif'

const NewQuotes = lazy(() => import("./pages/NewQuotes"));
const QuoteDetails = lazy(() => import("./pages/QuoteDetails"));

function App() {
  return (
    <Fragment>
      <HeaderNavigation />
      <Suspense fallback={<h1><image src={loader}/></h1>}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteID">
            <QuoteDetails />
          </Route>
          <Route path="/new-quotes">
            <NewQuotes />
          </Route>
          <Route path="*">
            <h1 className="text-center my-5">Not Found !! </h1>
          </Route>
        </Switch>
      </Suspense>
    </Fragment>
  );
}

export default App;
