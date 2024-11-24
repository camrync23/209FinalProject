<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import allMetricFood from '../data/all_metric_food.json';

  let foodItems = []; // List of all food items
  let foodCategories = {}; // Categories of food items
  let foodCheckStatus = {}; // Tracks whether a food is selected or not
  let selectedFoods = []; // Foods that are selected
  let selectedCategory = ''; // Selected food category
  let selectedImpact = 'Greenhouse gas emissions';
  let selectedMeasurement = 'per 1000kcal';
  let unavailableMetric = false; // Track if unavailable metric is selected

  // Load food items and categorize them
  onMount(() => {
    foodItems = allMetricFood.map((item) => item["Food product"]);
    foodCategories = allMetricFood.reduce((acc, item) => {
      const category = item.Category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item["Food product"]);
      return acc;
    }, {});

    // Initialize foodCheckStatus with all foods set to false (not selected)
    foodItems.forEach((food) => {
      foodCheckStatus[food] = false;
    });

    // Initialize selectedFoods to the empty array
    selectedFoods = [];
    
    // Draw the chart initially
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
    console.log('Drawing chart with selected foods:', selectedFoods);

    // Clear the chart container before drawing new chart
    const container = d3.select('#comparison-chart-container');
    container.html('');

    if (selectedFoods.length === 0) {
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

  // Handle changes to selected foods (checkboxes)
  const handleFoodSelection = () => {
    selectedFoods = foodItems.filter((food) => foodCheckStatus[food]);
    console.log('Selected foods:', selectedFoods);
    drawChart(); // Re-render chart after selecting new foods
  };

  // Handle changes to selected category
  const handleCategorySelection = () => {
    if (selectedCategory === '') {
      selectedFoods = foodItems.slice(); // Select all foods if no category is selected
    } else {
      selectedFoods = foodCategories[selectedCategory] || [];
    }
    console.log('Selected foods after category change:', selectedFoods);
    drawChart(); // Re-render chart after category selection
  };

  // Select or clear all foods
  const selectAllFoods = () => {
    selectedFoods = foodItems.slice(); // Select all foods
    selectedCategory = ''; // Reset category selection
    foodItems.forEach((food) => foodCheckStatus[food] = true); // Check all boxes
    drawChart();
  };

  const clearAllFoods = () => {
    selectedFoods = []; // Clear all foods
    selectedCategory = ''; // Reset category selection
    foodItems.forEach((food) => foodCheckStatus[food] = false); // Uncheck all boxes
    drawChart();
  };
</script>

<div class="tool-container">
  <div class="left-panel">
    <!-- Impact and Measurement Selections -->
    <div class="selection-container">
      <div class="impact-selection">
        <label for="impact">Select Impact:</label>
        <select id="impact" bind:value={selectedImpact} on:change={drawChart}>
          <option value="Greenhouse gas emissions">Greenhouse gas emissions</option>
          <option value="Eutrophying emissions">Eutrophying emissions</option>
          <option value="Freshwater withdrawals">Freshwater withdrawals</option>
          <option value="Land use">Land use</option>
          <option value="Scarcity-weighted water use">Scarcity-weighted water use</option>
        </select>
      </div>

      <div class="measurement-selection">
        <label for="measurement">Select Measurement:</label>
        <select id="measurement" bind:value={selectedMeasurement} on:change={drawChart}>
          <option value="per 1000kcal">per 1000 kcal</option>
          <option value="per kilogram">per kg</option>
          <option value="per 100g protein">per 100g protein</option>
        </select>
      </div>
    </div>

    <!-- Select All / Clear All -->
    <div class="select-all-clear-container">
      <button on:click={selectAllFoods}>Select All</button>
      <button on:click={clearAllFoods}>Clear All</button>
    </div>

    <!-- Category Selection -->
    <div class="category-selection">
      <label for="category">Select Category:</label>
      <select id="category" bind:value={selectedCategory} on:change={handleCategorySelection}>
        <option value="">All</option>
        {#each Object.keys(foodCategories) as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>

    <!-- Scrollable Food Selection -->
    <div class="food-selection">
      <div class="checkbox-container">
        {#each foodItems as food}
          <label>
            <input type="checkbox" bind:checked={foodCheckStatus[food]} on:change={handleFoodSelection}>
            {food}
          </label>
        {/each}
      </div>
    </div>
  </div>

  <!-- Chart Display -->
  <div class="chart-container">
    <div id="comparison-chart-container" class="chart-container"></div>
  </div>
</div>


<style>
.tool-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  height: 100vh; /* Ensures the container takes the full height */
}

.left-panel {
  width: 300px;
  padding: 20px;
  box-sizing: border-box; /* Ensures padding doesn't affect layout */
  display: flex;
  flex-direction: column;
  height: 100%; /* Full height */
}

.selection-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.impact-selection,
.measurement-selection {
  width: 100%; /* Full width */
}

.select-all-clear-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.category-selection {
  margin-top: 20px;
}

.food-selection {
  margin-top: 20px;
  height: 250px; /* Set a fixed height for the food selection area */
  overflow-y: auto; /* Allow scrolling if the content exceeds the height */
}

.checkbox-container {
  padding-right: 15px; /* Add some space to the right of checkboxes */
}

.chart-container {
  flex-grow: 1;
  margin-top: 20px;
}

.food-selection label {
  font-size: 14px;
  display: block; /* Ensures checkboxes are stacked vertically */
}

</style>
