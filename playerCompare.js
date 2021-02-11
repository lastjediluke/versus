
var csvString = "";
function get_csv()
{
  let csv = document.getElementById("csv").value;
  console.log(csv);
  let csvString = csv.toString();
  var results = Papa.parse(csvString);
  console.log(results.meta.delimiter);
  console.log(results.data[0][7]);
  // console.log(results);
}




