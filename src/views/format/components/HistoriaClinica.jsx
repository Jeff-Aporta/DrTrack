import React, { useState, useRef } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import { PaperP } from "@containers";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";

// Importar componentes modulares
import { FichaIdentificacion } from "./FichaIdentificacion";
import { AntecedentesHeredofamiliares } from "./AntecedentesHeredofamiliares";
import { AntecedentesPersonalesNoPatologicos } from "./AntecedentesPersonalesNoPatologicos";
import { AntecedentesPersonalesPatologicos } from "./AntecedentesPersonalesPatologicos";
import { PadecimientoActual } from "./PadecimientoActual";
import { ExploracionFisica } from "./ExploracionFisica";
import { DiagnosticoTratamiento } from "./DiagnosticoTratamiento";
import { generatePDF } from "./PDFGenerator";

export function HistoriaClinica() {
  // Estados para los campos de radio buttons
  const [diabetes, setDiabetes] = useState(null);
  const [hipertension, setHipertension] = useState(null);
  const [tuberculosis, setTuberculosis] = useState(null);
  const [cancer, setCancer] = useState(null);
  const [otras, setOtras] = useState(null);
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    // Ficha de identificación
    nombre: "",
    edad: "",
    sexo: "",
    ocupacion: "",
    estadoCivil: "",
    nacionalidad: "",
    residencia: "",
    escolaridad: "",
    religion: "",
    servicio: "",
    cama: "",
    expediente: "",
    
    // Antecedentes heredofamiliares
    padresVivos: "",
    padresFallecidos: "",
    padresCausas: "",
    hermanosVivos: "",
    hermanosFallecidos: "",
    hermanosCausas: "",
    hijosVivos: "",
    hijosFallecidos: "",
    hijosCausas: "",
    
    // Enfermedades hereditarias (opciones y detalles)
    diabetes: "",
    diabetesDetalles: "",
    hipertension: "",
    hipertensionDetalles: "",
    tuberculosis: "",
    tuberculosisDetalles: "",
    cancer: "",
    cancerDetalles: "",
    otras: "",
    otrasDetalles: "",
    
    // Hábitos tóxicos
    alcohol: "",
    alcoholDetalles: "",
    tabaco: "",
    tabacoDetalles: "",
    drogas: "",
    drogasDetalles: "",
    
    // Resto de antecedentes
    enfermedadesInfancia: "",
    enfermedadesAdulto: "",
    cirugias: "",
    traumatismos: "",
    alergias: "",
    transfusiones: "",
    medicamentosActuales: "",
    // Campos para Padecimiento Actual
    inicioEvolucion: "",
    sintomasPrincipales: "",
    factoresDesencadenantes: "",
    tratamientosPrevios: "",
    estadoActual: "",
    signosVitales: {
      presionArterial: "",
      frecuenciaCardiaca: "",
      frecuenciaRespiratoria: "",
      temperatura: "",
      peso: "",
      talla: "",
      imc: ""
    },
    exploracionGeneral: "",
    cabeza: "",
    cuello: "",
    torax: "",
    abdomen: "",
    extremidades: "",
    neurologico: "",
    diagnosticoPrincipal: "",
    diagnosticosSecundarios: "",
    planEstudios: "",
    tratamientoFarmacologico: "",
    tratamientoNoFarmacologico: "",
    
    // Resto de antecedentes
    pronostico: "",
    observaciones: ""
  });
  
  // Estado para mostrar notificación
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  // Referencia al componente que contiene el formulario para generar el PDF
  const pdfRef = useRef(null);
  
  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Manejar campos anidados (como signosVitales.presionArterial)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Función para cerrar la notificación
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Función para generar el PDF
  const handleGeneratePDF = (shouldPrint = false) => {
    generatePDF(formData, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar, shouldPrint);
  };

  return (
    <>
      <PaperP elevation={3}  ref={pdfRef}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4">HISTORIA CLÍNICA</Typography>
        </Box>

        {/* Secciones del formulario */}
        <Box>
          <FichaIdentificacion 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <AntecedentesHeredofamiliares 
            formData={formData} 
            handleChange={handleChange}
            diabetes={diabetes}
            setDiabetes={setDiabetes}
            hipertension={hipertension}
            setHipertension={setHipertension}
            tuberculosis={tuberculosis}
            setTuberculosis={setTuberculosis}
            cancer={cancer}
            setCancer={setCancer}
            otras={otras}
            setOtras={setOtras}
          />
          
          <AntecedentesPersonalesNoPatologicos 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <AntecedentesPersonalesPatologicos 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <PadecimientoActual 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <ExploracionFisica 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <DiagnosticoTratamiento 
            formData={formData} 
            handleChange={handleChange} 
          />
        </Box>

        {/* Botones de acción */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <div></div>
          <Box>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              size="large"
              color="primary"
              onClick={() => handleGeneratePDF(false)}
            >
              Guardar Historia Clínica
            </Button>
          </Box>
          
          {/* Botón oculto para imprimir el PDF */}
          <Button
            id="generarEImprimirPDF"
            style={{ display: 'none' }}
            onClick={() => handleGeneratePDF(true)}
          >
            Imprimir PDF
          </Button>
        </Box>
      </PaperP>
      
      {/* Notificación */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
