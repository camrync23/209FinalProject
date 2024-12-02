<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import data from '../data/kgPerKgCo2.json'; // Adjust path if necessary

  let emissionsData = [];
  let selectedCategory = "Click on a section";
  let selectedDescription = "to see what activity contributes to the environmental footprint.";
  let selectedPercentage = "";
  let selectedValue = "";

  const categoryDetails = {
    "Land use change": "Emissions from deforestation or land conversion for agriculture.",
    "Animal Feed": "Emissions related to producing feed for livestock.",
    "Farm": "Emissions from on-farm activities like soil management and livestock digestion.",
    "Processing": "Emissions from turning raw products into consumable goods.",
    "Transport": "Emissions from moving food from farms to processing centers and markets.",
    "Packaging": "Emissions from creating and using food packaging.",
    "Retail": "Emissions from storing and selling food in stores.",
  };

  const categoryColors = {
    "Land use change": "#ff9999",
    "Animal Feed": "#66b3ff",
    "Farm": "#99ff99",
    "Processing": "#ffcc99",
    "Transport": "#ffccff",
    "Packaging": "#c2c2f0",
    "Retail": "#c2f0c2",
  };

  onMount(() => {
    const categories = Object.keys(categoryDetails);

    let sums = categories.reduce((acc, category) => ({ ...acc, [category]: 0 }), {});

    data.forEach(food => {
      categories.forEach(category => {
        sums[category] += food[category] || 0;
      });
    });

    const totalEmissions = Object.values(sums).reduce((acc, value) => acc + value, 0);

    const averages = categories.map(category => ({
      label: category,
      value: sums[category] / data.length,
      percentage: ((sums[category] / totalEmissions) * 100).toFixed(1),
      description: categoryDetails[category],
    }));

    averages.sort((a, b) => b.value - a.value);

    emissionsData = averages;

    const width = 700;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const pie = d3.pie().value(d => d.value).sort(null);

    const svg = d3.select("#emissions-pie-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs = svg.selectAll(".arc")
      .data(pie(emissionsData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .style("fill", d => categoryColors[d.data.label])
      .style("cursor", "pointer")
      .on("click", function (event, d) {
        selectedCategory = d.data.label;
        selectedDescription = d.data.description;
        selectedPercentage = d.data.percentage;
        selectedValue = d.data.value.toFixed(2);

        arcs.selectAll("path").attr("transform", "translate(0, 0)");

        const [x, y] = arc.centroid(d);
        d3.select(this)
          .transition()
          .duration(300)
          .attr("transform", `translate(${x * 0.1}, ${y * 0.1})`);
      });

    arcs.append("text")
      .attr("transform", d => {
        const [x, y] = arc.centroid(d);
        return `translate(${x}, ${y})`;
      })
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", d => {
        const color = d3.color(categoryColors[d.data.label]);
        return color && color.luminance() > 0.5 ? "#333" : "#fff";
      })
      .text(d => `${d.data.percentage}%`);
  });
</script>

<section id="food-production">
  <h2>Why Food Production Matters</h2>

  <!-- Key Points Section -->
  <div class="key-points">
    <h3>Key Points</h3>
    <ul>
      <li>Food production is a leading source of greenhouse gas emissions.</li>
      <li>Activities such as farming, processing, and transportation leave a substantial environmental footprint.</li>
    </ul>

    <h3>Why It Matters</h3>
    <ul>
      <li>Deforestation for agricultural land releases carbon dioxide (CO₂).</li>
      <li>Livestock farming generates methane (CH₄), while fertilizers release nitrous oxide (N₂O).</li>
    </ul>
  </div>

  <!-- Instructional Blurb -->
  <p class="instruction">
    Click on the pie chart below to explore which activities contribute to the environmental footprint of food production.
  </p>

  <!-- Pie Chart Section -->
  <div id="chart-wrapper">
    <div id="emissions-pie-chart">
      <div id="overlay">
        <h3>{selectedCategory}</h3>
        <p>{selectedDescription}</p>
        {#if selectedPercentage}
          <p><strong>{selectedPercentage}%</strong> of total emissions</p>
          <p><strong>{selectedValue} kg CO₂</strong> per kg</p>
        {/if}
      </div>
    </div>
  </div>

  <!-- Legend -->
  <div id="legend-container">
    {#each emissionsData as { label }}
      <div class="legend-item">
        <div class="legend-color" style="background-color: {categoryColors[label]};"></div>
        <span>{label}</span>
      </div>
    {/each}
  </div>

  <!-- The Solution Section -->
  <div class="solution">
    <h3>The Solution</h3>
    <ul>
      <li>Understand the carbon footprint of your food choices.</li>
      <li>Adopt sustainable practices to reduce emissions.</li>
    </ul>

    <div class="takeaway">
      <strong>Takeaway:</strong>
      <p>Making informed, sustainable food choices can help combat climate change and promote a healthier planet for future generations.</p>
    </div>
  </div>
</section>

<style>
  /* General Styling */
  #food-production {
    font-family: Arial, sans-serif;
    margin: 2rem 0;
  }

  #food-production h2 {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
  }

  .instruction {
    text-align: center;
    font-size: 1rem;
    color: #555;
    margin-bottom: 1rem;
    font-style: italic;
  }

  .key-points, .solution {
    margin-bottom: 2rem;
  }

  h3 {
    color: #007b5e;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }

  ul {
    padding-left: 1.5rem;
  }

  ul li {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
  }

  /* Pie Chart and Description */
  #chart-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
  }

  #emissions-pie-chart {
    width: 700px;
    height: 500px;
    position: relative;
  }

  #overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  #overlay h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  #overlay p {
    font-size: 1rem;
    color: #555;
  }

  #overlay h3 {
    font-size: 1.5rem;
    color: #007b5e;
    margin-bottom: 0.5rem;
  }

  #overlay p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }

  /* Legend Styling */
  #legend-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .legend-color {
    width: 20px;
    height: 20px;
    border-radius: 3px;
  }

  /* Takeaway Styling */
  .takeaway {
    background-color: #eaf6f5;
    padding: 1rem;
    border-left: 5px solid #007b5e;
    border-radius: 8px;
    margin-top: 1rem;
  }
</style>