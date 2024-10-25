const server = require("express");
const app = server();
const port = 5000;
const getPDF = require("pdf-puppeteer");
const path = require("path");
const fs = require("node:fs");

app.use('/css', server.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', server.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', server.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use("/htmlfile",server.static(path.join(__dirname, "page.html")));


app.get("/", (req, res) => {
  res.send("Hello World!");
});




const myHeader = `<h1 style="background-color: skyblue;">Header</h1>`;




app.get("/get-pdf", (req, res) => {
    const myHTML = fs.readFileSync(path.join(__dirname, "page.html"), "utf8");

    //console.log(JSON.stringify(myHTML));
    const options = {
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: myHeader,
        footerTemplate: "<h1>Footer</h1>",
        zoomFactor: 0.75,
        waitUntil: "networkidle0",
        margin: {
            top: "40px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    }
    const myCallBack = (pdf) => { 
        res.setHeader("Content-Type", "application/pdf");
        //res.setHeader("Content-Disposition", "attachment; filename=myPDF.pdf");
        res.send(pdf);
    }
    getPDF(myHTML, myCallBack, options);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

