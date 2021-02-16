// 0: "  Year"
// 1: "Age"
// 2: "Tm"
// 3: "Pos"
// 4: "No."
// 5: "G"
// 6: "GS"
// 7: "QBrec"
// 8: "Cmp"
// 9: "Att"
// 10: "Cmp%"
// 11: "Yds"
// 12: "TD"
// 13: "TD%"
// 14: "Int"
// 15: "Int%"
// 16: "1D"
// 17: "Lng"
// 18: "Y/A"
// 19: "AY/A"
// 20: "Y/C"
// 21: "Y/G"
// 22: "Rate"
// 23: "QBR"
// 24: "Sk"
// 25: "Yds"
// 26: "NY/A"
// 27: "ANY/A"
// 28: "Sk%"
// 29: "4QC"
// 30: "GWD"
// 31: "AV"

// Classes
class Player {
  constructor(player_num, yds) {
    this.player_num = player_num;
    this.yds = yds;
    // this.tds = tds;
  }
  get_yds()
  {
    return this.yds;
  }
}

let g_data = [];

function get_csv(p_num)
{
  let csv = document.getElementById("csv" + p_num.toString()).value;
  console.log(csv);
  let csvString = csv.toString();
  var results = Papa.parse(csvString);
  console.log(results.meta.delimiter);
  console.log(results.data[0][7]);
  console.log(results.data.length);
  var yds = extract_yards(results.data);

  console.log("yds = " + yds);
  create_dataset(yds, p_num);
}

function random_color_gen()
{
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}



// pass in results.data
function extract_yards(json)
{
  return json[json.length - 1][11];
}

// I should push an object instead of p_num
function create_dataset(yds, p_num)
{
  data = 
  {
    label: 'Player',
    backgroundColor: random_color_gen(),
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 1,
    data: [
      yds
    ]
  }
  g_data.push(data);
  console.log(g_data);
}

function create_bar_chart()
{
  console.log(g_data);
  var barChartData = {
    labels: ['Yards', 'TDs', 'Comp %', '1Ds', 'QBR', 'Ints', 'Sacks'],
    datasets: [
      g_data[0],
      g_data[1]
    ]
  };
  
  var ctx = document.getElementById('myChart').getContext('2d');
  window.myBar = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      scales: {
        xAxes: [{
          
        }],
        yAxes: [{
          ticks: {
          // min: 0
          beginAtZero: true
          }
          
        }],
      },
      title: {
        display: true,
        text: 'QB Comparison (per game)'
      }
    }
  });
}


// line chart
/*
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});
*/

// bar 
/*
var barChartData = {
  labels: ['Yards per game', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'he',
      backgroundColor: 'rgb(255, 0, 0)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 1,
      data: [
        500
      ]
    }, 
    {
      label: 'ha 2',
      backgroundColor: 'rgb(0, 0, 255)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 1,
      data: [
        250
      ]
    }
  ]
};

var ctx = document.getElementById('myChart').getContext('2d');
window.myBar = new Chart(ctx, {
  type: 'bar',
  data: barChartData,
  options: {
    responsive: true,
    legend: {
      position: 'top',
    },
    scales: {
      xAxes: [{
        
      }],
      yAxes: [{
        ticks: {
        // min: 0
        beginAtZero: true
        }
        
      }],
    },
    title: {
      display: true,
      text: 'QB Comparison'
    }
  }
});
*/

		
	




