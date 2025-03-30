import jsPDF from "jspdf";

// Función para generar el PDF basado en los datos del formulario
export function generatePDF(
  formData,
  setSnackbarMessage,
  setSnackbarSeverity,
  setOpenSnackbar,
  shouldPrint = false
) {
  function tieneInformacion(obj) {
    return Object.values(obj).some(value => typeof value == "object" ? tieneInformacion(value) : value);
  }

  console.log(formData)

  if (!tieneInformacion(formData)) {
    setSnackbarMessage("No hay información para generar el PDF");
    setSnackbarSeverity("warning");
    setOpenSnackbar(true);
    return;
  }

  try {
    // Mostrar mensaje de carga
    setSnackbarMessage("Generando PDF...");
    setSnackbarSeverity("info");
    setOpenSnackbar(true);

    // Márgenes y posición inicial
    const marginLeft = 10;
    let yPos = 25;
    const lineHeight = 7;
    const pageHeight = 280; // Altura útil de la página A4 (en mm)

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

    // Fecha actual
    const currentDate = new Date().toLocaleDateString();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Fecha: ${currentDate}`, 105, yPos, { align: "center" });
    yPos += lineHeight;

    // Configurar fuente para el contenido
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Objeto para rastrear si una sección tiene contenido
    const sectionHasContent = {
      fichaIdentificacion: false,
      antecedentesHeredofamiliares: false,
      antecedentesPersonalesNoPatologicos: false,
      antecedentesPersonalesPatologicos: false,
      padecimientoActual: false,
      exploracionFisica: {
        signosVitales: false,
        exploracionSistemas: false
      },
      diagnosticoTratamiento: false
    };

    // Función para verificar si los campos tienen contenido
    const hasContent = (fieldNames) => {
      return fieldNames.some(fieldName => {
        // Manejar campos anidados como signosVitales.presionArterial
        if (fieldName.includes('.')) {
          const [parent, child] = fieldName.split('.');
          return formData[parent] && formData[parent][child] && formData[parent][child].trim() !== "";
        }
        return formData[fieldName] && formData[fieldName].trim() !== "";
      });
    };

    // Verificar contenido de cada sección
    sectionHasContent.fichaIdentificacion = hasContent([
      'nombre', 'edad', 'sexo', 'ocupacion', 'estadoCivil', 'nacionalidad',
      'residencia', 'escolaridad', 'religion', 'servicio', 'cama', 'expediente'
    ]);

    sectionHasContent.antecedentesHeredofamiliares = hasContent([
      'padresVivos', 'padresFallecidos', 'padresCausas',
      'hermanosVivos', 'hermanosFallecidos', 'hermanosCausas',
      'hijosVivos', 'hijosFallecidos', 'hijosCausas',
      'diabetes', 'diabetesDetalles', 
      'hipertension', 'hipertensionDetalles',
      'tuberculosis', 'tuberculosisDetalles',
      'cancer', 'cancerDetalles',
      'otras', 'otrasDetalles'
    ]);

    sectionHasContent.antecedentesPersonalesNoPatologicos = hasContent([
      'alcohol', 'tabaco', 'drogas'
    ]);

    sectionHasContent.antecedentesPersonalesPatologicos = hasContent([
      'enfermedadesInfancia', 'enfermedadesAdulto', 'cirugias', 'traumatismos',
      'alergias', 'transfusiones', 'medicamentosActuales'
    ]);

    sectionHasContent.padecimientoActual = hasContent([
      'inicioEvolucion', 'sintomasPrincipales', 'factoresDesencadenantes',
      'tratamientosPrevios', 'estadoActual'
    ]);

    sectionHasContent.exploracionFisica.signosVitales = hasContent([
      'signosVitales.presionArterial', 'signosVitales.frecuenciaCardiaca', 
      'signosVitales.frecuenciaRespiratoria', 'signosVitales.temperatura',
      'signosVitales.peso', 'signosVitales.talla', 'signosVitales.imc'
    ]);

    sectionHasContent.exploracionFisica.exploracionSistemas = hasContent([
      'exploracionGeneral', 'cabeza', 'cuello', 'torax', 'abdomen', 
      'extremidades', 'neurologico'
    ]);

    sectionHasContent.diagnosticoTratamiento = hasContent([
      'diagnosticoPrincipal', 'diagnosticosSecundarios', 'planEstudios',
      'tratamientoFarmacologico', 'tratamientoNoFarmacologico', 'pronostico', 'observaciones'
    ]);

    // Función para añadir encabezado de sección
    const addSectionHeader = (
      text,
      estimatedHeight = 0,
      isFirstSection = false,
      sectionKey = null
    ) => {
      // Verificar si la sección tiene contenido
      if (sectionKey) {
        // Caso especial para exploración física (tiene subsecciones)
        if (sectionKey === 'exploracionFisica') {
          // Si ninguna subsección tiene contenido, no mostrar la sección
          if (!sectionHasContent.exploracionFisica.signosVitales && 
              !sectionHasContent.exploracionFisica.exploracionSistemas) {
            return; // Ignorar sección sin contenido
          }
        } 
        // Resto de secciones
        else if (!sectionHasContent[sectionKey]) {
          return; // Ignorar sección sin contenido
        }
      }

      // Verificar si hay suficiente espacio para la sección completa
      // Si no hay suficiente espacio, comenzar una nueva página
      if (yPos + estimatedHeight > pageHeight) {
        doc.addPage();
        yPos = 20;
      } else if (!isFirstSection) {
        // Agregar espacio adicional antes de cada encabezado (excepto el primero)
        yPos += 10; // Aumentamos el espacio antes del encabezado
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(text, marginLeft, yPos);
      yPos += 2;
      doc.line(marginLeft, yPos + 1, 210 - marginLeft, yPos + 1);
      yPos += lineHeight;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
    };

    // Función para añadir campo
    const addField = (label, value, newLine = false) => {
      // Ignorar si el valor está vacío
      if (!value || value.trim() === "") {
        return;
      }
      
      const text = `${label}: ${value || ""}`;

      if (newLine) {
        yPos += lineHeight;
        doc.text(text, marginLeft, yPos);
      } else {
        yPos += lineHeight;
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
      // Filtrar campos vacíos
      const nonEmptyFields = fields.filter(
        ({ value }) => value && typeof value === "string" ? value.trim() !== "" : value
      );
      
      // Si todos los campos están vacíos, no mostrar nada
      if (nonEmptyFields.length === 0) {
        return;
      }
      
      let xPos = marginLeft;
      const fieldsWidth = (210 - 2 * marginLeft) / nonEmptyFields.length;

      nonEmptyFields.forEach(({ label, value }) => {
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

    function addSubfield(texto, marginLeft, lineHeight, subsectionKey = null, parentSectionKey = null) {
      // Verificar si el subsección tiene contenido
      if (
        (subsectionKey && parentSectionKey && 
        !sectionHasContent[parentSectionKey][subsectionKey])
      ) {
        return; // Ignorar subsección sin contenido
      }

      yPos += lineHeight;
      doc.setFont("helvetica", "bold");
      doc.text(texto, marginLeft, yPos);
      doc.setFont("helvetica", "normal");
      yPos += lineHeight * 0.2;
    }

    // Ficha de Identificación (estimamos ~40mm de altura)
    addSectionHeader("FICHA DE IDENTIFICACIÓN", 40, true, "fichaIdentificacion");

    addFieldsRow([
      { label: "Nombre", value: formData.nombre },
      { label: "Edad", value: formData.edad },
      { label: "Sexo", value: formData.sexo },
    ]);

    addFieldsRow([
      { label: "Ocupación", value: formData.ocupacion },
      { label: "Estado Civil", value: formData.estadoCivil },
      { label: "Nacionalidad", value: formData.nacionalidad },
    ]);

    addFieldsRow([
      { label: "Residencia", value: formData.residencia },
      { label: "Escolaridad", value: formData.escolaridad },
      { label: "Religión", value: formData.religion },
    ]);

    addFieldsRow([
      { label: "Servicio", value: formData.servicio },
      { label: "Cama", value: formData.cama },
      { label: "No. Expediente", value: formData.expediente },
    ]);

    // Antecedentes Heredofamiliares (estimamos ~60mm de altura)
    addSectionHeader("ANTECEDENTES HEREDOFAMILIARES", 60, false, "antecedentesHeredofamiliares");

    addField("Padres Vivos", formData.padresVivos);
    addField("Padres Fallecidos", formData.padresFallecidos, true);
    addField("Causas de fallecimiento", formData.padresCausas, true);

    addField("Hermanos Vivos", formData.hermanosVivos, true);
    addField("Hermanos Fallecidos", formData.hermanosFallecidos, true);
    addField("Causas de fallecimiento", formData.hermanosCausas, true);

    addField("Hijos Vivos", formData.hijosVivos, true);
    addField("Hijos Fallecidos", formData.hijosFallecidos, true);
    addField("Causas de fallecimiento", formData.hijosCausas, true);

    // Verificar si hay enfermedades hereditarias
    const hasHereditaryDiseases = hasContent([
      'diabetes', 'diabetesDetalles', 
      'hipertension', 'hipertensionDetalles', 
      'tuberculosis', 'tuberculosisDetalles', 
      'cancer', 'cancerDetalles', 
      'otras', 'otrasDetalles'
    ]);

    if (hasHereditaryDiseases) {
      addSubfield("Enfermedades Hereditarias:", marginLeft, lineHeight);

      // Para cada enfermedad, mostrar "Sí" o "No" y los detalles si existen
      const addEnfermedadSiNo = (label, opcionSiNo, detalles) => {
        // Comprobación más robusta, mostrando la opción siempre que exista sin importar su valor
        if (opcionSiNo === undefined || opcionSiNo === null || opcionSiNo === "") return; 
        
        // Asegurarse de que sea minúscula para la comparación
        const opcionNormalizada = opcionSiNo.toString().toLowerCase();
        const valor = opcionNormalizada === "si" ? "Sí" : "No";
        
        if (detalles && detalles.trim() !== "") {
          addField(`${label}`, `${valor}, (${detalles})`, true);
        } else {
          addField(`${label}`, valor, true);
        }
      };

      // Mostrar cada enfermedad con su opción Sí/No y detalles
      addEnfermedadSiNo("Diabetes Mellitus tipo 2", formData.diabetes, formData.diabetesDetalles);
      addEnfermedadSiNo("Hipertensión Arterial", formData.hipertension, formData.hipertensionDetalles);
      addEnfermedadSiNo("Tuberculosis", formData.tuberculosis, formData.tuberculosisDetalles);
      addEnfermedadSiNo("Cáncer", formData.cancer, formData.cancerDetalles);
      addEnfermedadSiNo("Otras", formData.otras, formData.otrasDetalles);
    }

    // Antecedentes Personales No Patológicos (estimamos ~30mm de altura)
    addSectionHeader("ANTECEDENTES PERSONALES NO PATOLÓGICOS", 30, false, "antecedentesPersonalesNoPatologicos");

    // Verificar si hay información en alguno de los hábitos tóxicos
    const hasHabitosToxicos = hasContent(['alcohol', 'tabaco', 'drogas']);
    
    if (hasHabitosToxicos) {
      addSubfield("Hábitos Tóxicos:", marginLeft, lineHeight);

      // Para cada hábito, mostrar "Sí" o "No" y los detalles si existen
      const addHabitoSiNo = (label, opcionSiNo, detalles) => {
        if (!opcionSiNo) return; // Si no hay opción seleccionada, no mostrar
        const valor = opcionSiNo === "si" ? "Sí" : "No";
        if (detalles && detalles.trim() !== "") {
          addField(`${label}`, `${valor}, (${detalles})`, true);
        } else {
          addField(`${label}`, valor, true);
        }
      };

      // Mostrar cada hábito con su opción Sí/No y detalles
      addHabitoSiNo("Alcohol", formData.alcohol, formData.alcoholDetalles);
      addHabitoSiNo("Tabaco", formData.tabaco, formData.tabacoDetalles);
      addHabitoSiNo("Drogas", formData.drogas, formData.drogasDetalles);
    }

    // Antecedentes Personales Patológicos (estimamos ~50mm de altura)
    addSectionHeader("ANTECEDENTES PERSONALES PATOLÓGICOS", 50, false, "antecedentesPersonalesPatologicos");

    addField(
      "Enfermedades de la infancia",
      formData.enfermedadesInfancia,
      true
    );
    addField("Enfermedades del adulto", formData.enfermedadesAdulto, true);
    addField("Cirugías previas", formData.cirugias, true);
    addField("Traumatismos", formData.traumatismos, true);
    addField("Alergias", formData.alergias, true);
    addField("Transfusiones", formData.transfusiones, true);
    addField("Medicamentos actuales", formData.medicamentosActuales, true);

    // Padecimiento Actual (estimamos ~50mm de altura)
    addSectionHeader("PADECIMIENTO ACTUAL", 50, false, "padecimientoActual");

    addField("Inicio y evolución", formData.inicioEvolucion, true);
    addField("Síntomas principales", formData.sintomasPrincipales, true);
    addField(
      "Factores desencadenantes",
      formData.factoresDesencadenantes,
      true
    );
    addField("Tratamientos previos", formData.tratamientosPrevios, true);
    addField("Estado actual", formData.estadoActual, true);

    // Exploración Física (estimamos ~70mm de altura)
    addSectionHeader("EXPLORACIÓN FÍSICA", 70, false, "exploracionFisica");

    if (sectionHasContent.exploracionFisica.signosVitales) {
      addSubfield("Signos Vitales:", marginLeft, lineHeight, "signosVitales", "exploracionFisica");
      yPos += lineHeight;

      addFieldsRow([
        {
          label: "Presión Arterial",
          value: formData.signosVitales.presionArterial,
        },
        {
          label: "Frecuencia Cardíaca",
          value: formData.signosVitales.frecuenciaCardiaca,
        },
        {
          label: "Frecuencia Respiratoria",
          value: formData.signosVitales.frecuenciaRespiratoria,
        },
      ]);

      addFieldsRow([
        { label: "Temperatura", value: formData.signosVitales.temperatura },
        { label: "Peso", value: formData.signosVitales.peso },
        { label: "Talla", value: formData.signosVitales.talla },
        { label: "IMC", value: formData.signosVitales.imc },
      ]);
    }

    if (sectionHasContent.exploracionFisica.exploracionSistemas) {
      addSubfield("Exploración por Sistemas:", marginLeft, lineHeight, "exploracionSistemas", "exploracionFisica");

      addField("Exploración General", formData.exploracionGeneral, true);
      addField("Cabeza", formData.cabeza, true);
      addField("Cuello", formData.cuello, true);
      addField("Tórax", formData.torax, true);
      addField("Abdomen", formData.abdomen, true);
      addField("Extremidades", formData.extremidades, true);
      addField("Neurológico", formData.neurologico, true);
    }

    // Diagnóstico y Plan de Tratamiento (estimamos ~60mm de altura)
    addSectionHeader("DIAGNÓSTICO Y PLAN DE TRATAMIENTO", 60, false, "diagnosticoTratamiento");

    addField("Diagnóstico Principal", formData.diagnosticoPrincipal, true);
    addField(
      "Diagnósticos Secundarios",
      formData.diagnosticosSecundarios,
      true
    );
    addField("Plan de Estudios", formData.planEstudios, true);
    addField(
      "Tratamiento Farmacológico",
      formData.tratamientoFarmacologico,
      true
    );
    addField(
      "Tratamiento No Farmacológico",
      formData.tratamientoNoFarmacologico,
      true
    );
    addField("Pronóstico", formData.pronostico, true);
    addField("Observaciones", formData.observaciones, true);

    // Firma
    yPos += lineHeight * 2;
    doc.text("_______________________________", 105, yPos, { align: "center" });
    yPos += lineHeight;
    doc.text("Firma del Médico", 105, yPos, { align: "center" });

    // Guardar el PDF
    const fileName = `Historia_Clinica_${formData.nombre || "Paciente"}_${
      new Date().toISOString().split("T")[0]
    }.pdf`;

    if (shouldPrint) {
      // Abrir el PDF en una nueva ventana para impresión
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const printWindow = window.open(pdfUrl, "_blank");

      if (printWindow) {
        printWindow.addEventListener("load", () => {
          printWindow.print();
        });

        // Mensaje de éxito
        setSnackbarMessage("PDF abierto para impresión");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } else {
        // Si el navegador bloqueó la ventana emergente
        setSnackbarMessage(
          "No se pudo abrir la ventana de impresión. Verifique la configuración de su navegador."
        );
        setSnackbarSeverity("warning");
        setOpenSnackbar(true);
      }
    } else {
      // Solo guardar el PDF
      doc.save(fileName);

      // Mostrar mensaje de éxito
      setSnackbarMessage(`PDF guardado como "${fileName}"`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }
  } catch (error) {
    console.error("Error al generar PDF:", error);
    setSnackbarMessage("Error al generar PDF. Inténtelo de nuevo.");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  }
}
