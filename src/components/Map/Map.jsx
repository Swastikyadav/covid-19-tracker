import React, { memo, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";

import { fetchData } from "../../api";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = ({ setTooltipContent }) => {
  const [country, setCountry] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setInfo(await fetchData(`${country.name}`, `${country.iso_a2}`, `${country.iso_a3}`));
    }

    fetchAPI();
  }, [country]);

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{scale: 200}}>
        <Sphere stroke="#FF5533" strokeWidth={2} />
        <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const { NAME, ISO_A2, ISO_A3 } = geo.properties;
            
            if (info && info.confirmed) {
              geo.properties.confirmed = info.confirmed.value;
              geo.properties.recovered = info.recovered.value;
              geo.properties.deaths = info.deaths.value;
            }

            return (<Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={async () => {
                await setCountry({ name: `${NAME}`, iso_a2: `${ISO_A2}`, iso_a3: `${ISO_A3}` });

                setTooltipContent(
                  info && info.confirmed ? `${NAME}
                  confirmed: ${geo.properties.confirmed}
                  recovered: ${geo.properties.recovered}
                  deaths: ${geo.properties.deaths}` : "No Info..., Sorry!"
                );
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
              style={{
                default: {
                  fill: "gray",
                  outline: "none"
                },
                hover: {
                  fill: "#F53",
                  outline: "none"
                },
                pressed: {
                  fill: "#E42",
                  outline: "none"
                }
              }}
            />)
          })
        }
        </Geographies>
      </ComposableMap>
    </>
  );
}

export default memo(Map);