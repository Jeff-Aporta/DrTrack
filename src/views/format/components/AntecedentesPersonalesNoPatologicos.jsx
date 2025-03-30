import React from "react";
import { Grid } from "@mui/material";
import { EtiquetaSubseccion, GrupoRadioSiNo, SeccionFormulario } from "./UtilComponents";

export function AntecedentesPersonalesNoPatologicos({ formData, handleChange }) {
  // Definir los opciones para hábitos tóxicos como RadioSiNo
  const opcionesHabitosToxicos = [
    { 
      label: "Alcohol", 
      name: "alcohol", 
      value: formData.alcohol,
      onChange: handleChange,
      detalles: true,
      detallesValue: formData.alcoholDetalles,
      detallesName: "alcoholDetalles", 
      onDetallesChange: handleChange,
      handleChange
    },
    { 
      label: "Tabaco", 
      name: "tabaco", 
      value: formData.tabaco,
      onChange: handleChange,
      detalles: true,
      detallesValue: formData.tabacoDetalles,
      detallesName: "tabacoDetalles",
      onDetallesChange: handleChange,
      handleChange
    },
    { 
      label: "Drogas", 
      name: "drogas", 
      value: formData.drogas,
      onChange: handleChange,
      detalles: true,
      detallesValue: formData.drogasDetalles,
      detallesName: "drogasDetalles",
      onDetallesChange: handleChange,
      handleChange
    },
  ];

  return (
    <SeccionFormulario titulo="Antecedentes Personales No Patológicos">
      <Grid item xs={12}>
        <EtiquetaSubseccion bold>Hábitos Tóxicos</EtiquetaSubseccion>
        <GrupoRadioSiNo opciones={opcionesHabitosToxicos} />
      </Grid>
    </SeccionFormulario>
  );
}
