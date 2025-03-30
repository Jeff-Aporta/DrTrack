import React from "react";

import { ThemeSwitcher } from "@templates";
import { DivM } from "@containers";
import { href } from "@jeff-aporta/theme-manager";

import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

// Importar componentes modulares
import { BotonHerramientaSecundario, HistoriaClinica } from "./components";

export default Index;

const { verde_cielo_brillante, verde_cielo } = global.identity.colors;

function Index() {
  return (
    <ThemeSwitcher
      urlShader="shaders/27.glsl"
      bgtype="default"
      h_init="10px"
      h_fin="100px"
    >
      <DivM m_max={20} className="d-flex-col min-h-50vh">
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <BotonHerramientaSecundario startIcon={<ArrowBackIcon />} href={href("/")}>
            Volver
          </BotonHerramientaSecundario>
        </Box>
        <HistoriaClinica />
      </DivM>
    </ThemeSwitcher>
  );
}
