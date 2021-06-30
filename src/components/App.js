import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Countries from "./Countries";
import SearchCountry from "./SearchCountry";
import Chart from "./Chart";

function App() {
  return (
    <div className="container mt-5">
      <BrowserRouter>
        <Route exact path="/" component={Countries} />
        <Route path="/search" component={SearchCountry} />
        <Route path="/chart" component={Chart} />
      </BrowserRouter>
    </div>
  );
}

export default App;
