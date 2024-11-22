<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let co2Data = [
    { year: 1980, co2: 338, temperature: 0.1 },
    { year: 1990, co2: 354, temperature: 0.3 },
    { year: 2000, co2: 369, temperature: 0.5 },
    { year: 2010, co2: 390, temperature: 0.7 },
    { year: 2020, co2: 414, temperature: 1.0 },
  ];

  onMount(() => {
  const margin = { top: 20, right: 50, bottom: 50, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select('#co2-temperature-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Scales
  const x = d3
    .scaleLinear()
    .domain(d3.extent(co2Data, (d) => d.year))
    .range([0, width]);

  const y1 = d3
    .scaleLinear()
    .domain([d3.min(co2Data, (d) => d.co2), d3.max(co2Data, (d) => d.co2)])
    .range([height, 0]);

  const y2 = d3
    .scaleLinear()
    .domain([d3.min(co2Data, (d) => d.temperature), d3.max(co2Data, (d) => d.temperature)])
    .range([height, 0]);

  // Tooltip
  const tooltip = d3
    .select('#co2-temperature-chart')
    .append('div')
    .style('position', 'absolute')
    .style('background', '#fff')
    .style('padding', '0.5rem')
    .style('border', '1px solid #ccc')
    .style('border-radius', '4px')
    .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')
    .style('pointer-events', 'none')
    .style('opacity', 0);

  // Axes
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format('d')));

  const leftAxis = svg
    .append('g')
    .call(d3.axisLeft(y2).tickSizeOuter(0))
    .style('color', 'tomato'); // Left Y axis (Temperature)

  const rightAxis = svg
    .append('g')
    .attr('transform', `translate(${width}, 0)`)
    .call(d3.axisRight(y1).tickSizeOuter(0))
    .style('color', 'steelblue'); // Right Y axis (CO2)

  // CO2 Line
  svg
    .append('path')
    .datum(co2Data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr(
      'd',
      d3
        .line()
        .x((d) => x(d.year))
        .y((d) => y1(d.co2))
    );

  // Temperature Line
  svg
    .append('path')
    .datum(co2Data)
    .attr('fill', 'none')
    .attr('stroke', 'tomato')
    .attr('stroke-width', 2)
    .style('stroke-dasharray', '5,5')
    .attr(
      'd',
      d3
        .line()
        .x((d) => x(d.year))
        .y((d) => y2(d.temperature))
    );

  // Add Circles for CO2 Data Points with Tooltip
  svg
    .selectAll('.co2-circle')
    .data(co2Data)
    .join('circle')
    .attr('class', 'co2-circle')
    .attr('cx', (d) => x(d.year))
    .attr('cy', (d) => y1(d.co2))
    .attr('r', 5)
    .attr('fill', 'steelblue')
    .on('mouseover', (event, d) => {
      tooltip
        .html(
          `<strong>Year:</strong> ${d.year}<br>
           <strong>CO₂ Levels:</strong> ${d.co2} ppm<br>
           <strong>Temperature Anomaly:</strong> ${d.temperature} °C`
        )
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 30}px`)
        .style('opacity', 1);
    })
    .on('mouseout', () => {
      tooltip.style('opacity', 0);
    });

  // Legend (Moved to 1/3 of the width)
  const legendXPosition = width / 3; // 1/3 of the graph's width
  const legend = svg
    .append('g')
    .attr('transform', `translate(${legendXPosition}, 20)`);

  legend
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', 'steelblue');

  legend
    .append('text')
    .attr('x', 20)
    .attr('y', 12)
    .style('font-size', '12px')
    .text('CO₂ Levels');

  legend
    .append('rect')
    .attr('x', 0)
    .attr('y', 20)
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', 'tomato');

  legend
    .append('text')
    .attr('x', 20)
    .attr('y', 32)
    .style('font-size', '12px')
    .text('Temperature Anomaly');
});


</script>

<section id="ghg-climate-change">
  <h2>The Connection Between GHGs and Climate Change</h2>
  <div id="co2-temperature-chart"></div>
  <p>
    This warming effect is the primary driver of climate change, causing disruptions in weather patterns, rising sea levels, and more extreme weather events. As global temperatures increase, ecosystems and human societies face greater challenges, including heatwaves, droughts, and flooding. The rapid rise in GHGs due to human activities has accelerated these changes, underscoring the urgent need for action to reduce emissions and mitigate climate impacts.
  </p>
</section>

<style>
  section {
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  h2 {
    text-align: center;
    color: #333;
    font-size: 1.8rem;
  }

  p {
    text-align: justify;
    line-height: 1.6;
  }

  #co2-temperature-chart {
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
