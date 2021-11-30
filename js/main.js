var data;
var newData = [];

document.addEventListener('input', function() {
    d3.select('#my_dataviz').selectAll('*').remove();
    drawBarchart();
});

document.addEventListener('DOMContentLoaded', function() {

    Promise.all([d3.csv('data/mc1-reports-data.csv', (dt) => {
            return { values: dt }
        })])
        .then(function(values) {
            console.log(values);
            console.log('loaded mc1-reports-data');
            data = values[0];
            console.log(values[0]);
            d3.select('#my_dataviz').selectAll('*').remove();
            getData();
            drawBarchart();
        });
});

function isDataMissing(v) {
    if (v) {
        return true;
    } else {
        if (v === 0) {
            return true;
        } else {
            return false;
        }
    }
}

function getData() {
    var real = 0,
        missing = 0;
    data.forEach(e => {
        if (isDataMissing(e["values"]["time"])) {
            real++;
        } else {
            missing++;
        }
        if (isDataMissing(e["values"]["buildings"])) {
            real++;
        } else {
            missing++;
        }
        if (isDataMissing(e["values"]["location"])) {
            real++;
        } else {
            missing++;
        }
        if (isDataMissing(e["values"]["medical"])) {
            real++;
        } else {
            missing++;
        }
        if (isDataMissing(e["values"]["power"])) {
            real++;
        } else {
            missing++;
        }
        if (isDataMissing(e["values"]["roads_and_bridges"])) {
            real++;
        } else {
            missing++;
        }
        if (isDataMissing(e["values"]["sewer_and_water"])) {
            real++;
        } else {
            missing++;
        }
        if (isDataMissing(e["values"]["shake_intensity"])) {
            real++;
        } else {
            missing++;
        }
    });
    console.log(real);
    console.log(missing);

    var temp = { "title": "Reported", "value": real };
    var temp1 = { "title": "Missing", "value": missing };
    newData[0] = temp;
    newData[1] = temp1;
    console.log(newData);
}

function drawBarchart() {

    var margin = { top: -10, right: 70, bottom: 70, left: 60 },
        width = 1000 - margin.left - margin.right,
        height = 720 - margin.top - margin.bottom;

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    // X
    var x = d3.scaleBand()
        .domain(newData.map(function(d) { return d.title; }))
        .range([0, width - 100])
        .padding(0.5);

    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + height + ")")
        .call(d3.axisBottom().scale(x));

    svg.append("text")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("font-weight", "600")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", height - 200)
        .attr("y", height + 40)
        .text("Data points");

    // Y
    var y = d3.scaleLinear()
        .domain([0, 800000])
        .range([height, 10]);
    svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft().scale(y));

    svg.append("text")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("font-weight", "600")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("x", -300)
        .attr("y", 12)
        .attr("transform", "rotate(-90)")
        .text("Data-point Count");
    console.log()
        //Bars
    svg.selectAll("mybar")
        .data(newData)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.title) + margin.left; })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "green")

}