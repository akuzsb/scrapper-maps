FROM node:22-slim

# Establecer entorno de producción para evitar devDependencies si no se necesitan
ENV NODE_ENV=production

# Instalar dependencias necesarias para Puppeteer/Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxshmfence1 \
    libgbm1 \
    xdg-utils \
    --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos del proyecto
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Exponer el puerto si tu app lo requiere
EXPOSE 4000

# Comando de inicio
CMD ["npm", "start"]
