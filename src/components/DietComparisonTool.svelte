<script>
  import { scale } from "svelte/transition";

  const dietOptions = [
    { name: "Vegan", co2: 1.725, icon: "🌱", tooltip: "Plant-based diet, no animal products" },
    { name: "Vegetarian", co2: 2.9, icon: "🥦", tooltip: "Plant-based diet including dairy and eggs" },
    { name: "Pescatarian", co2: 4.15, icon: "🐟", tooltip: "Vegetarian diet with the inclusion of fish and seafood" },
    { name: "Omnivore", co2: 5.575, icon: "🍖", tooltip: "Diet including all food types" },
    { name: "Paleo", co2: 6.55, icon: "🍗", tooltip: "Focuses on meat, fish, vegetables, and fruits without grains, legumes, or dairy" },
    { name: "Keto", co2: 7.275, icon: "🥩", tooltip: "High fat, low carb, meat-based diet" },
  ];

  const activityOptions = [
    { name: "1 Hour of Jet Travel", co2: 100, icon: "✈️", tooltip: "1 hour of flying emits 100 kg of CO2" },
    { name: "Car Travel (100 miles)", co2: 30, icon: "🚗", tooltip: "Car travel emits 30 kg of CO2 per 100 miles" },
    { name: "Electricity Use (1 day)", co2: 12, icon: "💡", tooltip: "Average electricity use per person for 1 day" },
  ];

  let selectedDietLeft = dietOptions[0];
  let selectedDietRight = dietOptions[1];
  let randomActivity = activityOptions[0];

  function getRandomActivity() {
    randomActivity = activityOptions[Math.floor(Math.random() * activityOptions.length)];
  }
</script>

