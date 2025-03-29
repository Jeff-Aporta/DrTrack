# DrTrack - Sistema de Gestión de Historiales Clínicos

<p align="center">
  <img src="public/img/logo-main.svg" alt="Logo DrTrack" width="200px">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Licencia-Privada-red" alt="Licencia: Privada">
  <img src="https://img.shields.io/badge/React-v19.0.0-blue?logo=react" alt="React: v19.0.0">
  <img src="https://img.shields.io/badge/Node.js-v18.x-green?logo=node.js" alt="Node.js: v18.x">
  <img src="https://img.shields.io/badge/Material--UI-v6.4.8-purple?logo=mui" alt="Material-UI: v6.4.8">
</p>

## Descripción

DrTrack es una aplicación web para la gestión de historiales clínicos, diseñada para facilitar el trabajo de profesionales de la salud. Permite crear, visualizar y exportar historias clínicas completas en formato PDF con texto seleccionable, mejorando la eficiencia en la documentación médica.

## Características Principales

### 1. Autenticación de Usuarios
- Sistema de login intuitivo
- Interfaz de usuario atractiva y responsiva

### 2. Formulario de Historia Clínica Completo
El formulario de historia clínica incluye las siguientes secciones:

#### Ficha de Identificación
- Datos personales del paciente (nombre, edad, sexo)
- Información demográfica (ocupación, estado civil, nacionalidad)
- Datos de residencia y escolaridad
- Información hospitalaria (servicio, cama, número de expediente)

#### Antecedentes Heredofamiliares
- Registro de padres, hermanos e hijos (vivos, fallecidos y causas)
- Enfermedades hereditarias:
  - Diabetes Mellitus tipo 2
  - Hipertensión Arterial
  - Tuberculosis
  - Cáncer
  - Otras enfermedades hereditarias

#### Antecedentes Personales No Patológicos
- Hábitos tóxicos (alcohol, tabaco, drogas)

#### Antecedentes Personales Patológicos
- Enfermedades de la infancia
- Enfermedades del adulto
- Cirugías previas
- Traumatismos
- Alergias
- Transfusiones
- Medicamentos actuales

#### Exploración Física
- Signos vitales:
  - Presión arterial
  - Frecuencia cardíaca
  - Frecuencia respiratoria
  - Temperatura
  - Peso, talla e IMC
- Exploración por sistemas:
  - Exploración general
  - Cabeza
  - Cuello
  - Tórax
  - Abdomen
  - Extremidades
  - Neurológico

#### Diagnóstico y Plan de Tratamiento
- Diagnóstico principal
- Diagnósticos secundarios
- Plan de estudios
- Tratamiento farmacológico
- Tratamiento no farmacológico
- Pronóstico
- Observaciones

### 3. Generación de PDF
- Creación de documentos PDF con texto seleccionable
- Organización inteligente del contenido para evitar cortes de secciones entre páginas
- Inclusión de fecha y espacio para firma del médico
- Nombre del archivo personalizado con el nombre del paciente y la fecha

### 4. Interfaz de Usuario
- Diseño responsivo adaptable a diferentes dispositivos
- Tema claro/oscuro
- Notificaciones para informar al usuario sobre el estado de las operaciones
- Botones intuitivos para navegar, guardar e imprimir

## Tecnologías Utilizadas

### Frontend
- React 19
- Material-UI 6
- jsPDF para la generación de documentos PDF

### Herramientas de Desarrollo
- React Scripts
- React App Rewired
- Cross-env para variables de entorno
- gh-pages para despliegue en GitHub Pages

## Instalación

Para instalar y ejecutar DrTrack localmente, sigue estos pasos:

```bash
# Clonar el repositorio
git clone https://github.com/Jeff-Aporta/DrTrack.git

# Navegar al directorio del proyecto
cd DrTrack

# Instalar dependencias
npm install

# Iniciar la aplicación en modo desarrollo
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

<small>

```
DrTrack/
├── public/
│   ├── img/                # Imágenes estáticas (logo, iconos)
│   └── index               # HTML principal
├── src/
│   ├── app/                # Lógica principal (@app)
│   │   └── theme/          # Tema y componentes UI (@theme)
│   │       ├── components/ # Componentes reutilizables (@components)
│   │       │   ├── containers  # Contenedores layout (@containers)
│   │       │   └── templates/  # Plantillas de componentes
│   │       └── identity/   # Identidad visual (@identity)
│   ├── views/              # Componentes de vista (@views)
│   │   ├── format/         # Vista de historia clínica
│   │   │   └── format      # Formulario principal
│   │   └── login           # Vista de autenticación
│   └── index               # Punto de entrada de la aplicación
├── package.json            # Dependencias y scripts
└── config-overrides.js     # Configuración de webpack y alias
```

</small>

### Alias de Importación

El proyecto utiliza los siguientes alias para simplificar las importaciones:

| Alias | Ruta |
|-------|------|
| @root | / |
| @app | /src/app |
| @views | /src/views |
| @theme | /src/app/theme |
| @identity | /src/app/theme/identity |
| @components | /src/app/theme/components |
| @containers | /src/app/theme/components/containers |
| @templates | /src/app/theme/components/templates/templates |
| @recurrent | /src/app/theme/components/templates/recurrent |

Estos alias permiten importaciones más limpias y evitan rutas relativas complejas.

## Próximas Características

- Almacenamiento de historias clínicas en base de datos
- Búsqueda y filtrado de pacientes
- Seguimiento de evolución del paciente
- Módulo de citas y agenda
- Estadísticas y reportes

## Licencia

Este proyecto tiene licencia privada. Todos los derechos reservados.



Enlace del proyecto: [https://github.com/Jeff-Aporta/DrTrack](https://github.com/Jeff-Aporta/DrTrack)

<br/>
<br/>

---

<br/>
<br/>
<br/>
<p align="right">
  <b>
  DrTrack - Cuidando la salud con tecnología avanzada 💖
  </b>
</p>
