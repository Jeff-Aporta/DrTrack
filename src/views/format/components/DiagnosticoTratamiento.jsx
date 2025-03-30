import React from "react";
import { GrupoCamposTexto, SeccionFormulario } from "./UtilComponents";

export function DiagnosticoTratamiento({ formData, handleChange }) {
  // Definir los campos base para diagnóstico y tratamiento
  const camposBase = [
    { 
      label: "Diagnóstico(s)", 
      name: "diagnosticos", 
      rows: 3,
      plural: true
    },
    { 
      label: "Pronóstico", 
      name: "pronostico", 
      rows: 2
    },
    { 
      label: "Plan de tratamiento", 
      name: "planTratamiento", 
      rows: 4
    }
  ].map(campo => ({
    ...campo,
    xs: 12,
    multiline: true
  }));

  return (
    <SeccionFormulario titulo="Diagnóstico y Tratamiento">
      <GrupoCamposTexto 
        campos={camposBase} 
        formData={formData} 
        handleChange={handleChange}
      />
    </SeccionFormulario>
  );
}
