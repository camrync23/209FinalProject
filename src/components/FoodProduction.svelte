<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    onMount(() => {
      const svg = d3.select('#emissions-pie-chart').append('svg')
        .attr('width', 600)
        .attr('height', 400);
  
      // Add D3 pie chart code here...
    });
  </script>
  
  <section id="food-production">
    <h2>Why Food Production Matters</h2>
    <div id="emissions-pie-chart"></div>
    <p>Food production contributes up to 30% of global GHG emissions, with significant variations across food types.</p>
  </section>
  
  <style>
    #emissions-pie-chart {
      margin: 1rem 0;
    }
  </style>
  