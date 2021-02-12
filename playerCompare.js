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
}

jared.get_yds();

// pass in results.data
function extract_yards(json)
{
  return json[json.length - 1][11];
}

// 


// line chart
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


		
	




