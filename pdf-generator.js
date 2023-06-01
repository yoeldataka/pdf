const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

const createAndFillHBTemplate = (data) => {
    var templateHtml = fs.readFileSync(
        path.join(process.cwd(), "template2.html"),
        "utf8"
    );
    return encodeURIComponent(handlebars.compile(templateHtml)(data));
};

const createPdfFromUrl = async (url, options) => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: false,
    });

    var page = await browser.newPage();

    await page.goto(url, {
        waitUntil: "networkidle0",
    });

    const buffer = await page.pdf(options);
    await browser.close();
    return buffer;
};

async function createPdfFromHBTemplate(data) {
    const html = createAndFillHBTemplate(data);
    var url = `data:text/html;charset=UTF-8,${html}`;

    var milis = new Date();
    milis = milis.getTime();
    var pdfPath = path.join(__dirname + "/pdf", `${data.name}-${milis}.pdf`);

    //https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
    var options = {
        width: "780",
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "10px",
            bottom: "30px",
        },
        printBackground: true,
        path: pdfPath,
    };

    const pdfBuffer = await createPdfFromUrl(
        "https://www.mtggoldfish.com",
        options
    );

    return pdfBuffer;
}

module.exports = { createPdfFromHBTemplate };
