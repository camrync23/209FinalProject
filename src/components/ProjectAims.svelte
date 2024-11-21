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
    <div id="teaser-bar-chart"></div>
    <p>Explore how different foods impact the environment and experiment with creating sustainable diets.</p>
  </section>
  
  <style>
    #teaser-bar-chart {
      margin: 1rem 0;
    }
  </style>
  