import d3 from 'd3';

var chartData = [25, 50, 25];
var colorScale = d3.scale.category10([0, 1, 2, 3]);
var pieChart = d3.layout.pie().sort(null);

var newArc = d3.svg.arc();
newArc.outerRadius(170).innerRadius(40);

var path = d3.select("svg")
    .append("g")
    .attr("transform", "translate(250,190)")
    .selectAll("path")
    .data(pieChart(chartData))
    .enter()
    .append("path")
    .attr("d", newArc)
    .style("fill", function (d, i) {
        return colorScale(i)
    })
    .style("opacity", .5)
    .style("stroke", "black")
    .style("stroke-width", "2px")
    .each(function (d) {
        this._current = d;
    });

var D3Component = {
    updatePieChart: function (event) {
        event.preventDefault();

        var africanInput = document.getElementById("africanInput").value.trim();
        var americanInput = document.getElementById("americanInput").value.trim();
        var europeanInput = document.getElementById("europeanInput").value.trim();

        var chartData = [Number(africanInput), Number(americanInput), Number(europeanInput)];

        path.data(pieChart(chartData))
            .transition()
            .duration(1000)
            .attr("d", newArc)
            .attrTween("d", arcTween);

        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return newArc(i(t));
            };
        }
    },

    inputHandler: function (event) {
        var africanInput = document.getElementById("africanInput").value.trim();
        var americanInput = document.getElementById("americanInput").value.trim();
        var europeanInput = document.getElementById("europeanInput").value.trim();

        try {
            if ((!isNaN(parseInt(africanInput)) && parseInt(africanInput) != 0) && (!isNaN(parseInt(americanInput))
                && parseInt(americanInput) != 0) && (!isNaN(parseInt(europeanInput)) && parseInt(europeanInput) != 0)) {
                document.getElementById("submitVlc").disabled = false;
            } else {
                document.getElementById("submitVlc").disabled = true;
                throw new Error("Input fields must contain numerical value");
            }

        } catch (error) {
            console.log(error);
        }
    }
};

document.getElementById("submitVlc").onclick = D3Component.updatePieChart;
document.getElementById("africanInput").onchange = D3Component.inputHandler;
document.getElementById("americanInput").onchange = D3Component.inputHandler;
document.getElementById("europeanInput").onchange = D3Component.inputHandler;


export default D3Component;
