<script>
  import { scale, fade } from "svelte/transition";
  
  // Updated diet options with corresponding CO2 emissions (kg/day)
  const dietOptions = [
    { name: "Vegan", co2: 1.725, icon: "🌱", tooltip: "Plant-based diet, no animal products" },
    { name: "Vegetarian", co2: 2.9, icon: "🥦", tooltip: "Plant-based diet including dairy and eggs" },
    { name: "Pescatarian", co2: 4.15, icon: "🐟", tooltip: "Vegetarian diet with the inclusion of fish and seafood" },
    { name: "Omnivore", co2: 5.575, icon: "🍖", tooltip: "Diet including all food types" },
    { name: "Paleo", co2: 6.55, icon: "🍗", tooltip: "Focuses on meat, fish, vegetables, and fruits without grains, legumes, or dairy" },
    { name: "Keto", co2: 7.275, icon: "🥩", tooltip: "High fat, low carb, meat-based diet" },
  ];
  
  // Updated activity options with corresponding CO2 emissions (kg)
  const activityOptions = [
    { name: "1 Hour of Jet Travel", co2: 100, icon: "✈️", tooltip: "1 hour of flying emits 100 kg of CO2" },
    { name: "Car Travel (100 miles)", co2: 30, icon: "🚗", tooltip: "Car travel emits 30 kg of CO2 per 100 miles" },
    { name: "Electricity Use (1 day)", co2: 12, icon: "💡", tooltip: "Average electricity use per person for 1 day" }
  ];
  
  // Default diet and activity selection
  let selectedDietLeft = dietOptions[0];  // Default to Vegan on the left
  let selectedDietRight = dietOptions[1]; // Default to Vegetarian on the right
  let selectedActivity = activityOptions[0]; // Default to Jet Travel
  
  let equivalenceMessage = "";
  let funFact = "";
  
  // Function to calculate equivalence message and fun fact
  function calculateEquivalence() {
    if (selectedDietLeft.co2 > selectedActivity.co2) {
      equivalenceMessage = `Your ${selectedDietLeft.name} diet for one day equals ${Math.round(selectedDietLeft.co2 / selectedActivity.co2)} hours of flying!`;
      funFact = `Did you know? A jet emits around 100g of CO2 per minute of flight!`;
    } else {
      equivalenceMessage = `Your ${selectedActivity.name} equals about ${Math.round(selectedActivity.co2 / selectedDietLeft.co2)} days of ${selectedDietLeft.name} meals!`;
    }
  }
  
  // Recalculate whenever diet or activity changes
  $: selectedDietLeft, selectedDietRight, selectedActivity, calculateEquivalence();
</script>

