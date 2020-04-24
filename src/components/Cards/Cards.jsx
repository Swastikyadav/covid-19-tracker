import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import { capitalize } from "../../utils";

import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading..."
  }

  const cardArr = [
    {cardName: "confirmed", value: confirmed.value, color: "rgba(0, 0, 255, 0.5)", body2: "Number of infected people from COVID-19"},
    {cardName: "recovered", value: recovered.value, color: "rgba(0, 255, 0, 0.5)", body2: "Number of recovered people from COVID-19"},
    {cardName: "deaths", value: deaths.value, color: "rgba(255, 0, 0, 0.5)", body2: "Number of deaths caused by COVID-19"},
  ]

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {cardArr.map((eachCard, idx) => {
          const { cardName, color, body2, value } = eachCard;
          return (
            <Grid item component={Card} xs={12} md={3} key={idx} className={cx(styles.card, styles[cardName])}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>{capitalize(cardName)}</Typography>
                <Typography style={{ color: color.toString() }} variant="h5">
                  <CountUp
                    start={0}
                    end={value}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
                <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                <Typography variant="body2">{body2}</Typography>
              </CardContent>
            </Grid>
          );
        })}
      </Grid>
    </div>
  )
}

export default Cards;