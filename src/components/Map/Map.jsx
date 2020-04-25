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
    fetchData(`${country}`).then(res => setInfo(res));
  }, [country]);

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{scale: 200}}>
        <Sphere stroke="#FF5533" strokeWidth={2} />
        <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            geo.properties.confirmed = info.confirmed.value;
            geo.properties.recovered = info.recovered.value;
            geo.properties.deaths = info.deaths.value;
            return (<Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => {
                console.log(geo.properties);
                const { NAME } = geo.properties;
                setCountry(`${NAME}`);
                setTooltipContent(
                  `${NAME} - ${geo.properties.confirmed}`
                );
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
              style={{
                default: {
                  fill: "#D6D6DA",
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