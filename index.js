const { createPDF } = require("./pdf-generator");
const data = {
    title: "A new Brazilian School",
    date: "05/12/2018",
    name: "Rodolfo Luis Marcos",
    age: 28,
    birthdate: "12/07/1990",
    course: "Computer Science",
    obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.",
};

(async () => {
    console.log("before start");

    const pdf = await createPDF(data);
    console.log("done");
    console.log(pdf);
    console.log("after start");
})();
