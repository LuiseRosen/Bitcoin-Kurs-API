const API_KEY = 'XG1J43R5971Y41AD'; // bei wichtigen Variablen kann man Großbuchstaben statt Camelcase verwenden
let month = ['2021-08-31', '2021-09-30','2021-10-31','2021-11-30','2021-12-31','2022-01-31','2022-02-28','2022-03-31','2022-04-30','2022-05-31','2022-06-30','2022-07-31','2022-08-31','2022-09-30','2022-10-31','2022-11-30','2022-12-31','2023-01-31','2023-02-28','2023-03-31','2023-04-30','2023-05-31','2023-06-30','2023-07-31','2023-08-31','2023-09-30','2023-10-31','2023-11-30','2023-12-31','2024-01-31','2024-02-29','2024-03-31'];
let course = [];

async function init() {
    await loadCourse();
    await loadMonthlyCourse(); // await weil wir wollen nicht den chart laden bevor die Daten dafür geladen wurden
    renderChart(); 
}

async function loadCourse() {
    let url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=' + API_KEY; // man könnte auch statt + API_KEY ``benutzen und dann am Schluss der URL ${API_KEY} einfügen
    let response = await fetch(url); // fetch: wir geben eine URL rein und kriegen Daten als response von der URL. await geht nur in einer async function!
    let responseAsJson = await response.json();
    let currentCourse = (Math.round(responseAsJson['Realtime Currency Exchange Rate']['5. Exchange Rate'])); // Math.round() rundet auf ganze Zahlen
    document.getElementById('course').innerHTML = `<b>${currentCourse} €</b>`;
}

async function loadMonthlyCourse() {
    let url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=' + API_KEY;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let monthlyCourse = responseAsJson['Time Series (Digital Currency Monthly)'];
    //console.log(responseAsJson['Time Series (Digital Currency Monthly)']['2021-08-31']['1a. open (EUR)']);
    
    for (let i = 0; i < month.length; i++) {
        let courseEachMonth = Math.round(monthlyCourse[month[i]]['1a. open (EUR)']);
        course.push(courseEachMonth);
    }
}