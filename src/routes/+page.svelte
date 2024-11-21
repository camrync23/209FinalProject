<script>
  import GreenhouseGases from '../components/GreenhouseGases.svelte';
  import ClimateChange from '../components/ClimateChange.svelte';
  import FoodProduction from '../components/FoodProduction.svelte';
  import ProjectAims from '../components/ProjectAims.svelte';
</script>

<main>
  <GreenhouseGases />
  <ClimateChange />
  <FoodProduction />
  <ProjectAims />
</main>

<style>
  main {
    padding: 1rem;
    max-width: 800px;
    margin: auto;
  }
</style>