import React from "react";
import { GrupoCamposTexto, SeccionFormulario } from "./UtilComponents";

export function AntecedentesPersonalesPatologicos({ formData, handleChange }) {
  // Definir los campos para la primera fila
  const camposFila1 = [
    {
      label: "Enfermedades de la infancia",
      name: "enfermedadesInfancia",
      xs: 12,
      md: 4,
      multiline: true,
      rows: 2,
      fem: true,
      plural: true,
    },
    {
      label: "Enfermedades del adulto",
      name: "enfermedadesAdulto",
      xs: 12,
      md: 4,
      multiline: true,
      rows: 2,
      fem: true,
      plural: true,
    },
  ];

  // Definir los campos para la segunda fila
  const camposFila2 = [
    {
      label: "Cirugías previas",
      name: "cirugias",
      xs: 12,
      md: 4,
      multiline: true,
      rows: 2,
      fem: true,
      plural: true,
    },
    {
      label: "Traumatismos",
      name: "traumatismos",
      xs: 12,
      md: 4,
      multiline: true,
      rows: 2,
      plural: true,
    },
  ];

  // Definir los campos para la tercera fila
  const camposFila3 = [
    {
      label: "Alergias",
      name: "alergias",
      xs: 12,
      md: 4,
      multiline: true,
      rows: 2,
      fem: true,
      plural: true,
    },
    {
      label: "Transfusiones",
      name: "transfusiones",
      xs: 12,
      md: 4,
      multiline: true,
      rows: 2,
      fem: true,
      plural: true,
    },
  ];

  // Definir el campo para medicamentos actuales
  const camposMedicamentos = [
    {
      label: "Medicamentos actuales",
      name: "medicamentosActuales",
      xs: 12,
      md: 4,
      multiline: true,
      rows: 2,
      plural: true,
    },
  ];

  return (
    <SeccionFormulario titulo="Antecedentes Personales Patológicos">
      <GrupoCamposTexto
        campos={[
          ...camposFila1,
          ...camposFila2,
          ...camposFila3,
          ...camposMedicamentos,
        ]}
        formData={formData}
        handleChange={handleChange}
      />
    </SeccionFormulario>
  );
}
