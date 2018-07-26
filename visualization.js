const draw = _data => {
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

    var x = row => d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, width])(row[field]);

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
            console.log(this.__data__.id)
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
