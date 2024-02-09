import { useContext } from "react";
import PatientContext from "../context/PatientContext";

export function usePatients() {
     return useContext(PatientContext);
}