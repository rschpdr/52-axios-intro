import { Component } from "react";
import axios from "axios";

class SearchCountry extends Component {
  state = {
    searchTerm: "",
    searchResults: [],
  };

  // Busca os paises assim que os state do input de pesquisa termina de ser atualizado
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.handleSubmit();
    }
  };

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = async (event) => {
    try {
      const response = await axios.get(
        `https://restcountries.eu/rest/v2/name/${this.state.searchTerm}`
      );

      console.log(response);

      this.setState({ searchResults: [...response.data] });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Digite para buscar um país"
            onChange={this.handleChange}
            value={this.state.searchTerm}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.handleSubmit}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <ul className="list-group">
          {this.state.searchResults.map((country) => {
            return (
              <li key={country.cioc} className="list-group-item">
                <div className="row">
                  <div className="col-4">
                    <img
                      src={country.flag}
                      alt={`Flag of ${country.name}`}
                      className="img-fluid w-75 h-auto"
                    />
                  </div>
                  <div className="col-8 d-flex flex-column">
                    <strong>{country.name}</strong>
                    <span>Capital: {country.capital}</span>
                    <span>Região: {country.region}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SearchCountry;