<main class="page-container">
  <!-- Unified Container -->
  <div class="section-container">
    <h2 class="section-title">Diet Comparison and Fun Fact</h2>
    <p class="section-description">
      Use this tool to explore the environmental impact of different diets. Select two diets to compare their daily CO₂ emissions, and discover a fun fact about the emissions of common activities!
    </p>
    <div class="selection-container">
      <!-- Left Diet Selection -->
      <div class="selection diet">
        <h3>Select your first diet:</h3>
        <div class="options">
          {#each dietOptions as { name, co2, icon, tooltip }}
            <button
              class:selected={selectedDietLeft.name === name}
              on:click={() => selectedDietLeft = { name, co2, icon, tooltip }}
              title={tooltip}
              class="diet-button"
            >
              <span class="icon">{icon}</span> <span>{name}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Left CO₂ Emission Meter -->
      <div class="emission-meter-container">
        <h4>CO₂ Emission for {selectedDietLeft.name}</h4>
        <div class="meter">
          <div class="meter-fill" style="height: {Math.min(100, (selectedDietLeft.co2 * 10))}%;"></div>
        </div>
        <div class="co2-bubble">{selectedDietLeft.co2.toFixed(2)} kg CO₂/day</div>
      </div>

      <!-- Right CO₂ Emission Meter -->
      <div class="emission-meter-container">
        <h4>CO₂ Emission for {selectedDietRight.name}</h4>
        <div class="meter">
          <div class="meter-fill" style="height: {Math.min(100, (selectedDietRight.co2 * 10))}%;"></div>
        </div>
        <div class="co2-bubble">{selectedDietRight.co2.toFixed(2)} kg CO₂/day</div>
      </div>

      <!-- Right Diet Selection -->
      <div class="selection diet">
        <h3>Select your second diet:</h3>
        <div class="options">
          {#each dietOptions as { name, co2, icon, tooltip }}
            <button
              class:selected={selectedDietRight.name === name}
              on:click={() => selectedDietRight = { name, co2, icon, tooltip }}
              title={tooltip}
              class="diet-button"
            >
              <span class="icon">{icon}</span> <span>{name}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Fun Fact Section -->
    <div class="fun-fact-container">
      <div class="stripe"></div>
      <div class="content">
        <h2 class="fun-fact-title">Fun Fact</h2>
        <h4 class="fun-fact-subtitle">Pick a diet from the diet selection on the left to see a fun fact about its environmental impact.</h4>
        <p class="fun-fact">
          Did you know? {randomActivity.icon} {randomActivity.name} emits about {randomActivity.co2} kg of CO₂!
          That's equivalent to:
        </p>
        <div class="fun-fact-icons">
          {#each Array(Math.ceil(randomActivity.co2 / selectedDietLeft.co2)) as _, index}
            <span class="icon">{selectedDietLeft.icon}</span>
          {/each}
        </div>
        <p class="fun-fact">{Math.ceil(randomActivity.co2 / selectedDietLeft.co2)} meals of a {selectedDietLeft.name} diet!</p>
        <button class="fun-fact-button" on:click={getRandomActivity}>Click here for another fun fact</button>
      </div>
    </div>
    <div class="solution">
      <h3>Key Takeaways</h3>
      <ul>
        <li>Plant-based diets have a lower environmental impact compared to meat-heavy diets.</li>
        <li>You don't have to completely change your diet to make a difference! Even switching to a plant-based meal or choosing plant-based options for just one day a week can have a positive environmental impact.</li>
        <li>Small changes add up: Every time you make a more eco-friendly food choice, you're helping to reduce the strain on our planet. Start with small steps, and you’ll be part of the solution!</li>
      </ul>
    </div>
  </div>
</main>

<style>
  .section-description {
    font-size: 1.2rem;
    color: #555;
    text-align: center;
    margin-bottom: 30px;
    max-width: 800px;
    line-height: 1.6;
    margin: 0 auto 30px auto; /* Center the text and add spacing */
  }
  
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Arial', sans-serif;
    margin: 2rem;
  }

  .section-container {
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 2rem;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 1200px;
  }

  .section-title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    color: #2E7D32;
  }

  .selection-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .selection.diet {
    width: 20%; 
    text-align: center;
  }

  .diet-button {
    background-color: #66BB6A;
    color: white;
    border: none;
    padding: 12px 20px;
    margin: 10px auto; /* Center buttons horizontally */
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 150px; /* Fixed width for all buttons */
  }

  .diet-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  .diet-button.selected {
    background-color: #4CAF50;
  }

  .diet-button .icon {
    font-size: 1.2rem;
    margin-right: 10px;
  }

  .emission-meter-container {
    text-align: center;
    margin: 0 20px;
    flex: 1;
  }

  .meter {
    width: 100%;
    height: 250px;
    background-color: #F1F1F1; /* Softer contrast for the background */
    border-radius: 10px;
    position: relative;
    box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .meter-fill {
    background-color: #FF7043;
    width: 100%;
    position: absolute;
    bottom: 0;
    transition: height 0.3s ease-out;
    border-radius: 10px;
  }

  .co2-bubble {
    margin-top: 10px;
    background-color: #FF7043;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    display: inline-block;
    font-size: 1.1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .fun-fact-container {
    display: flex;
    background: linear-gradient(to bottom, #DFFFE0, #C9F7D6); /* Softer and more vibrant gradient */
    border-radius: 8px;
    margin-top: 1rem;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    align-items: center;
    border-left: 5px solid #007b5e;
  }

  .stripe {
    width: 10px;
    background-color: #2E7D32; /* Dark green stripe */
    border-radius: 15px 0 0 15px;
  }

  .content {
    padding: 20px;
    flex: 1;
    text-align: center;
  }

  .fun-fact-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 25px; /* Increased spacing below title */
    color: #2E7D32; /* Dark green */
  }

  .fun-fact-subtitle {
    font-size: 0.8rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 20px;
  }

  .fun-fact {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 20px;
  }

  .fun-fact-icons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
    gap: 8px; /* Increased spacing between icons */
    justify-content: center;
    margin-bottom: 20px;
    padding: 10px; /* Added padding for grid */
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .fun-fact-icons .icon {
    font-size: 1.5rem;
  }

  .fun-fact-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .fun-fact-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
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
