<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  onMount(() => {
    const svg = d3.select('#teaser-bar-chart').append('svg')
      .attr('width', 600)
      .attr('height', 400);

    // Placeholder for D3 teaser bar chart code...
  });
</script>

<section id="greenhouse-gases">
  <h2>What Are Greenhouse Gases?</h2>
  <div class="visual">
    <img src="images/greenhouse_pic.png" alt="Illustration of the greenhouse effect" width="600">
  </div>
  <p>
    Greenhouse gases (GHGs) are gases in the Earth's atmosphere that trap heat, creating a "greenhouse effect" that warms the planet. These gases, such as carbon dioxide (CO₂), methane (CH₄), and nitrous oxide (N₂O), naturally occur in the atmosphere but have increased dramatically due to human activities like burning fossil fuels, deforestation, and industrial farming. As these gases build up, they prevent some of the heat from escaping into space, leading to a gradual rise in global temperatures.
  </p>
  <div class="cta">
    <a href="https://climate.nasa.gov/causes/" class="btn" target="_blank" rel="noopener noreferrer">Learn More</a>
  </div>
</section>

<section id="project-aims">
  <h2>What This Project Aims to Explore</h2>
  <p>
    This project aims to explore the environmental impact of food production, focusing on key factors like greenhouse gas emissions, water usage, and land use. Through interactive visualizations, users will be able to compare different food products and see how their environmental impact varies across different production stages.
  </p>

  <h3>Goals of the Project</h3>
  <ul>
    <li><strong>Understand the environmental footprint of different foods:</strong> Explore the impact of various foods on greenhouse gas emissions, water consumption, and land use.</li>
    <li><strong>Visualize the lifecycle impact of food production:</strong> See how the different stages of food production (e.g., farming, transportation, packaging) contribute to environmental outcomes.</li>
    <li><strong>Compare food items and make informed choices:</strong> Allow users to compare the environmental impacts of different food products and understand how food choices contribute to climate change.</li>
    <li><strong>Empower users to build sustainable diets:</strong> Help users create meal plans that minimize environmental impacts through an interactive diet-building tool.</li>
  </ul>

  <h3>Key Features of the Interactive Visualizations</h3>
  <ul>
    <li><strong>Food Impact Comparison Tool:</strong> Compare the environmental impacts of different food items based on emissions, water usage, and land use.</li>
    <li><strong>Lifecycle Breakdown:</strong> See how the various stages of production, from land use change to retail, contribute to the overall environmental impact.</li>
    <li><strong>Diet Builder:</strong> Build your own sustainable diet by selecting foods, with dynamic updates on the total environmental impact.</li>
    <li><strong>Prebuilt Diet Presets:</strong> Compare the environmental impacts of common diets, such as vegetarian or meat-heavy diets, to help users make sustainable choices.</li>
  </ul>

  <p>Ready to explore the environmental impacts of your food choices? Use the interactive tools below to start building your sustainable diet today!</p>
</section>

<style>
  /* Global Styling */
  section {
    margin-bottom: 2rem;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }

  h2 {
    font-size: 2rem;
    color: #007b5e;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #007b5e;
    margin-top: 1.5rem;
  }

  p {
    line-height: 1.6;
    margin-top: 1rem;
    text-align: justify;
  }

  ul {
    margin-top: 1rem;
    padding-left: 1.5rem;
  }

  ul li {
    margin-bottom: 0.5rem;
  }

  .visual {
    text-align: center;
  }

  .visual img {
    border: 5px solid #e0f7fa;
    border-radius: 10px;
    margin: 1rem auto;
    display: block;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .visual img:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  }

  .cta {
    text-align: center;
    margin-top: 1.5rem;
  }

  .btn {
    display: inline-block;
    background: #007b5e;
    color: white;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background: #005a42;
  }
  
</style>
