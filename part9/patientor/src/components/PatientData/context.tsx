import { createContext } from "react";
import { Entry } from "../../types";

export const context = createContext<{
  id: string | undefined;
  entries: Entry[] | undefined;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}>({ id: undefined, entries: undefined, setEntries: () => {} });
