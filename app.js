const container = document.querySelector('main');
const width = 400, height = 100

const graphs = {
    linear: t => t,
    easeInQuart: t => t ** 4,
    easeOutQuart: t => 1 - (--t) * t ** 3,
    easeInOutQuart: t => t < 0.5 ? 8 * t ** 4 : 1 - 8 * (--t) * t ** 3,
    easeInQuint: t => t ** 5,
    easeOutQuint: t => 1 + (--t) * t ** 4
}

function drawGraph(graph, from = 0, to = 1, step = 0.01) {
    const xmlns = "http://www.w3.org/2000/svg"
    const svg = document.createElementNS(xmlns, 'svg');
    const data = [];

    svg.setAttribute('width', width);
    svg.setAttribute('height', height);

    for (let i = from; i <= to; i += step) {
        data.push({x: i, y: graph(i)})
    }

    function scale(domain, range) {
        const m = (range[1] - range[0]) / (domain[1] - domain[0]);
        return num => range[0] + m * (num - domain[0]);
    }

    const x = scale([0, Math.max(...data.map(d => d.x))], [0, width]);
    const y = scale([0, Math.max(...data.map(d => d.y))], [height, 0]);

    const points = data.map(d => `${x(d.x)},${y(d.y)}`).join(' ');

    // Graph line
    const graphLine = document.createElementNS(xmlns, 'polyline');
    graphLine.setAttribute('points', points);

    // X axis
    const xAxis = document.createElementNS(xmlns, 'line');
    xAxis.setAttribute('x1', 0);
    xAxis.setAttribute('x2', width);
    xAxis.setAttribute('y1', height);
    xAxis.setAttribute('y2', height);
    const xGroup = document.createElementNS(xmlns, 'g');
    xGroup.setAttribute('transform', `translate(0, ${height + 20})`)
    for (let i = from; i < to; i += to / 10) {
        const xText = document.createElementNS(xmlns, 'text');
        xText.innerHTML = i.toFixed(2);
        xText.setAttribute('x', x(i))
        xGroup.append(xText);
    }

    // Y axis
    const yAxis = document.createElementNS(xmlns, 'line');
    yAxis.setAttribute('x1', 0);
    yAxis.setAttribute('x2', 0);
    yAxis.setAttribute('y1', height);
    yAxis.setAttribute('y2', 0);
    const yGroup = document.createElementNS(xmlns, 'g');
    yGroup.setAttribute('transform', `translate(-40, 0)`)
    for (let i = from; i < to; i += to / 6) {
        const yText = document.createElementNS(xmlns, 'text');
        yText.innerHTML = i.toFixed(2);
        yText.setAttribute('y', y(i))
        yGroup.append(yText);
    }

    // Adding elements
    svg.append(xAxis);
    svg.append(yAxis);
    svg.append(xGroup);
    svg.append(yGroup);

    svg.append(graphLine);
    container.append(svg);

    // Add graph line styles for animation
    graphLine.style.strokeDasharray = graphLine.getTotalLength();
    graphLine.style.strokeDashoffset = 0;
}

window.onload = () => {
    drawGraph(graphs.linear)
    drawGraph(graphs.easeInQuart)
    drawGraph(graphs.easeOutQuart)
    drawGraph(graphs.easeInQuint)
    drawGraph(graphs.easeOutQuint)
    drawGraph(graphs.easeInOutQuart)
}
