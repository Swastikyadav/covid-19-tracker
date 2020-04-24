import axios from "axios";

const baseUrl = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = baseUrl;

  if (country) {
    changeableUrl = `${baseUrl}/countries/${country}`;
  }

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate }
  } catch(error) {
    console.log(error);
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/daily`);
    
    return data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }))
   } catch(error) {
    console.log(error);
  }
}

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${baseUrl}/countries`);
    
    return countries.map(country => country.name);
  } catch(error) {
    console.log(error);
  }
}

export const fetchAllCountryData = async () => {
  try {
    const { data: { countries } } = await axios.get(`${baseUrl}/countries`);
    return countries.reduce(async (acc, {name}, i) => {
      if (name === "Gambia") {
        return acc;
      } else {
        const arr = await acc;
        const { data: { confirmed, recovered, deaths } } = await axios.get(`${baseUrl}/countries/${name}`);
        arr.push({
          name,
          confirmed: confirmed.value,
          recovered: recovered.value,
          deaths: deaths.value
        });
        return arr;
      }
    }, Promise.resolve([]));
  } catch(error) {
    console.log(error);
  }
}