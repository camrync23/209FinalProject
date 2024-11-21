<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import data from '../data/kgPerKgCo2.json'; // Adjust path if necessary
    
    let emissionsData = [];
    
    // Define custom colors for each category
    const categoryColors = {
      "Land use change": "#ff9999",  // Light Red
      "Animal Feed": "#66b3ff",      // Light Blue
      "Farm": "#99ff99",             // Light Green
      "Processing": "#ffcc99",       // Light Orange
      "Transport": "#ffccff",        // Light Purple
      "Packaging": "#c2c2f0",        // Light Blue-Violet
      "Retail": "#c2f0c2"            // Light Greenish
    };
    
    onMount(() => {
      const categories = [
        "Land use change", "Animal Feed", "Farm", "Processing", 
        "Transport", "Packaging", "Retail"
      ];
    
      let sums = {
        "Land use change": 0,
        "Animal Feed": 0,
        "Farm": 0,
        "Processing": 0,
        "Transport": 0,
        "Packaging": 0,
        "Retail": 0
      };
    
      data.forEach(food => {
        categories.forEach(category => {
          sums[category] += food[category] || 0;
        });
      });
    
      const averages = categories.map(category => ({
        label: category,
        value: sums[category] / data.length
      }));
    
      // Sort by value in descending order (largest to smallest)
      averages.sort((a, b) => b.value - a.value);
    
      emissionsData = averages;
    
      const width = 600;
      const height = 400;
      const radius = Math.min(width, height) / 2;
    
      const arc = d3.arc().innerRadius(0).outerRadius(radius);
      const pie = d3.pie().value(d => d.value).sort(null); // Remove sort for custom sorting
    
      const svg = d3.select("#emissions-pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);  // Keep the chart centered
    
      const arcs = svg.selectAll(".arc")
        .data(pie(emissionsData))
        .enter().append("g")
        .attr("class", "arc");
    
      // Create tooltip element
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("display", "none")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "4px")
        .style("pointer-events", "none");
    
      // Draw slices using custom colors
      arcs.append("path")
        .attr("d", arc)
        .style("fill", d => categoryColors[d.data.label])  // Apply custom color
        .on("mouseover", function(event, d) {
          tooltip.style("display", "block")
            .html(`<strong>${d.data.label}</strong><br>${d.data.value.toFixed(2)} kg CO2 per kg`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
  
          // Apply the pop-out effect by moving the slice
          d3.select(this).transition()
            .duration(300)
            .attr("transform", "translate(0, -20)"); // Move the slice outwards
        })
        .on("mousemove", function(event) {
          tooltip.style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", function() {
          tooltip.style("display", "none");
  
          // Reset the slice position
          d3.select(this).transition()
            .duration(300)
            .attr("transform", "translate(0, 0)"); // Reset slice position
        });
  
      // Ensure the whole chart fits when hovering by scaling down the chart
      svg.on("mouseover", function() {
        svg.transition()
          .duration(300)
          .attr("transform", `translate(${width / 2}, ${height / 2}) scale(0.9)`); // Scale down the chart
      }).on("mouseout", function() {
        svg.transition()
          .duration(300)
          .attr("transform", `translate(${width / 2}, ${height / 2}) scale(1)`); // Reset scale
      });
    });
  </script>  
  
  <section id="food-production">
    <h2>Why Food Production Matters</h2>
    <div class="content-wrapper">
      <!-- Hardcoded Legend -->
      <div id="legend-container">
        <div class="legend-item">
          <div class="legend-color" style="background-color: #ff9999;"></div>
          <span class="legend-label">Land use change</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #66b3ff;"></div>
          <span class="legend-label">Animal Feed</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #99ff99;"></div>
          <span class="legend-label">Farm</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #ffcc99;"></div>
          <span class="legend-label">Processing</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #ffccff;"></div>
          <span class="legend-label">Transport</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #c2c2f0;"></div>
          <span class="legend-label">Packaging</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #c2f0c2;"></div>
          <span class="legend-label">Retail</span>
        </div>
      </div>
  
      <div id="emissions-pie-chart"></div> <!-- Pie chart on the right side -->
    </div>
    <p>Food production contributes up to 30% of global GHG emissions, with significant variations across food types.</p>
  </section>
  
  <style>
    #emissions-pie-chart {
      margin: 1rem 0;
      display: flex;
      justify-content: center;
    }
  
    .content-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 20px;  /* Space between the pie chart and legend */
      flex-wrap: nowrap;  /* Prevent wrapping */
    }
  
    #legend-container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background-color: #f4f4f4;
      border-radius: 5px;
      width: 250px; /* Adjust width as needed */
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Optional shadow */
      margin-right: 20px; /* Space between legend and chart */
    }
  
    .legend-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  
    .legend-color {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  
    .legend-label {
      font-size: 14px;
      font-family: Arial, sans-serif;
    }
  </style>
  