<script>
  import { fade } from 'svelte/transition'; 
  import Modal from '../components/Modal.svelte'; 
  import GreenhouseGases from '../components/GreenhouseGases.svelte';
  import ClimateChange from '../components/ClimateChange.svelte';
  import FoodProduction from '../components/FoodProduction.svelte';
  import ProjectAims from '../components/ProjectAims.svelte';
  import FoodComparisonTool from '../components/FoodComparisonTool.svelte';
  import DietComparisonTool from '../components/DietComparisonTool.svelte';

  let activeSection = 'projectAims'; 

  let showModal = false;

  const closeModal = () => {
    showModal = false;
  };

  setTimeout(() => {
    showModal = true;
  }, 800); 
</script>

<Modal showModal={showModal} onClose={closeModal} />

<main>

  <nav>
    <button on:click={() => activeSection = 'projectAims'}>What This Project Aims to Explore</button>
    <button on:click={() => activeSection = 'climateChange'}>GHGs and Climate Change</button>
    <button on:click={() => activeSection = 'foodProduction'}>Why Food Production Matters</button>
    <button on:click={() => activeSection = 'foodComparisonTool'}>Food Impact Comparison Tool</button>
    <button on:click={() => activeSection = 'dietComparisonTool'}>Diet Impact Comparison Tool</button>
  </nav>

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
    display: flex; 
    justify-content: center; 
    gap: 1rem; 
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem; 
    background-color: #007b5e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #005a42; 
  }
</style>
