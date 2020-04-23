import axios from "axios";

const baseUrl = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(baseUrl);

    return { confirmed, recovered, deaths, lastUpdate }
  } catch(error) {

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

  }
}