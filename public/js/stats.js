// REQUIRED IN STATS.HTML

// get all workout data from back-end
fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    populateChart(data);
  });


API.getWorkoutsInRange();


// generate color palette
function generatePalette() {
  const arr = [
    "#f2fefb",
    "#e2fcf4",
    "#c2f9e8",
    "#94f0d4",
    "#5cedc1",
    "#2de0aa",
    "#5cedc1",
    "#94f0d4",
    "#c2f9e8",
    "#e2fcf4",
    "#f2fefb",
  ]

  return arr;
};

// populate and render charts
function populateChart(data) {
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "#12e2a3",
          borderColor: "#12e2a3",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: false
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Day of Week",
              fontFamily: "'Roboto', sans- serif",
              fontStyle: "lighter"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Minutes of Exercise",
              fontFamily: "'Roboto', sans- serif",
              fontStyle: "lighter"
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "#F7FEFC",
            "#f2fefb",
            "#e2fcf4",
            "#c2f9e8",
            "#94f0d4",
            "#5cedc1",
            "#2de0aa",
          ],
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: "Pounds Lifted"
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Day of Week",
              fontFamily: "'Roboto', sans- serif",
              fontStyle: "lighter"
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Weight Lifted (lbs)",
              fontFamily: "'Roboto', sans- serif",
              fontStyle: "lighter"
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: "Excercises Performed"
      },
      legend: {
        display: true,
        position: "left",
        labels: {
          fontFamily: "'Roboto', sans- serif",
          fontStyle: "lighter"
        }
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: "Excercises Performed"
      },
      legend: {
        itemStyle: {
          width: 12
        },
        display: true,
        position: "right",
        labels: {
          fontFamily: "'Roboto', sans- serif",
          fontStyle: "lighter"
        }
      }
    }
  });
}

// get duration data
function duration(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });

  return durations;
}

// calculate total weight
function calculateTotalWeight(data) {
  let total = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      total.push(exercise.weight);
    });
  });

  return total;
}

// get workout names
function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  
  return workouts;
}
