    let year1Data = data.slice(0, 12);
    year1Data = year1Data.map((v) => {
        return {
            label: v.Month.split('-')[1],
            value: v.Sales
        };
    })
    let year2Data = data.slice(12, 24);
    year2Data = year2Data.map((v) => {
        return {
            label: v.Month.split('-')[1],
            value: v.Sales
        };
    })
    let year3Data = data.slice(24, 36);
    year3Data = year3Data.map((v) => {
        return {
            label: v.Month.split('-')[1],
            value: v.Sales
        };
    })
    console.log("year1Data = ", year1Data)
    console.log("year2Data = ", year2Data)
    console.log("year3Data = ", year3Data)


// render chart

function renderChart(chartData, year) {
    var width = 450
    var height = 480
    var margin = 20

    var svg = d3
        .select('.myLine')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', '#1a3055')

    var chart = svg.append('g').attr('transform', `translate(${margin * 2}, ${margin})`)

    var xScale = d3
        .scaleBand()
        .range([0, 400])
        .domain(chartData.map((s) => s.label))

    var yScale = d3.scaleLinear().range([400, 0]).domain([0, 600])

    const xAxis = d3.axisBottom(xScale)
    chart.append('g').attr('class', 'xAxis').attr('transform', `translate(0, ${400})`).call(xAxis)
    const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickFormat((d) => {
            return d;
        })

    d3.select('.xAxis')
        .append('text')
        .attr('x', 400 / 2 - 12)
        .attr('y', 0)
        .attr('dy', 45)
        .style('font-size', '24px')
        .text(`${year}`)
