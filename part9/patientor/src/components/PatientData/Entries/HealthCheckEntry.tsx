import { HealthCheckEntry } from "../../../types";
import { Container, Typography } from "@mui/material";
import HealingIcon from "@mui/icons-material/Healing";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import { EntryContainer } from "./EntryContainer";

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    switch (entry.healthCheckRating) {
      case 0:
        setColor("green");
        break;
      case 1:
        setColor("yellowgreen");
        break;
      case 2:
        setColor("PaleGoldenRod");
        break;
      case 3:
        setColor("darkred");
        break;
    }
  }, [entry.healthCheckRating]);

  return (
    <Container>
      <EntryContainer>
        <Typography>
          {entry.date} <HealingIcon></HealingIcon>
        </Typography>
        <Typography fontStyle={"italic"}>{entry.description}</Typography>
        <Typography>
          <FavoriteIcon style={{ color: color }}></FavoriteIcon>
        </Typography>
        <Typography>diagnose by {entry.specialist}</Typography>
      </EntryContainer>
    </Container>
  );
};

export default HealthCheckEntryComponent;
