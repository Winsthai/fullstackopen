import { List, ListItem, Typography } from "@mui/material";
import { diagnosisEntry, Entry } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

const Entries = ({ entries }: { entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<diagnosisEntry[]>([]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/diagnoses`)
      .then((response) => setDiagnoses(response.data));
  }, []);

  return (
    <>
      <Typography
        variant="h6"
        style={{
          marginBottom: "0.5em",
          fontWeight: "bold",
          paddingTop: "1em",
          alignItems: "center",
        }}
      >
        entries
      </Typography>
      {entries.map((entry) => {
        return (
          <div key={entry.id}>
            <Typography variant="body1">
              {entry.date} <i>{entry.description}</i>
            </Typography>
            {entry.diagnosisCodes ? (
              <List style={{ listStyleType: "disc", paddingLeft: "2em" }}>
                {entry.diagnosisCodes.map((code) => (
                  <ListItem style={{ display: "list-item" }} key={code}>
                    <Typography variant="body2">
                      {code}{" "}
                      {diagnoses.find((diagnosis) => diagnosis.code === code)
                        ? diagnoses.find(
                            (diagnosis) => diagnosis.code === code
                          )!.name
                        : ""}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Entries;
