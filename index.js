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
    chart.append('g').attr('transform', 'translate(0, 0)').call(yAxis)
    d3.selectAll('.myLine text').style('fill', '#fff')
    d3.selectAll('.myLine line').style('stroke', '#fff')
    d3.selectAll('.myLine path').style('stroke', '#fff')

    let items = []

    chartData.forEach((row) => {
        let index = 0
        Object.keys(row).forEach((key) => {
            if (key !== 'label') {
                if (items[index]) {
                    items[index].push([row.label, row[key], key, index])
                } else {
                    items[index] = [
                        [row.label, row[key], key, index]
                    ]
                }
                index++
            }
        })
    })
     let line = d3
        .line()
        .x(function (d) {
            return d[0]
        })
        .y(function (d) {
            return d[1]
        })

    const groups = chart.selectAll().data(items)

    const lines = groups
        .enter()
        .append('g')
        .selectAll()
        .data((d) => [d])

    lines
        .enter()
        .append('path')
        .attr('class', 'lines')
        .attr('d', function (d) {
            const row = d.map((item) => {
                const itemS = []
                itemS.push(xScale(item[0]))
                itemS.push(yScale(item[1]))
                return [...itemS]
            })
            return line(row)
        })
        .attr('stroke', (d, i) => '#4385F4')
        .attr('fill', 'none')
        .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
    
    const circles = groups
        .enter()
        .append('g')
        .attr('class', 'Gcircle')
        .selectAll()
        .data((d) => d)

    circles
        .enter()
        .append('circle')
        .attr('cx', function (d) {
            return xScale(d[0])
        })
        .attr('cy', function (d) {
            return yScale(d[1])
        })
        .attr('r', 4)
        .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
        .attr('fill', '#fff')
        .attr('stroke', 'rgba(56, 8, 228, .5)')

    const generateArea = d3
        .area()
        .x((d) => d[0])
        .y0((d) => d[1])
        .y1((d) => 400)
}
