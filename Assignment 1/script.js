var chosen_year = 2015

d3.csv('meteo.csv', function(data) {
    return {
        year: +data.year,
        month: data.month,
        day: data.day,
        temperature: data.temperature
    };
 }, 
 function(a) {
    var temp_by_year = a.filter(d => d.year === chosen_year)
    .map(d => ({
        month: d.month,
        temperature: d.temperature
    }));

    var avg_temp = d3.nest()
    .key(d => d.month)
    .rollup(v => d3.mean(v, d => d.temperature / 10))
    .entries(temp_by_year)

   console.log(avg_temp)
 }        
);