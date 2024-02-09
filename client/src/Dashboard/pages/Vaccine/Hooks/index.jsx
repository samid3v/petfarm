import { useContext } from "react";
import VaccineContext from "../context";

export function useVaccine() {
     return useContext(VaccineContext);
}