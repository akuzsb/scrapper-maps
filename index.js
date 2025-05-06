import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const PORT = 4000;

app.get('/api/getcoordenadas', async (req, res) => {
    const address = req.query.q;
    if (!address) {
        return res.status(400).json({ error: true, message: 'Parámetro de búsqueda no proporcionado', data: null });
    }

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null
    });

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
		console.log('Error en el scraping:', error);
        res.status(500).json({ error: true, message: 'Error durante el scraping', data: null });
    } finally {
        await browser.close();
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});