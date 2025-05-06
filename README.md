# Scrapper Maps

Scrapper Maps es una aplicación Node.js que utiliza Express para configurar un endpoint API que permite obtener coordenadas geográficas mediante el scraping de Google Maps usando Puppeteer.

---

## 📂 Estructura del Proyecto

```
scrapper-maps
├── src
│   └── index.js          # Aplicación principal de Express
├── Dockerfile             # Dockerfile para construir la aplicación
├── docker-compose.yml     # Configuración de Docker Compose
├── package.json           # Archivo de configuración de npm
├── package-lock.json      # Archivo de bloqueo para instalaciones consistentes
└── README.md              # Documentación del proyecto
```

---

## 🚀 Instrucciones de Configuración

### **1. Clonar el repositorio**
```bash
git clone <repository-url>
cd scrapper-maps
```

### **2. Instalar dependencias**
```bash
npm install
```

### **3. Ejecutar la aplicación**

#### **Opción 1: Ejecutar localmente**
```bash
npm start
```

#### **Opción 2: Ejecutar con Docker**
```bash
docker-compose up
```

---

## 📖 Uso

Para obtener coordenadas, envía una solicitud `GET` al siguiente endpoint:

```
GET /api/getcoordenadas?q=<address>
```

### **Parámetro**
- `<address>`: Dirección o ubicación que deseas buscar.

### **Ejemplo de solicitud**
```bash
GET http://localhost:4000/api/getcoordenadas?q=Eiffel+Tower
```

### **Respuesta exitosa**
```json
{
  "error": false,
  "message": "Coordenadas obtenidas con éxito",
  "data": {
    "latitud": "48.8588443",
    "longitud": "2.2943506"
  }
}
```

### **Errores posibles**
- **400**: Parámetro de búsqueda no proporcionado.
- **404**: No se pudieron encontrar las coordenadas.
- **500**: Error al iniciar el navegador o durante el scraping.

---

## 🐳 Configuración de Docker

### **Dockerfile**
El `Dockerfile` está configurado para:
- Instalar las dependencias necesarias para Puppeteer.
- Ejecutar la aplicación en un entorno de producción.

### **Docker Compose**
El archivo `docker-compose.yml` expone el puerto `4000` y configura la aplicación para reiniciarse automáticamente si falla.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir APIs.
- **Puppeteer**: Librería para control de navegadores automatizados.
- **Docker**: Contenerización de la aplicación.

---

## 📜 Licencia

Este proyecto está licenciado bajo la licencia MIT.