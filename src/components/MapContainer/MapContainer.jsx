import React, { useState } from "react";
import ReactToolTip from "react-tooltip";

import Map from "../Map/Map";

import styles from "./MapContainer.module.css";

const MapContainer = () => {
  const [content, setContent] = useState("");

  return (
    <div className={styles.mapContainer}>
      <Map setTooltipContent={setContent} />
      <ReactToolTip>{content}</ReactToolTip>
    </div>
  );
}

export default MapContainer;