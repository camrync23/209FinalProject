<script>
  import { fade } from 'svelte/transition';  // Import transition
  import GreenhouseGases from '../components/GreenhouseGases.svelte';
  import ClimateChange from '../components/ClimateChange.svelte';
  import FoodProduction from '../components/FoodProduction.svelte';
  import ProjectAims from '../components/ProjectAims.svelte';
  import FoodComparisonTool from '../components/FoodComparisonTool.svelte';
  import DietComparisonTool from '../components/DietComparisonTool.svelte';

  // Track which section is active
  let activeSection = 'greenhouseGases';  // Start with the first section
</script>

<main>
  <!-- Navigation for changing sections -->
  <nav>
    <button on:click={() => activeSection = 'greenhouseGases'}>What Are Greenhouse Gases?</button>
    <button on:click={() => activeSection = 'climateChange'}>GHGs and Climate Change</button>
    <button on:click={() => activeSection = 'foodProduction'}>Why Food Production Matters</button>
    <button on:click={() => activeSection = 'projectAims'}>What This Project Aims to Explore</button>
    <button on:click={() => activeSection = 'foodComparisonTool'}>Food Impact Comparison Tool</button>
    <button on:click={() => activeSection = 'dietComparisonTool'}>Diet Impact Comparison Tool</button>
  </nav>

  <!-- Section content that changes based on activeSection -->
  {#if activeSection === 'greenhouseGases'} 
    <div transition:fade>
      <GreenhouseGases />
    </div>
  {/if}

  {#if activeSection === 'climateChange'} 
    <div transition:fade>
      <ClimateChange />
    </div>
  {/if}

  {#if activeSection === 'foodProduction'} 
    <div transition:fade>
      <FoodProduction />
    </div>
  {/if}

  {#if activeSection === 'projectAims'} 
    <div transition:fade>
      <ProjectAims />
    </div>
  {/if}

  {#if activeSection === 'foodComparisonTool'} 
    <div transition:fade>
      <FoodComparisonTool />
    </div>
  {/if}

  {#if activeSection === 'dietComparisonTool'} 
    <div transition:fade>
      <DietComparisonTool />
    </div>
  {/if}
</main>

<style>
  main {
    padding: 1rem;
    max-width: 800px;
    margin: auto;
  }

  nav {
  display: flex;               /* Use flexbox layout */
  justify-content: center;     /* Center the buttons horizontally */
  gap: 1rem;                   /* Add spacing between buttons */
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;        /* Adjust padding for a balanced look */
  background-color: #007b5e;   /* Keep your existing styles */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #005a42;   /* Keep hover effect */
}
</style>
