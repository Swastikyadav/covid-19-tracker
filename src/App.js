import React from "react";
import { Cards, Chart, CountryPicker } from "./components";

import styles from "./App.module.css";
import { fetchData } from "./api";

import covidImage from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({
      data: fetchedData
    });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({
      data: fetchedData,
      country,
    });
  }

  render() {
    const { data, country } = this.state;

    return (
     <div className={styles.container}>
       <img className={styles.image} src={covidImage} alt="COVID-19" />
       <CountryPicker handleCountryChange={this.handleCountryChange} />
       <Cards data={data} />
       <Chart data={data} country={country} />
     </div> 
    )
  }
}

export default App;