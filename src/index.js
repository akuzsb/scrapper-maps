import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const PORT = 4000;

app.get('/api/getcoordenadas', async (req, res) => {
    const address = req.query.q;
    if (!address) {
        return res.status(400).json({ error: true, message: 'Parámetro de búsqueda no proporcionado', data: null });
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: null
        });
    } catch (error) {
        console.error('Error al iniciar el navegador:', error);
        return res.status(500).json({ error: true, message: 'Error al iniciar el navegador', data: null });
    }

    try {
        const page = await browser.newPage();

        const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
        await page.goto(searchUrl);
        await page.waitForFunction('window.location.href.includes("@")');

        const url = await page.url();

        const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

        if (match) {
            const [_, lat, lng] = match;
            res.status(200).json({
                error: false,
                message: 'Coordenadas obtenidas con éxito',
                data: {
                    latitud: lat,
                    longitud: lng,
                }
            });
        } else {
            res.status(404).json({ error: true, message: 'No se pudieron encontrar las coordenadas', data: null });
        }
    } catch (error) {
        console.error('Error en el scraping:', error);
        res.status(500).json({ error: true, message: 'Error durante el scraping', data: null });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

// Middleware para manejar rutas no definidas
app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: 'Ruta no encontrada',
        data: null
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});