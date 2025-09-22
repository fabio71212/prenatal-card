import React, { createContext, useContext, useState } from "react";

const PacienteContext = createContext();

export function PacienteProvider({ children }) {
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  return (
    <PacienteContext.Provider value={{ pacienteSelecionado, setPacienteSelecionado }}>
      {children}
    </PacienteContext.Provider>
  );
}

export function usePaciente() {
  return useContext(PacienteContext);
}


