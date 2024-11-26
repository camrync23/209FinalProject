<script>
    import { scale, fade } from "svelte/transition";
    
    // Updated diet options with corresponding CO2 emissions (kg/day)
    const dietOptions = [
      { name: "Vegan", co2: 1.725, icon: "🌱", tooltip: "Plant-based diet, no animal products" },
      { name: "Vegetarian", co2: 2.9, icon: "🥦", tooltip: "Plant-based diet including dairy and eggs" },
      { name: "Pescatarian", co2: 4.15, icon: "🐟", tooltip: "Vegetarian diet with the inclusion of fish and seafood" },
      { name: "Omnivore", co2: 5.575, icon: "🍖", tooltip: "Diet including all food types" },
      { name: "Paleo", co2: 6.55, icon: "🍗", tooltip: "Focuses on meat, fish, vegetables, and fruits without grains, legumes, or dairy " },
      { name: "Keto", co2: 7.275, icon: "🥩", tooltip: "High fat, low carb, meat-based diet" },
    ];
    
    // Updated activity options with corresponding CO2 emissions (kg)
    const activityOptions = [
      { name: "1 Hour of Jet Travel", co2: 100, icon: "✈️", tooltip: "1 hour of flying emits 100 kg of CO2" },
      { name: "Car Travel (100 miles)", co2: 30, icon: "🚗", tooltip: "Car travel emits 30 kg of CO2 per 100 miles" },
      { name: "Electricity Use (1 day)", co2: 12, icon: "💡", tooltip: "Average electricity use per person for 1 day" }
    ];
    
    let selectedDiet = dietOptions[0];  // Default to Vegan
    let selectedActivity = activityOptions[0];  // Default to Jet Travel
    
    let equivalenceMessage = "";
    let funFact = "";
    
    // Function to calculate the equivalence message and fun facts
    function calculateEquivalence() {
      if (selectedDiet.co2 > selectedActivity.co2) {
        equivalenceMessage = `Your ${selectedDiet.name} diet for one day equals ${Math.round(selectedDiet.co2 / selectedActivity.co2)} hours of flying!`;
        funFact = `Did you know? A jet emits around 100g of CO2 per minute of flight!`;
      } else {
        equivalenceMessage = `Your ${selectedActivity.name} equals about ${Math.round(selectedActivity.co2 / selectedDiet.co2)} days of ${selectedDiet.name} meals!`;
        funFact = `A car emits about 0.4g of CO2 per mile driven!`;
      }
    }
    
    // Recalculate equivalence whenever diet or activity changes
    $: selectedDiet, selectedActivity, calculateEquivalence();
  </script>
  
  <main>
    <!-- Horizontal Layout for Diet, Meter, and Activity -->
    <div class="selection-container">
      <!-- Diet Selection (Left) -->
      <div class="selection diet">
        <h3>Select your diet:</h3>
        <div class="options">
          {#each dietOptions as {name, co2, icon, tooltip}}
            <button
              class:selected={selectedDiet.name === name}
              on:click={() => selectedDiet = { name, co2, icon, tooltip }}
              title={tooltip}
              transition:scale={{ duration: 150 }}
              class="diet-button"
            >
              <span>{icon} {name}</span>
            </button>
          {/each}
        </div>
      </div>
  
      <!-- CO₂ Emission Meter (Middle) -->
      <div class="emission-meter-container">
        <h4>CO₂ Emission Meter</h4>
        <div class="meter">
          <!-- CO₂ Fill -->
          <div 
            class="meter-fill" 
            style="width: {Math.min(100, selectedDiet.co2 * 10)}%" 
            transition:scale={{ duration: 300 }}
          >
          </div>
        </div>
        <!-- CO₂ Value Bubble -->
        <div class="co2-bubble">
          {selectedDiet.co2.toFixed(2)} kg CO₂/day
        </div>
      </div>
  
      <!-- Activity Selection (Right) -->
      <div class="selection activity">
        <h3>Select an activity:</h3>
        <div class="options">
          {#each activityOptions as {name, co2, icon, tooltip}}
            <button
              class:selected={selectedActivity.name === name}
              on:click={() => selectedActivity = { name, co2, icon, tooltip }}
              title={tooltip}
              transition:scale={{ duration: 150 }}
              class="activity-button"
            >
              <span>{icon} {name}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  
    <!-- Equivalence Message -->
    <div class="equivalence-message">
      <p>{equivalenceMessage}</p>
      <p><strong>{funFact}</strong></p>
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
  
    .selection-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 2rem;
      max-width: 1000px;
    }
  
    .selection {
      width: 30%;
      text-align: center;
    }
  
    .diet, .activity {
      margin: 0 1rem;
    }
  
    .selection h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  
    .options {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
  
    button.selected {
      background-color: #45a049;
    }
  
    button:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  
    button:active {
      transform: scale(0.98);
    }
  
    .equivalence-message {
      text-align: center;
      margin-top: 2rem;
      font-size: 1.2rem;
    }
  
    /* CO₂ Emission Meter Styles */
    .emission-meter-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 30%;
      text-align: center;
    }
  
    .meter {
      width: 100%;
      height: 30px;
      background-color: #ddd;
      border-radius: 15px;
      overflow: hidden;
      margin-top: 1rem;
      position: relative;
    }
  
    .meter-fill {
      background-color: #FF7043;
      height: 100%;
      position: absolute;
      left: 0;
      transition: width 0.3s ease-out;
    }
  
    /* CO₂ Value Bubble Styling */
    .co2-bubble {
      position: relative;
      top: 10px; /* Adjust position to be right below the meter */
      width: auto;
      padding: 5px 10px;
      background-color: #FF7043;
      color: white;
      border-radius: 20px;
      font-size: 0.9rem;
      white-space: nowrap;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  
    .equivalence-message {
      font-size: 1.1rem;
      margin-top: 1rem;
      max-width: 80%;
      text-align: center;
    }
  </style>
  