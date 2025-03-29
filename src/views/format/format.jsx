import React, { useState, useRef } from "react";

import { ThemeSwitcher } from "@templates";
import { DivM, PaperP } from "@containers";
import { isDark, controlComponents, href } from "@jeff-aporta/theme-manager";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import fluidCSS from "@jeff-aporta/fluidcss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import jsPDF from "jspdf";

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
          <Box>
            <BotonHerramientaSecundario startIcon={<PrintIcon />} onClick={() => window.print()}>
             Imprimir
            </BotonHerramientaSecundario>
            <Button variant="contained" startIcon={<SaveIcon />}>
              Guardar
            </Button>
          </Box>
        </Box>
        <HistoriaClinica />
      </DivM>
    </ThemeSwitcher>
  );
}

function BotonHerramientaSecundario(props) {
 return <Button
  {...props}
  variant="outlined"
  sx={{ mr: 1 }}
  color={isDark() ? "verde_cielo_brillante" : "verde_cielo"}
 />
}

function HistoriaClinica() {
  // Estados para los campos de radio buttons
  const [diabetes, setDiabetes] = useState(null);
  const [hipertension, setHipertension] = useState(null);
  const [tuberculosis, setTuberculosis] = useState(null);
  const [cancer, setCancer] = useState(null);
  const [otras, setOtras] = useState(null);
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
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
    padresVivos: "",
    padresFallecidos: "",
    padresCausas: "",
    hermanosVivos: "",
    hermanosFallecidos: "",
    hermanosCausas: "",
    hijosVivos: "",
    hijosFallecidos: "",
    hijosCausas: "",
    diabetesDetalles: "",
    hipertensionDetalles: "",
    tuberculosisDetalles: "",
    cancerDetalles: "",
    otrasDetalles: "",
    alcohol: "",
    tabaco: "",
    drogas: "",
    enfermedadesInfancia: "",
    enfermedadesAdulto: "",
    cirugias: "",
    traumatismos: "",
    alergias: "",
    transfusiones: "",
    medicamentosActuales: "",
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
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Función para generar el PDF
  const generatePDF = () => {
    try {
      // Mostrar mensaje de carga
      setSnackbarMessage("Generando PDF...");
      setSnackbarSeverity("info");
      setOpenSnackbar(true);
      
      // Crear un nuevo documento PDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Configurar fuentes y estilos
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      
      // Título
      doc.text("HISTORIA CLÍNICA", 105, 15, { align: "center" });
      
      // Configurar fuente para el contenido
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      
      // Márgenes y posición inicial
      const marginLeft = 20;
      let yPos = 25;
      const lineHeight = 7;
      const pageHeight = 280; // Altura útil de la página A4 (en mm)
      
      // Función para añadir encabezado de sección
      const addSectionHeader = (text, estimatedHeight = 0) => {
        // Verificar si hay suficiente espacio para la sección completa
        // Si no hay suficiente espacio, comenzar una nueva página
        if (yPos + estimatedHeight > pageHeight) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        yPos += 5;
        doc.text(text, marginLeft, yPos);
        doc.setLineWidth(0.5);
        doc.line(marginLeft, yPos + 1, 190, yPos + 1);
        yPos += lineHeight;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
      };
      
      // Función para añadir campo
      const addField = (label, value, newLine = false) => {
        const text = `${label}: ${value || ""}`;
        
        if (newLine) {
          yPos += lineHeight;
          doc.text(text, marginLeft, yPos);
        } else {
          doc.text(text, marginLeft, yPos);
        }
        
        // Verificar si necesitamos una nueva página
        if (yPos > pageHeight) {
          doc.addPage();
          yPos = 20;
        }
      };
      
      // Función para añadir múltiples campos en una línea
      const addFieldsRow = (fields) => {
        let xPos = marginLeft;
        const fieldsWidth = (190 - marginLeft) / fields.length;
        
        fields.forEach(({ label, value }) => {
          const text = `${label}: ${value || ""}`;
          doc.text(text, xPos, yPos);
          xPos += fieldsWidth;
        });
        
        yPos += lineHeight;
        
        // Verificar si necesitamos una nueva página
        if (yPos > pageHeight) {
          doc.addPage();
          yPos = 20;
        }
      };
      
      // Ficha de Identificación (estimamos ~40mm de altura)
      addSectionHeader("FICHA DE IDENTIFICACIÓN", 40);
      
      addFieldsRow([
        { label: "Nombre", value: formData.nombre },
        { label: "Edad", value: formData.edad },
        { label: "Sexo", value: formData.sexo }
      ]);
      
      addFieldsRow([
        { label: "Ocupación", value: formData.ocupacion },
        { label: "Estado Civil", value: formData.estadoCivil },
        { label: "Nacionalidad", value: formData.nacionalidad }
      ]);
      
      addFieldsRow([
        { label: "Residencia", value: formData.residencia },
        { label: "Escolaridad", value: formData.escolaridad },
        { label: "Religión", value: formData.religion }
      ]);
      
      addFieldsRow([
        { label: "Servicio", value: formData.servicio },
        { label: "Cama", value: formData.cama },
        { label: "No. Expediente", value: formData.expediente }
      ]);
      
      // Antecedentes Heredofamiliares (estimamos ~70mm de altura)
      addSectionHeader("ANTECEDENTES HEREDOFAMILIARES", 70);
      
      doc.setFont("helvetica", "bold");
      doc.text("Padres:", marginLeft, yPos);
      doc.setFont("helvetica", "normal");
      yPos += lineHeight;
      
      addFieldsRow([
        { label: "Vivos", value: formData.padresVivos },
        { label: "Fallecidos", value: formData.padresFallecidos },
        { label: "Causas", value: formData.padresCausas }
      ]);
      
      doc.setFont("helvetica", "bold");
      doc.text("Hermanos:", marginLeft, yPos);
      doc.setFont("helvetica", "normal");
      yPos += lineHeight;
      
      addFieldsRow([
        { label: "Vivos", value: formData.hermanosVivos },
        { label: "Fallecidos", value: formData.hermanosFallecidos },
        { label: "Causas", value: formData.hermanosCausas }
      ]);
      
      doc.setFont("helvetica", "bold");
      doc.text("Hijos:", marginLeft, yPos);
      doc.setFont("helvetica", "normal");
      yPos += lineHeight;
      
      addFieldsRow([
        { label: "Vivos", value: formData.hijosVivos },
        { label: "Fallecidos", value: formData.hijosFallecidos },
        { label: "Causas", value: formData.hijosCausas }
      ]);
      
      yPos += lineHeight / 2;
      
      addField("Diabetes Mellitus tipo 2", diabetes === "si" ? `Sí - ${formData.diabetesDetalles}` : "No", true);
      yPos += lineHeight;
      addField("Hipertensión Arterial", hipertension === "si" ? `Sí - ${formData.hipertensionDetalles}` : "No", true);
      yPos += lineHeight;
      addField("Tuberculosis", tuberculosis === "si" ? `Sí - ${formData.tuberculosisDetalles}` : "No", true);
      yPos += lineHeight;
      addField("Cáncer", cancer === "si" ? `Sí - ${formData.cancerDetalles}` : "No", true);
      yPos += lineHeight;
      addField("Otras", otras === "si" ? `Sí - ${formData.otrasDetalles}` : "No", true);
      
      // Antecedentes Personales No Patológicos (estimamos ~30mm de altura)
      addSectionHeader("ANTECEDENTES PERSONALES NO PATOLÓGICOS", 30);
      
      doc.setFont("helvetica", "bold");
      doc.text("Hábitos Tóxicos:", marginLeft, yPos);
      doc.setFont("helvetica", "normal");
      yPos += lineHeight;
      
      addFieldsRow([
        { label: "Alcohol", value: formData.alcohol },
        { label: "Tabaco", value: formData.tabaco },
        { label: "Drogas", value: formData.drogas }
      ]);
      
      // Antecedentes Personales Patológicos (estimamos ~40mm de altura)
      addSectionHeader("ANTECEDENTES PERSONALES PATOLÓGICOS", 40);
      
      addFieldsRow([
        { label: "Enfermedades de la infancia", value: formData.enfermedadesInfancia },
        { label: "Enfermedades del adulto", value: formData.enfermedadesAdulto }
      ]);
      
      addFieldsRow([
        { label: "Cirugías previas", value: formData.cirugias },
        { label: "Traumatismos", value: formData.traumatismos }
      ]);
      
      addFieldsRow([
        { label: "Alergias", value: formData.alergias },
        { label: "Transfusiones", value: formData.transfusiones },
        { label: "Medicamentos actuales", value: formData.medicamentosActuales }
      ]);
      
      // Exploración Física (estimamos ~70mm de altura)
      addSectionHeader("EXPLORACIÓN FÍSICA", 70);
      
      doc.setFont("helvetica", "bold");
      doc.text("Signos Vitales:", marginLeft, yPos);
      doc.setFont("helvetica", "normal");
      yPos += lineHeight;
      
      addFieldsRow([
        { label: "Presión Arterial", value: formData.signosVitales.presionArterial },
        { label: "FC", value: formData.signosVitales.frecuenciaCardiaca },
        { label: "FR", value: formData.signosVitales.frecuenciaRespiratoria },
        { label: "Temperatura", value: formData.signosVitales.temperatura }
      ]);
      
      addFieldsRow([
        { label: "Peso", value: formData.signosVitales.peso },
        { label: "Talla", value: formData.signosVitales.talla },
        { label: "IMC", value: formData.signosVitales.imc }
      ]);
      
      addField("Exploración General", formData.exploracionGeneral, true);
      yPos += lineHeight;
      
      addFieldsRow([
        { label: "Cabeza", value: formData.cabeza },
        { label: "Cuello", value: formData.cuello }
      ]);
      
      addFieldsRow([
        { label: "Tórax", value: formData.torax },
        { label: "Abdomen", value: formData.abdomen }
      ]);
      
      addFieldsRow([
        { label: "Extremidades", value: formData.extremidades },
        { label: "Neurológico", value: formData.neurologico }
      ]);
      
      // Diagnóstico y Plan de Tratamiento (estimamos ~60mm de altura)
      addSectionHeader("DIAGNÓSTICO Y PLAN DE TRATAMIENTO", 60);
      
      addFieldsRow([
        { label: "Diagnóstico Principal", value: formData.diagnosticoPrincipal },
        { label: "Diagnósticos Secundarios", value: formData.diagnosticosSecundarios }
      ]);
      
      addField("Plan de Estudios", formData.planEstudios, true);
      yPos += lineHeight;
      
      addField("Tratamiento Farmacológico", formData.tratamientoFarmacologico, true);
      yPos += lineHeight;
      
      addField("Tratamiento No Farmacológico", formData.tratamientoNoFarmacologico, true);
      yPos += lineHeight;
      
      addFieldsRow([
        { label: "Pronóstico", value: formData.pronostico },
        { label: "Observaciones", value: formData.observaciones }
      ]);
      
      // Fecha y firma
      yPos += lineHeight * 2;
      const currentDate = new Date().toLocaleDateString('es-ES');
      doc.text(`Fecha: ${currentDate}`, marginLeft, yPos);
      
      yPos += lineHeight * 3;
      doc.text("____________________________", 105, yPos, { align: "center" });
      yPos += lineHeight;
      doc.text("Firma del Médico", 105, yPos, { align: "center" });
      
      // Guardar el PDF
      const fileName = `Historia_Clinica_${formData.nombre || "Paciente"}_${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);
      
      // Mostrar mensaje de éxito
      setSnackbarMessage(`PDF guardado como "${fileName}"`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      setSnackbarMessage("Error al generar PDF. Inténtelo de nuevo.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  
  // Función para cerrar la notificación
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <PaperP elevation={3} className="p-4" ref={pdfRef}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4">HISTORIA CLÍNICA</Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <EncabezadoSeccion>FICHA DE IDENTIFICACIÓN:</EncabezadoSeccion>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                size="small"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField 
                fullWidth 
                label="Edad" 
                variant="outlined" 
                size="small"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField 
                fullWidth 
                label="Sexo" 
                variant="outlined" 
                size="small"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Ocupación"
                variant="outlined"
                size="small"
                name="ocupacion"
                value={formData.ocupacion}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Estado Civil"
                variant="outlined"
                size="small"
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nacionalidad"
                variant="outlined"
                size="small"
                name="nacionalidad"
                value={formData.nacionalidad}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Residencia"
                variant="outlined"
                size="small"
                name="residencia"
                value={formData.residencia}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Escolaridad"
                variant="outlined"
                size="small"
                name="escolaridad"
                value={formData.escolaridad}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Religión"
                variant="outlined"
                size="small"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Servicio"
                variant="outlined"
                size="small"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField 
                fullWidth 
                label="Cama" 
                variant="outlined" 
                size="small"
                name="cama"
                value={formData.cama}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="No. Expediente"
                variant="outlined"
                size="small"
                name="expediente"
                value={formData.expediente}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <EncabezadoSeccion>Antecedentes Heredofamiliares</EncabezadoSeccion>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Padres:</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Vivos"
                    variant="outlined"
                    size="small"
                    name="padresVivos"
                    value={formData.padresVivos}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Fallecidos"
                    variant="outlined"
                    size="small"
                    name="padresFallecidos"
                    value={formData.padresFallecidos}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Causas"
                    variant="outlined"
                    size="small"
                    name="padresCausas"
                    value={formData.padresCausas}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Hermanos:</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Vivos"
                    variant="outlined"
                    size="small"
                    name="hermanosVivos"
                    value={formData.hermanosVivos}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Fallecidos"
                    variant="outlined"
                    size="small"
                    name="hermanosFallecidos"
                    value={formData.hermanosFallecidos}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Causas"
                    variant="outlined"
                    size="small"
                    name="hermanosCausas"
                    value={formData.hermanosCausas}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Hijos:</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Vivos"
                    variant="outlined"
                    size="small"
                    name="hijosVivos"
                    value={formData.hijosVivos}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Fallecidos"
                    variant="outlined"
                    size="small"
                    name="hijosFallecidos"
                    value={formData.hijosFallecidos}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Causas"
                    variant="outlined"
                    size="small"
                    name="hijosCausas"
                    value={formData.hijosCausas}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ minWidth: 220 }}>
                  Diabetes Mellitus tipo 2
                </Typography>
                <RadioGroup
                  row
                  value={diabetes}
                  onChange={(e) => setDiabetes(e.target.value)}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Detalles"
                  sx={{ ml: 2 }}
                  name="diabetesDetalles"
                  value={formData.diabetesDetalles}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ minWidth: 220 }}>
                  Hipertensión Arterial
                </Typography>
                <RadioGroup
                  row
                  value={hipertension}
                  onChange={(e) => setHipertension(e.target.value)}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Detalles"
                  sx={{ ml: 2 }}
                  name="hipertensionDetalles"
                  value={formData.hipertensionDetalles}
                  onChange={handleChange}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ minWidth: 220 }}>
                  Tuberculosis
                </Typography>
                <RadioGroup
                  row
                  value={tuberculosis}
                  onChange={(e) => setTuberculosis(e.target.value)}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Detalles"
                  sx={{ ml: 2 }}
                  name="tuberculosisDetalles"
                  value={formData.tuberculosisDetalles}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ minWidth: 220 }}>
                  Cáncer
                </Typography>
                <RadioGroup
                  row
                  value={cancer}
                  onChange={(e) => setCancer(e.target.value)}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Detalles"
                  sx={{ ml: 2 }}
                  name="cancerDetalles"
                  value={formData.cancerDetalles}
                  onChange={handleChange}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ minWidth: 220 }}>
                  Otras (especificar)
                </Typography>
                <RadioGroup
                  row
                  value={otras}
                  onChange={(e) => setOtras(e.target.value)}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Especificar"
                  sx={{ ml: 2 }}
                  name="otrasDetalles"
                  value={formData.otrasDetalles}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <EncabezadoSeccion>
            Antecedentes Personales No Patológicos
          </EncabezadoSeccion>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              1) Hábitos Tóxicos:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Alcohol"
                  variant="outlined"
                  size="small"
                  name="alcohol"
                  value={formData.alcohol}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Tabaco"
                  variant="outlined"
                  size="small"
                  name="tabaco"
                  value={formData.tabaco}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Drogas"
                  variant="outlined"
                  size="small"
                  name="drogas"
                  value={formData.drogas}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <EncabezadoSeccion>
            Antecedentes Personales Patológicos
          </EncabezadoSeccion>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Enfermedades de la infancia"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="enfermedadesInfancia"
                value={formData.enfermedadesInfancia}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Enfermedades del adulto"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="enfermedadesAdulto"
                value={formData.enfermedadesAdulto}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cirugías previas"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="cirugias"
                value={formData.cirugias}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Traumatismos"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="traumatismos"
                value={formData.traumatismos}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Alergias"
                variant="outlined"
                size="small"
                name="alergias"
                value={formData.alergias}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Transfusiones"
                variant="outlined"
                size="small"
                name="transfusiones"
                value={formData.transfusiones}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Medicamentos actuales"
                variant="outlined"
                size="small"
                name="medicamentosActuales"
                value={formData.medicamentosActuales}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <EncabezadoSeccion>
            Exploración Física
          </EncabezadoSeccion>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Signos Vitales:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Presión Arterial (mmHg)"
                  variant="outlined"
                  size="small"
                  name="signosVitales.presionArterial"
                  value={formData.signosVitales.presionArterial}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      signosVitales: {
                        ...formData.signosVitales,
                        presionArterial: e.target.value
                      }
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="FC (lpm)"
                  variant="outlined"
                  size="small"
                  name="signosVitales.frecuenciaCardiaca"
                  value={formData.signosVitales.frecuenciaCardiaca}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      signosVitales: {
                        ...formData.signosVitales,
                        frecuenciaCardiaca: e.target.value
                      }
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="FR (rpm)"
                  variant="outlined"
                  size="small"
                  name="signosVitales.frecuenciaRespiratoria"
                  value={formData.signosVitales.frecuenciaRespiratoria}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      signosVitales: {
                        ...formData.signosVitales,
                        frecuenciaRespiratoria: e.target.value
                      }
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Temperatura (°C)"
                  variant="outlined"
                  size="small"
                  name="signosVitales.temperatura"
                  value={formData.signosVitales.temperatura}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      signosVitales: {
                        ...formData.signosVitales,
                        temperatura: e.target.value
                      }
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Peso (kg)"
                  variant="outlined"
                  size="small"
                  name="signosVitales.peso"
                  value={formData.signosVitales.peso}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      signosVitales: {
                        ...formData.signosVitales,
                        peso: e.target.value
                      }
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Talla (cm)"
                  variant="outlined"
                  size="small"
                  name="signosVitales.talla"
                  value={formData.signosVitales.talla}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      signosVitales: {
                        ...formData.signosVitales,
                        talla: e.target.value
                      }
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="IMC (kg/m²)"
                  variant="outlined"
                  size="small"
                  name="signosVitales.imc"
                  value={formData.signosVitales.imc}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      signosVitales: {
                        ...formData.signosVitales,
                        imc: e.target.value
                      }
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Exploración General"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="exploracionGeneral"
                value={formData.exploracionGeneral}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cabeza"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="cabeza"
                value={formData.cabeza}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cuello"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="cuello"
                value={formData.cuello}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tórax"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="torax"
                value={formData.torax}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Abdomen"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="abdomen"
                value={formData.abdomen}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Extremidades"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="extremidades"
                value={formData.extremidades}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Neurológico"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="neurologico"
                value={formData.neurologico}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <EncabezadoSeccion>
            Diagnóstico y Plan de Tratamiento
          </EncabezadoSeccion>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Diagnóstico Principal"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="diagnosticoPrincipal"
                value={formData.diagnosticoPrincipal}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Diagnósticos Secundarios"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="diagnosticosSecundarios"
                value={formData.diagnosticosSecundarios}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Plan de Estudios"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                name="planEstudios"
                value={formData.planEstudios}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tratamiento Farmacológico"
                variant="outlined"
                size="small"
                multiline
                rows={3}
                name="tratamientoFarmacologico"
                value={formData.tratamientoFarmacologico}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tratamiento No Farmacológico"
                variant="outlined"
                size="small"
                multiline
                rows={3}
                name="tratamientoNoFarmacologico"
                value={formData.tratamientoNoFarmacologico}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pronóstico"
                variant="outlined"
                size="small"
                name="pronostico"
                value={formData.pronostico}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Observaciones"
                variant="outlined"
                size="small"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            size="large"
            color="primary"
            onClick={generatePDF}
          >
            Guardar Historia Clínica
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

function EncabezadoSeccion(props) {
  return (
    <Typography
      {...props}
      variant="h6"
      sx={{
        textTransform: "uppercase",
        bgcolor: isDark()
          ? verde_cielo_brillante.toBlack(0.6).hex()
          : verde_cielo.toWhite(0.7).hex(),
        color: isDark() ? "white" : "primary.dark",
        p: 1,
        borderRadius: 1,
      }}
    />
  );
}
