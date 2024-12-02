<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import allMetricFood from '../data/all_metric_food.json';

  let foodItems = [];
  let foodCategories = {};
  let foodCheckStatus = {};
  let selectedFoods = [];
  let selectedCategory = '';
  let selectedImpact = 'Greenhouse gas emissions';
  let selectedMeasurement = 'per 1000kcal';
  let unavailableMetric = false;

  onMount(() => {
    foodItems = allMetricFood.map((item) => item["Food product"]);
    foodCategories = allMetricFood.reduce((acc, item) => {
      const category = item.Category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item["Food product"]);
      return acc;
    }, {});

    foodItems.forEach((food) => {
      foodCheckStatus[food] = false;
    });

    selectedFoods = [];
    drawChart();
  });

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

  const drawChart = () => {
    const container = d3.select('#comparison-chart-container');
    container.html('');

    if (selectedFoods.length === 0) {
      container.append('p').text('Please select at least one food to compare.');
      return;
    }

    const width = container.node().clientWidth || 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 60, left: 80 };

    const svg = container.append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const key = getMetricKey(selectedImpact, selectedMeasurement);
    const comparisonData = selectedFoods.map((food) => {
      const dataForFood = allMetricFood.find((item) => item["Food product"] === food);
      if (dataForFood) {
        const value = dataForFood[key] || 0;
        return { food, value };
      }
      return { food, value: 0 };
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
  };

  const handleFoodSelection = () => {
    selectedFoods = foodItems.filter((food) => foodCheckStatus[food]);
    drawChart();
  };

  const handleCategorySelection = () => {
    if (selectedCategory === '') {
      selectedFoods = foodItems.slice();
    } else {
      selectedFoods = foodCategories[selectedCategory] || [];
    }
    drawChart();
  };

  const selectAllFoods = () => {
    selectedFoods = foodItems.slice();
    selectedCategory = '';
    foodItems.forEach((food) => foodCheckStatus[food] = true);
    drawChart();
  };

  const clearAllFoods = () => {
    selectedFoods = [];
    selectedCategory = '';
    foodItems.forEach((food) => foodCheckStatus[food] = false);
    drawChart();
  };
</script>

<section id="food-impact-tool">
  <h2>Food Impact Comparison Tool</h2>
  <div class="content">
    <p>
      Use this tool to explore the environmental impacts of different foods. Select metrics, food categories, and specific items to visualize how their production impacts the environment.
    </p>

    <div class="tool-container">
      <div class="control-panel">
        <label for="impact-select">Select Impact:</label>
        <select id="impact-select" bind:value={selectedImpact} on:change={drawChart}>
          <option value="Greenhouse gas emissions">Greenhouse gas emissions</option>
          <option value="Eutrophying emissions">Eutrophying emissions</option>
          <option value="Freshwater withdrawals">Freshwater withdrawals</option>
          <option value="Land use">Land use</option>
          <option value="Scarcity-weighted water use">Scarcity-weighted water use</option>
        </select>

        <label for="measurement-select">Select Measurement:</label>
        <select id="measurement-select" bind:value={selectedMeasurement} on:change={drawChart}>
          <option value="per 1000kcal">per 1000 kcal</option>
          <option value="per kilogram">per kilogram</option>
          <option value="per 100g protein">per 100g protein</option>
        </select>

        <label for="category-select">Select Category:</label>
        <select id="category-select" bind:value={selectedCategory} on:change={handleCategorySelection}>
          <option value="">All</option>
          {#each Object.keys(foodCategories) as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
        <div>
          <button on:click={selectAllFoods}>Select All Foods</button>
          <button on:click={clearAllFoods}>Clear Selection</button>
        </div>
      </div>

      <div id="comparison-chart-container" class="chart-container"></div>
    </div>
  </div>

  <div class="solution">
    <h3>Key Takeaways</h3>
    <ul>
      <li>Food production contributes significantly to greenhouse gas emissions and other environmental impacts.</li>
      <li>Choosing lower-impact foods can help reduce your personal carbon footprint.</li>
      <li>Making informed decisions can lead to a healthier planet for future generations.</li>
    </ul>
  </div>
</section>

<style>
  /* General Styling */
  #food-impact-tool {
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    padding: 20px;
    max-width: 800px;
  }

  h2 {
    text-align: center;
    color: #007b5e;
    margin-bottom: 20px;
  }

  .content {
    text-align: center;
    margin-bottom: 20px;
  }

  .tool-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .control-panel {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .control-panel label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .control-panel select, .control-panel button {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .chart-container {
    text-align: center;
  }

  .solution {
    background-color: #eaf6f5;
    padding: 1rem;
    border-left: 5px solid #007b5e;
    border-radius: 8px;
    margin-top: 20px;
  }

  .solution h3 {
    color: #007b5e;
  }

  .solution ul {
    padding-left: 1.5rem;
    margin: 0;
  }
</style>
