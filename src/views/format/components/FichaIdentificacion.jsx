import React from "react";
import { GrupoCamposTexto, SeccionFormulario } from "./UtilComponents";

export function FichaIdentificacion({ formData, handleChange }) {
  // Definir los campos base
  const camposBase = [
    // Primera fila
    [
      { label: "Nombre", name: "nombre" },
      { label: "Edad", name: "edad", fem: true },
      { label: "Sexo", name: "sexo" },
    ],
    // Segunda fila
    [
      { label: "Ocupación", name: "ocupacion", fem: true },
      { label: "Estado Civil", name: "estadoCivil" },
      { label: "Nacionalidad", name: "nacionalidad", fem: true },
    ],
    // Tercera fila
    [
      { label: "Residencia", name: "residencia", fem: true },
      { label: "Escolaridad", name: "escolaridad", fem: true },
      { label: "Religión", name: "religion", fem: true },
    ],
    // Cuarta fila
    [
      { label: "Servicio", name: "servicio" },
      { label: "Cama", name: "cama", fem: true },
      { label: "No. Expediente", name: "expediente" },
    ],
  ];

  // Aplicar propiedades comunes a todos los campos
  const filas = camposBase.map((fila) =>
    fila.map((campo) => ({
      ...campo,
      xs: (() => {
        // Campos que deben ocupar la mitad del espacio en móviles
        const camposReducidos = ["Edad", "Sexo", "Cama", "No. Expediente"];
        return camposReducidos.includes(campo.label) ? 6 : 12;
      })(),
      md: 4,
    }))
  );

  return (
    <SeccionFormulario titulo="FICHA DE IDENTIFICACIÓN" sx={{ pl: 1, pr: 1 }}>
        {filas.map((campos, index) => (
          <GrupoCamposTexto
            key={index}
            campos={campos}
            formData={formData}
            handleChange={handleChange}
            xs={12}
            md={4}
          />
        ))}
    </SeccionFormulario>
  );
}
