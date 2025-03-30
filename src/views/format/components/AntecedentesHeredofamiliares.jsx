import React from "react";
import { Box, Grid } from "@mui/material";
import {
  EtiquetaSubseccion,
  GrupoCamposTexto,
  GrupoRadioSiNo,
  SeccionFormulario,
} from "./UtilComponents";

export function AntecedentesHeredofamiliares({
  formData,
  handleChange,
  diabetes,
  setDiabetes,
  hipertension,
  setHipertension,
  tuberculosis,
  setTuberculosis,
  cancer,
  setCancer,
  otras,
  setOtras,
}) {
  // Definir los campos base para familiares
  const camposFamiliares = ["Vivos", "Fallecidos", "Causas"];

  // Definir los campos para padres
  const camposPadres = [
    ...camposFamiliares.map((label, index) => {
      // Agregamos lógica condicional para el campo de causas
      if (index === 2) {
        return {
          label: "Causas de fallecimiento",
          name: `padres${label}`,
          plural: true,
          fem: true,
          disabled: !formData.padresFallecidos,
        };
      }
      return {
        label: `Padres ${label.toLowerCase()}`,
        name: `padres${label}`,
        plural: true,
        fem: index === 2,
        handleChange,
      };
    }),
  ];

  // Definir los campos para hermanos
  const camposHermanos = [
    ...camposFamiliares.map((label, index) => {
      // Agregamos lógica condicional para el campo de causas
      if (index === 2) {
        return {
          label: "Causas de fallecimiento",
          name: `hermanos${label}`,
          plural: true,
          fem: true,
          disabled: !formData.hermanosFallecidos,
        };
      }
      return {
        label: `Hermanos ${label.toLowerCase()}`,
        name: `hermanos${label}`,
        plural: true,
        fem: index === 2,
        handleChange,
      };
    }),
  ];

  // Definir los campos para hijos
  const camposHijos = [
    ...camposFamiliares.map((label, index) => {
      // Agregamos lógica condicional para el campo de causas
      if (index === 2) {
        return {
          label: "Causas de fallecimiento",
          name: `hijos${label}`,
          plural: true, 
          fem: true,
          disabled: !formData.hijosFallecidos,
        };
      }
      return {
        label: `Hijos ${label.toLowerCase()}`,
        name: `hijos${label}`,
        plural: true,
        fem: index === 2,
        handleChange,
      };
    }),
  ];

  // Definir las enfermedades base
  const enfermedadesBase = [
    {
      label: "Diabetes Mellitus tipo 2",
      value: diabetes,
      onChange: (e) => {
        setDiabetes(e.target.value);
        // Actualizar formData
        handleChange({target: {name: "diabetes", value: e.target.value}});
      },
      name: "diabetes",
      fem: true,
      detallesValue: formData.diabetesDetalles,
      onDetallesChange: (e) => {
        handleChange(e);
      },
      handleChange,
    },
    {
      label: "Hipertensión Arterial",
      value: hipertension,
      onChange: (e) => {
        setHipertension(e.target.value);
        // Actualizar formData
        handleChange({target: {name: "hipertension", value: e.target.value}});
      },
      name: "hipertension",
      fem: true,
      detallesValue: formData.hipertensionDetalles,
      onDetallesChange: (e) => {
        handleChange(e);
      },
      handleChange,
    },
    {
      label: "Tuberculosis",
      value: tuberculosis,
      onChange: (e) => {
        setTuberculosis(e.target.value);
        // Actualizar formData
        handleChange({target: {name: "tuberculosis", value: e.target.value}});
      },
      name: "tuberculosis",
      fem: true,
      detallesValue: formData.tuberculosisDetalles,
      onDetallesChange: (e) => {
        handleChange(e);
      },
      handleChange,
    },
    {
      label: "Cáncer",
      value: cancer,
      onChange: (e) => {
        setCancer(e.target.value);
        // Actualizar formData
        handleChange({target: {name: "cancer", value: e.target.value}});
      },
      name: "cancer",
      detallesValue: formData.cancerDetalles,
      onDetallesChange: (e) => {
        handleChange(e);
      },
      handleChange,
    },
    {
      label: "Otras",
      value: otras,
      onChange: (e) => {
        setOtras(e.target.value);
        // Actualizar formData
        handleChange({target: {name: "otras", value: e.target.value}});
      },
      name: "otras",
      fem: true,
      plural: true,
      detallesPlaceholder: "Ingresa las otras enfermedades hereditarias",
      detallesValue: formData.otrasDetalles,
      onDetallesChange: (e) => {
        handleChange(e);
      },
      handleChange,
    },
  ].map((enfermedad) => ({
    ...enfermedad,
    detalles: true,
  }));

  // Definir las opciones para enfermedades hereditarias
  const opcionesEnfermedades = enfermedadesBase;

  return (
    <SeccionFormulario titulo="Antecedentes Heredofamiliares">
      <Grid item xs={12}>
        <EtiquetaSubseccion bold>Padres</EtiquetaSubseccion>
        <GrupoCamposTexto
          campos={camposPadres}
          formData={formData}
          handleChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <EtiquetaSubseccion bold>Hermanos</EtiquetaSubseccion>
        <GrupoCamposTexto
          campos={camposHermanos}
          formData={formData}
          handleChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <EtiquetaSubseccion bold>Hijos</EtiquetaSubseccion>
        <GrupoCamposTexto
          campos={camposHijos}
          formData={formData}
          handleChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <EtiquetaSubseccion bold mt={3} mb={4}>
          Enfermedades Hereditarias
        </EtiquetaSubseccion>
      </Grid>

      <Box sx={{ pl: 2, width: "100%" }}>
        <GrupoRadioSiNo
          opciones={opcionesEnfermedades}
          formData={formData}
          handleChange={handleChange}
        />
      </Box>
    </SeccionFormulario>
  );
}
