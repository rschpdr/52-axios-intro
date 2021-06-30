import { Component } from "react";
import axios from "axios";

// axios é um objeto contendo métodos para fazer requisições HTTP

class Countries extends Component {
  state = {
    countries: [], // O state inicial é uma array vazia
  };

  componentDidMount = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all") // Dispara uma requisição do tipo GET assim que o componente é montado
      .then((response) => {
        // Quando a requisição é concluída
        console.log(response); // Este o objeto de resposta, criado pelo Axios, que contém informações sobre a resposta HTTP em si, e os dados respondidos

        // OBS.: os dados respondidos SEMPRE vão ficar na propriedade data`
        this.setState({ countries: [...response.data] }); // Atualizamos o state com os dados respondidos pela API
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.countries.map((country) => {
            return (
              <li>
                <img
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                  className="img-fluid me-2"
                  style={{ width: "25px", height: "18px" }}
                />
                {country.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Countries;
