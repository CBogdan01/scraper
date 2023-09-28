## Application Setup Guide

This guide provides step-by-step instructions on how to set up and run the provided Node.js application. The application is a web scraping tool that extracts various types of data from a given URL and optionally performs sentiment analysis.

### Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

Follow these steps to install and set up the application:

1. **Clone the Repository**:
   Clone the repository containing the application code to your local machine:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install Dependencies**:
   Use npm to install the required dependencies specified in the `package.json` file:

   ```bash
   npm install
   ```

### Configuration

Before running the application, you can configure some options in the `config.js` file:

- `port`: The port on which the application will listen. By default, it's set to `3000`.
- `defaultScrapeOptions`: An object that defines the default scraping options for headings, paragraphs, images, and links. You can customize these options according to your needs.

### Running the Application

To start the application, run the following command from the project's root directory:

```bash
npm start
```

The application will start and listen on the specified port (default is `3000`).

### Making API Requests

You can use any API testing tool (e.g., [Postman](https://www.postman.com/)) or create HTTP requests programmatically to interact with the application. Here's how to use the API:

- **Endpoint**: `POST /scrape`

- **Request Body**:
  - `url` (string, required): The URL of the web page you want to scrape.
  - `scrapeOptions` (object, optional): An object that specifies which types of data to scrape (headings, paragraphs, images, links).
  - `sentiment` (boolean, optional): Set to `true` if you want to perform sentiment analysis on the scraped text.

- **Response**: The API will respond with JSON data containing the scraped content and, optionally, sentiment analysis results and word count.

### Example API Request

Here's an example API request using `curl`:

```bash
curl -X POST http://localhost:3000/scrape -H "Content-Type: application/json" -d '{
  "url": "https://example.com",
  "scrapeOptions": {
    "headings": true,
    "paragraphs": true,
    "images": false,
    "links": true
  },
  "sentiment": true
}'
```

### Standout Features

- **Web Scraping**: The application uses Puppeteer, a headless browser, to scrape data from web pages.
- **Modular Code**: The code is organized into functions and follows best practices for maintainability.
- **Sentiment Analysis**: It can analyze the sentiment of scraped text using the Sentiment library.
- **Configurability**: You can customize default scraping options in the configuration.

### Learning Experience

Developing this application involved several key learning experiences:

- **Web Scraping with Puppeteer**: Learning how to use Puppeteer to scrape data from websites efficiently and reliably was a valuable skill.

Overall, developing this application allowed me to gain practical experience in web scraping, API development, and asynchronous JavaScript, and I hope this documentation and guide are helpful to users looking to utilize this tool for their web scraping needs.
