function renderChart() {
    const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: month, // Daten aus dem Array month
      datasets: [{
        label: 'Bitcoin-Kurs in €',
        data: course, // Daten aus dem Array course
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
