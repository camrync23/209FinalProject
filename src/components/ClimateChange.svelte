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
      const margin = { top: 20, right: 30, bottom: 50, left: 50 };
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
  
      // Axes
      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format('d')));
  
      svg.append('g').call(d3.axisLeft(y1));
  
      svg
        .append('g')
        .attr('transform', `translate(${width}, 0)`)
        .call(d3.axisRight(y2));
  
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
  
      // Labels
      svg
        .append('text')
        .attr('x', -margin.left)
        .attr('y', -10)
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .text('CO₂ Levels (ppm)');
  
      svg
        .append('text')
        .attr('x', width + margin.right)
        .attr('y', -10)
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .text('Temperature Anomaly (°C)');
    });
  </script>
  
  <section id="ghg-climate-change">
    <h2>The Connection Between GHGs and Climate Change</h2>
    <div id="co2-temperature-chart"></div>
    <p>
      Human activities have significantly increased GHG levels, causing global warming
      and extreme weather events.
    </p>
  </section>
  
  <style>
    section {
      margin-bottom: 2rem;
    }
  
    #co2-temperature-chart {
      margin: 1rem 0;
      text-align: center;
    }
  </style>
  
  