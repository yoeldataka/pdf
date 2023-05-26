const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

async function createPDF(data) {
    var templateHtml = fs.readFileSync(
        path.join(process.cwd(), "template2.html"),
        "utf8"
    );
    var template = handlebars.compile(templateHtml);
    var html = template(data);
    html = encodeURIComponent(html);

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

    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: false,
    });

    var page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
        waitUntil: "networkidle0",
    });

    const buffer = await page.pdf(options);
    await browser.close();
    return page;
}

module.exports = { createPDF };
