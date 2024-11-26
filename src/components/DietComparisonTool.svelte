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
        funFact = `A car emits about 0.4g of CO2 per mile driven!`;
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
              <span>{icon} {name}</span>
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
              <span>{icon} {name}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  
    <!-- Bottom Section: Diet vs Activity Comparison -->
    <div class="activity-comparison-container">
      <h3>Compare Diet to Activity</h3>
  
      <!-- Diet and Activity Selection -->
      <div class="selection-container">
        <!-- Diet Selection for Activity Comparison -->
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
                <span>{icon} {name}</span>
              </button>
            {/each}
          </div>
        </div>
  
        <!-- Activity Selection -->
        <div class="selection diet">
          <h3>Select your activity:</h3>
          <div class="options">
            {#each activityOptions as { name, co2, icon, tooltip }}
              <button
                class:selected={selectedActivity.name === name}
                on:click={() => selectedActivity = { name, co2, icon, tooltip }}
                title={tooltip}
                transition:scale={{ duration: 150 }}
                class="diet-button"
              >
                <span>{icon} {name}</span>
              </button>
            {/each}
          </div>
        </div>
      </div>
  
      <!-- Comparison Icons and Message -->
      <div class="activity-representation">
        <div class="activity-container">
          {#each Array(Math.round(selectedActivity.co2 / selectedDietLeft.co2)) as _, index}
            <span class="icon">{selectedDietLeft.icon}</span>
          {/each}
        </div>
        <div class="activity-label">
          <span>{Math.round(selectedActivity.co2 / selectedDietLeft.co2)} Days of {selectedDietLeft.name} ≈ {selectedActivity.name}</span>
        </div>
      </div>
  
      <!-- Fun Fact -->
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
  
    /* Container for Diets and Meters, keeps everything in a line */
    .selection-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 2rem;
      max-width: 1000px;
    }
  
    /* Each diet selection (Left and Right) and Meters take up equal space */
    .selection {
      width: 20%; /* Fixed width for each diet selection */
      text-align: center;
      min-height: 200px; /* Prevent the container from growing with text size */
    }
  
    .selection h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  
    /* Options inside selection buttons */
    .options {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
    /* Fixed size for diet selection buttons */
    .diet-button {
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
      height: 50px;
      text-align: center;
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
  
    /* CO₂ Meter Styles (Vertical Meters) */
    .emission-meter-container {
      width: 20%; /* Fixed width for each meter */
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
  
    /* CO₂ Bubble Styling */
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
  
    /* Activity Comparison Styling */
    .activity-comparison-container {
      text-align: center;
      margin-top: 2rem;
    }
  
    .activity-representation {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .activity-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .icon {
      font-size: 2rem;
      margin: 0 5px;
    }
  
    .activity-label {
      font-size: 1.1rem;
      margin-top: 10px;
    }
  </style>
  
  