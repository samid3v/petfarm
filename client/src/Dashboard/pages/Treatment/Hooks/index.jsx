import { useContext } from "react";
import TreatmentContext from "../context";

export function useTreatment() {
     return useContext(TreatmentContext);
}