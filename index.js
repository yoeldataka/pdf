const { createPDF } = require("./pdf-generator");
const data = {
    title: "TESTING HANDLEBARS DATA",
    date: "12/12/1212",
    name: "Yoel Martin Fornieles",
    age: 37,
    birthdate: "25/02/1986",
    course: "Creating pdfs",
    obs: "Testing handlebars and pdf integration",
};

(async () => {
    console.log("before start");

    const pdf = await createPDF(data);
    console.log("done");
    console.log(pdf);
    console.log("after start");
})();
