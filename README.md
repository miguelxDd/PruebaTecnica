# PruebaTecnica
Prueba Tecnica en Java, Usando hibernate.


# Prueba Tecnica

Este repositorio contiene tres componentes principales:

1. **Backend (Spring Boot)**: API RESTful para la gestión de productos.

2. **Frontend (React)**: Interfaz gráfica para interactuar con la API.
   
3. **Biblioteca Matemática (Java)**: Biblioteca reutilizable con operaciones matemáticas.

## Estructura del Proyecto


mi-proyecto/
├── backend/               # API REST con Spring Boot
├── frontend/              # Frontend con React
├── math-library/          # Biblioteca matemática en Java
└── README.md              # Descripción del repositorio


## Configuración
### Backend
1. Ve a la carpeta `backend/`.
2. Configura `application.properties` con tu base de datos.
3. Ejecuta el proyecto:
   
   mvn spring-boot:run
  

### Frontend
1. Ve a la carpeta `frontend/`.
2. Instala las dependencias:
  
   npm install
 
3. Ejecuta el proyecto:
   ```bash
   npm start
   

### Biblioteca Matemática
1. Ve a la carpeta `math-library/`.
2. Instala las dependencias:
   bash
   mvn clean install
   
3. Genera el archivo JAR para reutilizarlo en otros proyectos:
  
   mvn package
  

## Uso
- Accede al frontend en `http://localhost:3000`.
- Accede al backend en `http://localhost:8080/api`.

