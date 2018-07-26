import * as d3 from 'd3';

window.d3 = d3; // For using on chrome console

const draw = _data => {

    // transform data
    const field = 'cost'
    const costs = _data.map(row => ({
        cost: parseInt(row.totalCost),
        id: row.id
    }));
    costs.sort((x, y) => d3.descending(x[field], y[field]));
    const data = costs;
    const maxValue = d3.max(data, row => row[field]);

    var width = 420,
        barHeight = 5;

    // x is a function that convert from values, to pixels
    var x = row => d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, width])(row[field]);

    // set the properties of the svg chart
    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data, row => row.id)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })

    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1)
        .on("mouseover", function(){
            d3.select(this).transition().duration(300)
                .style("fill", "#FFD700");
        })
        .on("mouseout", function(){
            d3.select(this).transition().duration(300)
                .style("fill", "#333");
        })

}

const onDomLoaded = () => {
    d3.csv('./h2020.csv').then(draw);
}
document.addEventListener("DOMContentLoaded", onDomLoaded);
