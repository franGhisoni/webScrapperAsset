import puppeteer from 'puppeteer';
import { Filters } from '../Filters';
import { ColumnIds } from './ColumnsIds';




export const scrapZonaprop = async (req: Filters): Promise<ColumnIds[]> => {
    const { tipos_de_propiedad, tipos_de_transaccion,lista_de_barrios, m2} = req;
    const link = `https://www.zonaprop.com.ar/${tipos_de_propiedad}-${tipos_de_transaccion}-${lista_de_barrios}-${m2}.html`;
                    
    let browser;
    let elements: ColumnIds[] = [];

    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(link);
        await page.waitForSelector('.postings-container');

        const rawElements = await page.evaluate(() => {
            const products = Array.from(document.querySelectorAll('.PostingCardLayout-sc-i1odl-0'));
            return products.map(p => ({
                link: p.getAttribute('data-to-posting') || '',
            }));
        });

        console.log('raw', rawElements);

        for (const element of rawElements) {
            if (!element.link) continue;
            await page.goto(`https://www.zonaprop.com.ar${element.link}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            const tituloElement = await page.$('.title-type-sup-property, .title-h1-development');
            const titulo = tituloElement ? await page.evaluate(el => el.textContent?.trim(), tituloElement) : '';
            const precioRaw = await page.$eval('.price-value span span', el => el.textContent?.trim() || '');
            const precio = parseFloat(precioRaw.replace(/[A-Z ,\.]+/g, ''));
            const moneda = precioRaw.replace(/[0-9 ,\.]+/g, '');

            const m2 : number= await page.$$eval('#section-icon-features-property li', elements => {
                const li = elements.find(el => el.textContent?.includes('m² tot.'));
                if (li) {
                    const match = li.textContent?.match(/\d+/g);
                    return match ? Number(match.join('')) : 0;
                }
                return 0;
            }); 

            const m2Cubiertos: number = await page.$$eval('#section-icon-features-property li', elements => {
                const li = elements.find(el => el.textContent?.includes('m² cub.') || el.textContent?.includes('m² cubiert') || el.textContent?.includes('m² cubierto') || el.textContent?.includes('m² cubierta') || el.textContent?.includes('m² cubiertos'));
                if (li) {
                    const text = li.textContent || '';
                    const match = text.match(/[-+]?\b\d+\b/g);
                    if (match) {
                        const startIndex = text.indexOf(match[0]);
                        const endIndex = startIndex + match[0].length;
                        const numberString = text.substring(startIndex, endIndex).match(/[-+]?\b\d+\b/)?.[0] || '';
                        return parseFloat(numberString);
                    }
                }
                return 0;
            });
            

            const ubicacion = await page.$eval('.section-location-property h4', el => el.textContent?.trim() || '');
            const descripcion = await page.$eval('#longDescription div', el => el.textContent?.trim() || '');
            const url = `https://www.zonaprop.com${element.link}`;
            const servicios = null;

            const adicional = await page.$$eval('.sc-hwdzOV span', elements => elements.map(el => el.textContent?.trim() || ''));
            const fechaDePublicacionTimestamp = await page.$eval('.view-users-container div div p', el => {
                const text = el.textContent?.trim() || '';
                const numeroDeDias = parseInt(text.replace(/\D/g, ''), 10);
                const fechaActual = new Date().getTime();
                const fechaPublicacion = fechaActual - (numeroDeDias * 24 * 60 * 60 * 1000);
                return fechaPublicacion;
            });
            const fechaDePublicacion = new Date(fechaDePublicacionTimestamp);

            const publicador = await page.$eval('.InfoName-sc-orxlzl-4', el => el.textContent?.trim() || '');
            const alternativo = null;
            elements.push({
                "Titulo": String(titulo),
                "Precio": precio.toString(),
                "Moneda": moneda,
                "M2": m2 || 0,
                "M2Cubiertos": 0,
                "Ubicacion": ubicacion,
                "Adicional": String(adicional),
                "Descripcion": descripcion,
                "Alternativo": String(alternativo),
                "URL": url,
                "Operacion": String(tipos_de_transaccion),
                "FechaDePublicacion": String(fechaDePublicacion),
                "Publicador": publicador
            });
            console.log(
                "precio", precio.toString() || "0",
                "Moneda", moneda,
                "titulo", titulo,
                "m2", Number(m2) || 1,
                "m2Cubiertos",m2Cubiertos,
                "ubicacion", ubicacion,
                "adicional", adicional,
                "descripcion", descripcion,
                "alternativo", alternativo,
                "url", url,
                "servicios", servicios,
                "fechaDePublicacion", fechaDePublicacion,
                "publicador", publicador
            );

            await page.goBack();

             

        }
    } catch (error) {
        console.error('Error in scrapZonaprop:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
    return elements
};

