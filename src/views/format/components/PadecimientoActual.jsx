import React from "react";
import { GrupoCamposTexto, SeccionFormulario } from "./UtilComponents";

export function PadecimientoActual({ formData, handleChange }) {
  // Definir la configuración base de los campos
  const camposConfig = [
    { 
      label: "Inicio y evolución", 
      name: "inicioEvolucion", 
      rows: 3
    },
    { 
      label: "Síntomas principales", 
      name: "sintomasPrincipales", 
      rows: 3,
      plural: true
    },
    { 
      label: "Factores desencadenantes", 
      name: "factoresDesencadenantes", 
      rows: 2,
      plural: true
    },
    { 
      label: "Tratamientos previos", 
      name: "tratamientosPrevios", 
      rows: 2,
      plural: true
    },
    { 
      label: "Estado actual", 
      name: "estadoActual", 
      rows: 2
    }
  ].map(campo => ({
    ...campo,
    xs: 12,
    multiline: true
  }));

  return (
    <SeccionFormulario titulo="Padecimiento Actual">
      <GrupoCamposTexto 
        campos={camposConfig} 
        formData={formData} 
        handleChange={handleChange}
      />
    </SeccionFormulario>
  );
}
