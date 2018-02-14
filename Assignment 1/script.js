var svg = d3.select('svg')
    margin = {
        top: 20, 
        bottom: 30,
        right: 20,
        left: 40
    }
    width = +svg.attr('width') - margin.left - margin.right
    height = +svg.attr('height') - margin.top - margin.bottom

var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);
    y = d3.scaleLinear()
        .rangeRound([height, 0]);

var g = svg.append('g')
        .attr('transform', `translate( ${margin.left}, ${margin.top})`);

var chosen_year = 2015

d3.csv('meteo.csv', 
function(data) {
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

    x.domain(avg_temp.map(d => d.key));
    y.domain([0, d3.max(avg_temp, d => d.value)]);

    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(10, 's'))
     .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Average')

    g.selectAll(".bar")
    .data(avg_temp)
    .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); });
   
 }        
);