var svg = d3.select('svg')
    margin = {
        top: 20, 
        bottom: 30,
        right: 20,
        left: 40
    }
    width = +svg.attr('width') - margin.left - margin.right
    height = +svg.attr('height') - margin.top - margin.bottom

var xScale = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.1);
    yScale = d3.scaleLinear()
            .rangeRound([height, 0]);

var g = svg.append('g')
        .attr('transform', `translate( ${margin.left}, ${margin.top})`);

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

    var year_min = d3.min(a, d => d.year)
        year_max = d3.max(a, d => d.year)
        chosen_year = year_min

    var temp_by_year = a.filter(d => d.year === chosen_year)
                        .map(d => ({
                            month: d.month,
                            temperature: d.temperature
                        }));
    
    svg.append('text')
        .attr("class", "title")
        .attr("transform", "translate(100,0)")
        .attr("x", -30)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text(chosen_year);


    var avg_temp = d3.nest()
                    .key(d => d.month)
                    .rollup(v => d3.mean(v, d => d.temperature / 10))
                    .entries(temp_by_year)

    xScale.domain(avg_temp.map(d => d.key));
    yScale.domain([0, d3.max(avg_temp, d => d.value)]);

    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(yScale).ticks(10, 's'))
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
        .attr("x", function(d) { return xScale(d.key); })
        .attr("y", function(d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.value); });

    g.selectAll(".bartext")
    .data(avg_temp)
    .enter()
    .append("text")
    .attr("class", "bartext")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr('font-size', '14')
    .attr("fill", 'rgba(0, 0, 0, 0.5)')
    .attr("x", function(d) {
        return xScale(d.key) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
        return yScale(d.value + 0.2);
    })
    .text(d => d.value.toFixed(1));





    
 }        
);