const draw = _data => {
    const costs = _data.map(row => parseInt(row.totalCost));
    costs.sort(d3.descending);
    const data = costs;


    var width = 420,
        barHeight = 5;

    var x = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, width]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
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
