var margin = {
    top: 100,
    bottom: 100,
    left: 50,
    right: 50
}

var chosen_year = '2011'

d3.csv('meteo.csv', function(data) {
    return {
        year: data.year,
        month: data.month,
        day: data.day,
        temperature: data.temperature
    };
 }, 
 function(d) {
     var temp_by_year = d.filter(e => e.year === chosen_year)
     .map(d => ({
         month: d.month,
         temperature: d.temperature
     }));

     var temp_avg = d3.nest()
     .key(d => d.month)
     .rollup(v => d3.mean(v, e => e.temperature / 10))
     .entries(temp_by_year)

     console.log(temp_avg)
    }
)