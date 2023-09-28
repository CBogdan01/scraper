import express from 'express';
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer';
import Sentiment from 'sentiment';
import wordCount from 'word-count';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sentiment = new Sentiment();

// Helper functions to scrape specific types of data
async function scrapeImages(page, selector) {
    return page.$$eval(selector, elements =>
        elements.map(element => element.getAttribute('src'))
    );
}

async function scrapeLinks(page, selector) {
    return page.$$eval(selector, elements =>
        elements
            .map(element => [
                element.getAttribute('href'),
                element.textContent.trim()
            ])
            .filter(link => link[0] && link[1])
    );
}

async function scrapeText(page, selector) {
    return page.$$eval(selector, elements =>
        elements.map(element => element.textContent)
    );
}


app.post('/scrape', async (req, res) => {
    const { url, scrapeOptions = {}, sentiment: includeSentiment } = req.body;

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle0' });

        const selectors = {
            headings: 'h3',
            paragraphs: 'p',
            images: 'img',
            links: 'a',
        };

        const scrapedData = {};

        for (const key in scrapeOptions) {
            if (scrapeOptions[key]) {
                if (key === 'images') {
                    scrapedData[key] = await scrapeImages(page, selectors[key]);
                } else if (key === 'links') {
                    scrapedData[key] = await scrapeLinks(page, selectors[key]);
                } else {
                    scrapedData[key] = await scrapeText(page, selectors[key]);
                }
            }
        }

        await browser.close();

        const textObj = {
            headings: scrapedData.headings,
            paragraphs: scrapedData.paragraphs,
            links: scrapedData.links.map(link => link[1]),
        }
        const allText = Object.values(textObj)
            .flat()
            .join(' ');

        if (includeSentiment) {
            scrapedData.sentiment = sentiment.analyze(allText, { language: 'en' });
        }

        scrapedData.wordCount = wordCount(allText);

        res.json(scrapedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while scraping the webpage.' });
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
