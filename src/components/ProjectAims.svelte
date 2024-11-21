<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    onMount(() => {
      const svg = d3.select('#teaser-bar-chart').append('svg')
        .attr('width', 600)
        .attr('height', 400);
  
      // Add D3 teaser bar chart code here...
    });
  </script>
  
  <section id="project-aims">
    <h2>What This Project Aims to Explore</h2>
    <p>This project aims to explore the environmental impact of food production, focusing on key factors like greenhouse gas emissions, water usage, and land use. Through interactive visualizations, users will be able to compare different food products and see how their environmental impact varies across different production stages.</p>
  
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
    #teaser-bar-chart {
      margin: 1rem 0;
    }
  </style>
  