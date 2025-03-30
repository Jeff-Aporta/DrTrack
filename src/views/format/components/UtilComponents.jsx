import React from "react";
import {
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { isDark } from "@jeff-aporta/theme-manager";

const { verde_cielo_brillante, verde_cielo } = global.identity.colors;

// Botón con estilo secundario personalizado
export function BotonHerramientaSecundario(props) {
  return (
    <Button
      {...props}
      variant="outlined"
      sx={{ mr: 1 }}
      color={isDark() ? "verde_cielo_brillante" : "verde_cielo"}
    />
  );
}

// Componente para los encabezados de sección
export function EncabezadoSeccion(props) {
  return (
    <Typography
      variant="h6"
      sx={{
        borderBottom: "2px solid",
        borderColor: verde_cielo.toBlack(0.3).hex(),
        pb: 1,
        mb: 5, // Margen inferior consistente
        textTransform: "uppercase",
        fontWeight: 600, // Texto más grueso
        opacity: 1, // Opacidad completa para los títulos de sección
      }}
    >
      {props.children}
    </Typography>
  );
}

// Componente para etiquetas de subsecciones con mayor margen inferior
export function EtiquetaSubseccion(props) {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        mt: props.mt || 2,
        mb: props.mb || 2,
        fontWeight: props.bold ? 600 : 500,
        opacity: 0.9, // Aumentar la opacidad para mejor visibilidad
        ...props.sx,
      }}
    >
      {props.children}
    </Typography>
  );
}

// Componente reutilizable para TextField
export function CampoTexto(props) {
  // Utilizamos useRef para mantener el valor
  const inputRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState(props.value || "");

  const {
    label,
    name,
    value,
    onChange,
    parentOnChange,
    multiline = false,
    rows = 1,
    fem = false,
    plural = false,
    placeholder = "",
    fullWidth = true,
    sx,
    disabled = false,
    handleChange,
    ...otherProps
  } = props;

  // Efecto para actualizar el valor interno cuando cambia el valor de la prop
  React.useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  // Determinar el artículo correcto basado en género y pluralidad
  let articulo = "el";
  if (fem) {
    articulo = plural ? "las" : "la";
  } else {
    articulo = plural ? "los" : "el";
  }

  // Placeholder automático si no se proporciona uno
  const placeholderAuto =
    placeholder || `Ingresa ${articulo} ${label.toLowerCase()}`;

  // Manejador de cambios personalizado
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (parentOnChange) {
      parentOnChange(newValue);
    }
    // Llamar al manejador original
    if (onChange) {
      onChange(e);
    }
    if (handleChange) {
      handleChange({ target: { name: name, value: newValue } });
    }
  };

  return (
    <TextField
      fullWidth={fullWidth}
      inputRef={inputRef}
      label={label}
      name={name}
      value={inputValue}
      onChange={handleInputChange}
      multiline={multiline}
      rows={multiline ? 5 : undefined}
      placeholder={placeholderAuto}
      InputLabelProps={{
        shrink: true,
        sx: {
          opacity: 0.9, // Aumentar la opacidad de las etiquetas
          fontWeight: 500, // Hacer las etiquetas un poco más gruesas
          "&:focus-within": {
            color: isDark()
              ? verde_cielo_brillante.main
              : verde_cielo.main + "!important",
          },
        },
      }}
      variant="outlined"
      margin="normal"
      sx={{
        p: multiline ? 2 : 0,
        mb: 2,
        "& .MuiInputBase-input::placeholder": {
          fontSize: "smaller",
          opacity: 0.6,
        },
        "& .MuiInputBase-root": {
          fontSize: "smaller",
          ...(multiline && {
            padding: "10px 0 0 10px !important",
            "& .MuiInputBase-inputMultiline": {
              // resize: "vertical",
              overflow: "auto",
            },
          }),
        },
        "& .MuiInputLabel-root": {
          opacity: 0.9,
          color: isDark() ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
        },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: verde_cielo.hex(),
          },
          "&.Mui-focused fieldset": {
            borderColor: verde_cielo.hex(),
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: verde_cielo.hex(),
          opacity: 1,
        },
        "&:focus-within .MuiInputLabel-root": {
          color: verde_cielo.hex(),
          opacity: 1,
        },
        ...sx,
      }}
      disabled={disabled}
      {...otherProps}
    />
  );
}

// Componente reutilizable para RadioGroup con opciones Sí/No
export function RadioSiNo(props) {
  const {
    label,
    value,
    onChange,
    name,
    detalles = false,
    detallesValue,
    onDetallesChange,
    detallesPlaceholder = "",
    fem = false,
    plural = false,
    handleChange,
    ...otherProps
  } = props;

  // Determinar el artículo correcto basado en género y pluralidad
  let articulo = "el";
  if (fem) {
    articulo = plural ? "las" : "la";
  } else {
    articulo = plural ? "los" : "el";
  }

  // Generar el placeholder automáticamente si no se proporcionó uno
  const placeholderAuto = detallesPlaceholder || `Ingresa los detalles`;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="body1"
        color={verde_cielo_brillante.hex()}
        sx={{
          mb: 1,
          opacity: 0.9,
        }}
      >
        {label}
      </Typography>
      <RadioGroup row value={value || ""} onChange={onChange} name={name}>
        <FormControlLabel value="si" control={<Radio />} label="Sí" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
      {detalles && value === "si" && (
        <TextField
          fullWidth
          multiline
          value={detallesValue || ""}
          onChange={(e) => {
            onDetallesChange(e);
            handleChange(e);
          }}
          name={`${name}Detalles`}
          placeholder={placeholderAuto}
          InputLabelProps={{
            shrink: true,
            sx: {
              opacity: 0.9,
            },
          }}
          sx={{
            mt: 1,
            mb: 1,
            "& .MuiInputBase-input::placeholder": {
              fontSize: "0.85rem",
              opacity: 0.6,
            },
          }}
        />
      )}
    </Box>
  );
}

// Componente para agrupar campos de texto en una fila
export function GrupoCamposTexto({
  campos,
  formData,
  handleChange,
  xs = 12,
  md = 4,
}) {
  return (
    <Grid container spacing={2}>
      {campos.map((campo, index) => {
        const { props, name, ...rest } = campo;
        return (
          <Grid item xs={campo.xs || xs} md={campo.md || md} key={index}>
            <CampoTexto
              value={formData[name]}
              onChange={handleChange}
              name={name}
              {...rest}
              {...props}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

// Componente para agrupar RadioSiNo en una columna
export function GrupoRadioSiNo({ opciones }) {
  return (
    <Grid container spacing={2}>
      {opciones.map((opcion, index) => (
        <Grid item xs={12} md={3} key={index}>
          <RadioSiNo {...opcion} />
        </Grid>
      ))}
    </Grid>
  );
}

// Componente para una sección completa con título y campos
export function SeccionFormulario({ titulo, children, sx }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 }, // Padding responsivo
        mb: 3, // Margen inferior consistente entre secciones
        borderRadius: 2,
        backgroundColor: isDark()
          ? "rgba(0, 0, 0, 0.2)"
          : "rgba(255, 255, 255, 0.8)",
        width: "100%", // Asegurar que todas las secciones tengan el mismo ancho
      }}
    >
      <EncabezadoSeccion>{titulo}</EncabezadoSeccion>
      <Grid container spacing={2} sx={sx}>
        {children}
      </Grid>
    </Paper>
  );
}
