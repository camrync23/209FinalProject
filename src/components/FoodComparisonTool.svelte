<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import allMetricFood from '../data/all_metric_food.json';
  
    let foodItems = []; // List of all food items
    let selectedFoods = []; // Foods currently selected for comparison
    let selectedImpact = 'Greenhouse gas emissions';
    let selectedMeasurement = 'per 1000kcal';
  
    // Load food items from the dataset
    onMount(() => {
      foodItems = allMetricFood.map((item) => item["Food product"]);
      selectedFoods = foodItems.slice(0, 2); // Pre-select first two foods for comparison
      console.log('Food Items:', foodItems); // Check if foods are loaded correctly
      drawChart();
    });
  
    // Helper function to build the key for accessing data
    const getMetricKey = (impact, measurement) => {
      const impactKeyMap = {
        'Greenhouse gas emissions': 'Greenhouse gas emissions per 1000kcal (kgCO₂eq per 1000kcal)',
        'Eutrophying emissions': 'Eutrophying emissions per 1000kcal (gPO₄eq per 1000kcal)',
        'Freshwater withdrawals': 'Freshwater withdrawals per 1000kcal (liters per 1000kcal)',
        'Land use': 'Land use per 1000kcal (m² per 1000kcal)',
        'Scarcity-weighted water use': 'Scarcity-weighted water use per 1000kcal (liters per 1000kcal)'
      };
  
      const measurementKeyMap = {
        'per 1000kcal': '',
        'per kilogram': ' per kilogram',
        'per 100g protein': ' per 100g protein'
      };
  
      return impactKeyMap[impact] + measurementKeyMap[measurement];
    };
  
    // Function to generate the axis label based on the selected metric
    const getAxisLabel = () => {
      const metricMap = {
        'Greenhouse gas emissions': 'Greenhouse gas emissions (kgCO₂eq)',
        'Eutrophying emissions': 'Eutrophying emissions (gPO₄eq)',
        'Freshwater withdrawals': 'Freshwater withdrawals (liters)',
        'Land use': 'Land use (m²)',
        'Scarcity-weighted water use': 'Scarcity-weighted water use (liters)'
      };
  
      const measurementMap = {
        'per 1000kcal': 'per 1000 kcal',
        'per kilogram': 'per kg',
        'per 100g protein': 'per 100g protein'
      };
  
      return `${metricMap[selectedImpact]} ${measurementMap[selectedMeasurement]}`;
    };
  
    // Draw the chart
    const drawChart = () => {
      const container = d3.select('#comparison-chart-container');
      container.html(''); // Clear previous chart
  
      if (!selectedFoods.length) {
        container.append('p').text('Please select at least one food to compare.');
        return;
      }
  
      const width = container.node().clientWidth || 600;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 60, left: 80 };
  
      const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;
  
      const key = getMetricKey(selectedImpact, selectedMeasurement);
      console.log('Selected Key:', key); // Check the selected key being used
  
      const comparisonData = selectedFoods.map((food) => {
        const dataForFood = allMetricFood.find((item) => item["Food product"] === food);
        
        if (dataForFood) {
          const value = dataForFood[key];
          console.log(`Food: ${food}, Key: ${key}, Value: ${value}`); // Log data for each food
          return { food, value: value || 0 }; // Default to 0 if value is missing
        } else {
          console.log(`Food data not found for: ${food}`);
          return { food, value: 0 }; // Return a fallback value if data is missing
        }
      });
  
      console.log('Comparison Data:', comparisonData); // Log the data to check
  
      const xScale = d3.scaleBand()
        .domain(comparisonData.map((d) => d.food))
        .range([0, chartWidth])
        .padding(0.2);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(comparisonData, (d) => d.value) || 1])
        .nice()
        .range([chartHeight, 0]);
  
      const colorScale = d3.scaleOrdinal(d3.schemeTableau10);
  
      svg.selectAll('.bar')
        .data(comparisonData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d.food))
        .attr('y', (d) => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => chartHeight - yScale(d.value))
        .attr('fill', (d) => colorScale(d.food));
  
      svg.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(-30)')
        .style('text-anchor', 'end');
  
      svg.append('g')
        .call(d3.axisLeft(yScale));
  
      // Add y-axis label based on selected metric
      svg.append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -chartHeight / 2)
        .attr('y', -60)
        .style('text-anchor', 'middle')
        .text(getAxisLabel()); // Update the label based on selected metric
  
      // Add text labels on bars
      svg.selectAll('.label')
        .data(comparisonData)
        .enter()
        .append('text')
        .attr('x', (d) => xScale(d.food) + xScale.bandwidth() / 2)
        .attr('y', (d) => yScale(d.value) - 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', '#000')
        .text((d) => d.value.toFixed(2));
    };
  
    // Handle changes to selected foods
    const handleFoodSelection = () => {
      drawChart(); // Re-render chart after selecting new foods
    };
  
    // Update chart when impact or measurement changes
    const updateChart = () => {
      drawChart();
    };
  </script>
  
  <div class="tool-container">
    <h3>Food Impact Comparison Tool</h3>
  
    <div class="options">
      <label>
        Select Impact:
        <select bind:value={selectedImpact} on:change={updateChart}>
          <option>Greenhouse gas emissions</option>
          <option>Eutrophying emissions</option>
          <option>Freshwater withdrawals</option>
          <option>Land use</option>
          <option>Scarcity-weighted water use</option>
        </select>
      </label>
  
      <label>
        Select Measurement:
        <select bind:value={selectedMeasurement} on:change={updateChart}>
          <option>per 1000kcal</option>
          <option>per kilogram</option>
          <option>per 100g protein</option>
        </select>
      </label>
    </div>
  
    <div class="container">
      <!-- Scrollable food list on the left -->
      <div class="food-selection">
        <h4>Select Foods:</h4>
        <div class="food-list">
          {#each foodItems as food}
            <label class="food-item">
              <input type="checkbox" bind:group={selectedFoods} value={food} on:change={handleFoodSelection} />
              {food}
            </label>
          {/each}
        </div>
      </div>
  
      <!-- Chart container on the right -->
      <div id="comparison-chart-container" class="chart-container"></div>
    </div>
  </div>
  
  <style>
    .tool-container {
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #ddd;
      max-width: 1200px;
      margin: 0 auto;
    }
  
    .options {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
  
    .options select {
      padding: 5px;
      font-size: 14px;
    }
  
    .container {
      display: flex;
      align-items: flex-start;
    }
  
    .food-selection {
      width: 220px; /* Smaller width for the food list */
      overflow-y: auto;
      margin-right: 20px; /* Space between food list and chart */
    }
  
    .food-list {
      max-height: 300px; /* Reduce height of the list */
      overflow-y: auto;
    }
  
    .food-item {
      font-size: 14px; /* Smaller font size for items */
      margin-bottom: 8px;
    }
  
    .chart-container {
      width: 70%;
      display: inline-block;
      height: 400px;
    }
  
    .y-axis-label {
      font-size: 14px;
      font-weight: bold;
    }
  </style>
  