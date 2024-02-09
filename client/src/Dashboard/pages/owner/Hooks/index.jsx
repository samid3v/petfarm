import { useContext } from "react";
import OwnersContext from "../context";

export function useOwners() {
     return useContext(OwnersContext);
}