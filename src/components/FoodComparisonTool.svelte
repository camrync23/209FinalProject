<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import allMetricFood from '../data/all_metric_food.json';

  let foodItems = []; // List of all food items
  let selectedFoods = []; // Foods currently selected for comparison
  let selectedImpact = 'Greenhouse gas emissions';
  let selectedMeasurement = 'per 1000kcal';
  let unavailableMetric = false; // Track if unavailable metric is selected

  // Load food items from the dataset
  onMount(() => {
    foodItems = allMetricFood.map((item) => item["Food product"]);
    selectedFoods = foodItems.slice(0, 2); // Pre-select first two foods for comparison
    drawChart();
  });

  // Helper function to build the key for accessing data
  const getMetricKey = (impact, measurement) => {
    const impactKeyMap = {
      'Greenhouse gas emissions': 'Greenhouse gas emissions',
      'Eutrophying emissions': 'Eutrophying emissions',
      'Freshwater withdrawals': 'Freshwater withdrawals',
      'Land use': 'Land use',
      'Scarcity-weighted water use': 'Scarcity-weighted water use'
    };

    const measurementKeyMap = {
      'per 1000kcal': 'per 1000kcal',
      'per kilogram': 'per kilogram',
      'per 100g protein': 'per 100g protein'
    };

    const unitMap = {
      'Greenhouse gas emissions': 'kgCO₂eq',
      'Eutrophying emissions': 'gPO₄eq',
      'Freshwater withdrawals': 'liters',
      'Land use': 'm²',
      'Scarcity-weighted water use': 'liters'
    };

    const impactKey = impactKeyMap[impact];
    const measurementKey = measurementKeyMap[measurement];
    const unit = unitMap[impact];

    return `${impactKey} ${measurementKey} (${unit} ${measurementKey})`;
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

    // Check if the metric is available
    if (selectedImpact === 'Greenhouse gas emissions' && selectedMeasurement === 'per kilogram') {
      unavailableMetric = true;
      alert('Greenhouse gas emissions per kilogram is not available. Please select a different combination.');
    } else {
      unavailableMetric = false;
    }

    const comparisonData = selectedFoods.map((food) => {
      const dataForFood = allMetricFood.find((item) => item["Food product"] === food);

      if (dataForFood) {
        const key = getMetricKey(selectedImpact, selectedMeasurement);
        const value = dataForFood[key] || 0;
        return { food, value };
      } else {
        return { food, value: 0 };
      }
    });

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

    svg.append('text')
      .attr('class', 'y-axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -chartHeight / 2)
      .attr('y', -60)
      .style('text-anchor', 'middle')
      .text(getAxisLabel());

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

  // Select or clear all foods
  const selectAllFoods = () => {
    selectedFoods = foodItems.slice(); // Select all foods
    drawChart();
  };

  const clearAllFoods = () => {
    selectedFoods = []; // Clear all foods
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
    <div class="food-selection">
      <div class="food-selection-buttons">
        <button on:click={selectAllFoods}>Select All</button>
        <button on:click={clearAllFoods}>Clear All</button>
      </div>
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

    <div id="comparison-chart-container" class="chart-container">
      {#if unavailableMetric}
        <p style="color: red;">The selected metric is unavailable. Please choose a different combination.</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .tool-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .options {
    margin-bottom: 20px;
  }

  .options select {
    margin: 0 10px;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }

  .food-selection {
    width: 30%;
    max-height: 300px;
    overflow-y: auto;
  }

  .food-selection-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .food-selection-buttons button {
    margin-top: 10px;
    width: 48%; /* Adjust button width to make spacing more compact */
  }

  .food-list {
    margin-bottom: 10px;
  }

  .food-item {
    display: block;
    margin-bottom: 5px;
  }

  .chart-container {
    width: 65%;
    height: 400px;
  }

  .button {
    margin-top: 10px;
  }

  .y-axis-label {
    font-size: 14px;
    font-weight: bold;
  }
</style>