<main>
  <!-- Top Section: Comparing Two Diets -->
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
            transition:scale={{ duration: 150 }}
            class="diet-button"
          >
            <span class="icon">{icon}</span> <span>{name}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Left CO₂ Emission Meter (Vertical) -->
    <div class="emission-meter-container">
      <h4>CO₂ Emission for {selectedDietLeft.name}</h4>
      <div class="meter">
        <div 
          class="meter-fill" 
          style="height: {Math.min(100, (selectedDietLeft.co2 * 10))}%" 
          transition:scale={{ duration: 300 }}
        ></div>
      </div>
      <div class="co2-bubble">
        {selectedDietLeft.co2.toFixed(2)} kg CO₂/day
      </div>
    </div>

    <!-- Right CO₂ Emission Meter (Vertical) -->
    <div class="emission-meter-container">
      <h4>CO₂ Emission for {selectedDietRight.name}</h4>
      <div class="meter">
        <div 
          class="meter-fill" 
          style="height: {Math.min(100, (selectedDietRight.co2 * 10))}%" 
          transition:scale={{ duration: 300 }}
        ></div>
      </div>
      <div class="co2-bubble">
        {selectedDietRight.co2.toFixed(2)} kg CO₂/day
      </div>
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
            transition:scale={{ duration: 150 }}
            class="diet-button"
          >
            <span class="icon">{icon}</span> <span>{name}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Bottom Section: Diet vs Activity Comparison -->
  <div class="selection-container">
    <!-- Left Diet Selection for Activity Comparison -->
    <div class="selection diet">
      <h3>Select your diet:</h3>
      <div class="options">
        {#each dietOptions as { name, co2, icon, tooltip }}
          <button
            class:selected={selectedDietLeft.name === name}
            on:click={() => selectedDietLeft = { name, co2, icon, tooltip }}
            title={tooltip}
            transition:scale={{ duration: 150 }}
            class="diet-button"
          >
            <span class="icon">{icon}</span> <span>{name}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Comparison Icons and Message (In the Middle) -->
    <div class="comparison-container">
      <div class="activity-container">
        {#each Array(Math.round(selectedActivity.co2 / selectedDietLeft.co2)) as _, index}
          <span class="icon">{selectedDietLeft.icon}</span>
        {/each}
      </div>
      <div class="activity-label">
        <span>{Math.round(selectedActivity.co2 / selectedDietLeft.co2)} Days of {selectedDietLeft.name} ≈ {selectedActivity.name}</span>
      </div>
    </div>

    <!-- Right Activity Selection -->
    <div class="selection diet">
      <h3>Select your activity:</h3>
      <div class="options">
        {#each activityOptions as { name, co2, icon, tooltip }}
          <button
            class:selected={selectedActivity.name === name}
            on:click={() => selectedActivity = { name, co2, icon, tooltip }}
            title={tooltip}
            transition:scale={{ duration: 150 }}
            class="diet-button activity-button"
          >
            <span class="icon">{icon}</span> <span>{name}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;
    font-family: 'Arial', sans-serif;
  }

  /* Top Section: Comparing Two Diets */
  .selection-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;
    max-width: 1000px;
  }

  /* Each diet selection and meters take up equal space */
  .selection {
    width: 20%; /* Fixed width for each diet selection */
    text-align: center;
    min-height: 200px; /* Prevent the container from growing with text size */
  }

  .selection h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Diet button */
  .diet-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 12px 25px;
    margin: 5px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.2rem;
    text-align: center;
    width: 110%;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .diet-button.selected {
    background-color: #45a049;
  }

  .diet-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .diet-button:active {
    transform: scale(0.98);
  }

  /* Icon layout inside button */
  .icon {
    margin-right: 10px;
    font-size: 1.5rem;
    display: inline-block;
  }

  /* CO₂ Meter Styles */
  .emission-meter-container {
    width: 20%;
    text-align: center;
    margin-top: 1rem;
  }

  .meter {
    width: 100%;
    height: 200px;
    background-color: #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 1rem;
    position: relative;
  }

  .meter-fill {
    background-color: #FF7043;
    width: 100%;
    position: absolute;
    bottom: 0;
    transition: height 0.3s ease-out;
  }

  .co2-bubble {
    position: relative;
    top: 10px;
    width: 90%;
    padding: 10px;
    background-color: #FF7043;
    color: white;
    border-radius: 20px;
    font-size: 1.1rem;
    white-space: nowrap;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  /* Bottom Section: Diet vs Activity Comparison */
  .comparison-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .activity-container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);  /* Ensures 5 items per row */
    gap: 10px;
    justify-content: center;
    align-items: center;  /* Vertically center the icons */
    margin-top: 125px;
    background-color: white;  /* White background for the box */
    padding: 10px;  /* Padding inside the box */
    border-radius: 8px;  /* Optional: rounded corners for the box */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Optional: shadow for the box */
  }

  .icon {
    font-size: 1rem;  /* Icon size */
    text-align: center;  /* Center the icon in its cell */
    margin: 0;  /* No extra margin between icons */
    display: inline-block;
  }

  .activity-label {
    font-size: 1.1rem;
    margin-top: 10px;
    text-align: center;
  }

  .activity-button {
    padding: 12px 25px;
    font-size: 1.1rem;
  }
</style>
