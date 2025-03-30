import React from "react";
import { Grid } from "@mui/material";
import { EtiquetaSubseccion, GrupoCamposTexto, SeccionFormulario } from "./UtilComponents";

export function ExploracionFisica({ formData, handleChange }) {
  // Definir los campos base para signos vitales
  const camposSignosVitalesBase = [
    { 
      label: "Presión Arterial", 
      name: "signosVitales.presionArterial", 
      fem: true
    },
    { 
      label: "Frecuencia Cardíaca", 
      name: "signosVitales.frecuenciaCardiaca", 
      fem: true
    },
    { 
      label: "Frecuencia Respiratoria", 
      name: "signosVitales.frecuenciaRespiratoria", 
      fem: true
    },
    { 
      label: "Temperatura", 
      name: "signosVitales.temperatura", 
      fem: true
    },
    { 
      label: "Peso", 
      name: "signosVitales.peso"
    },
    { 
      label: "Talla", 
      name: "signosVitales.talla",
      fem: true
    },
    { 
      label: "IMC", 
      name: "signosVitales.imc"
    }
  ].map(campo => ({
    ...campo,
    xs: 12,
    md: (() => {
      // Campos que deben ocupar 1/4 del espacio en tablets y escritorio
      const camposReducidos = ["Temperatura", "Peso", "Talla", "IMC"];
      return camposReducidos.includes(campo.label) ? 3 : 4;
    })()
  }));

  // Definir los campos base para exploración por sistemas
  const camposExploracionBase = [
    { 
      label: "Exploración General", 
      name: "exploracionGeneral", 
      xs: 12,
      md: 4,
      fem: true
    },
    { 
      label: "Cabeza", 
      name: "cabeza", 
      xs: 12, 
      md: 4,
      fem: true
    },
    { 
      label: "Cuello", 
      name: "cuello", 
      xs: 12, 
      md: 4
    },
    { 
      label: "Tórax", 
      name: "torax", 
      xs: 12, 
      md: 4
    },
    { 
      label: "Abdomen", 
      name: "abdomen", 
      xs: 12, 
      md: 4
    },
    { 
      label: "Extremidades", 
      name: "extremidades", 
      xs: 12, 
      md: 4,
      fem: true,
      plural: true
    },
    { 
      label: "Neurológico", 
      name: "neurologico", 
      xs: 12, 
      md: 4
    }
  ].map(campo => ({
    ...campo,
    multiline: true,
    rows: 2
  }));

  return (
    <SeccionFormulario titulo="Exploración Física">
      <Grid item xs={12}>
        <EtiquetaSubseccion bold>Signos Vitales</EtiquetaSubseccion>
        <GrupoCamposTexto 
          campos={camposSignosVitalesBase} 
          formData={formData} 
          handleChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <EtiquetaSubseccion bold mt={3} mb={2}>Exploración por Sistemas</EtiquetaSubseccion>
      </Grid>

      <GrupoCamposTexto 
        campos={camposExploracionBase} 
        formData={formData} 
        handleChange={handleChange}
      />
    </SeccionFormulario>
  );
}
