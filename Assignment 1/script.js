var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];

var svg = d3.select("body").append("svg")
          .attr("height","100%")
          .attr("width","100%");

svg.selectAll("rect")
    .data(dataArray)
    .enter().append("rect");
