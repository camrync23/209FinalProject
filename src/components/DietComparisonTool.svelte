<script>
    import { onMount } from "svelte";
    
    // Diet and Activity options
    const dietOptions = [
      { name: "Vegan", co2: 1.5 },    // CO2 emissions per day (kg)
      { name: "Vegetarian", co2: 3.0 },
      { name: "Omnivore", co2: 5.0 },
      { name: "Carnivore", co2: 7.0 }
    ];
    
    const activityOptions = [
      { name: "1 Hour of Jet Travel", co2: 100 },
      { name: "Car Travel (100 miles)", co2: 30 },
      { name: "Electricity Use (1 day)", co2: 12 }
    ];
  
    let selectedDiet = dietOptions[0]; // default to Vegan
    let selectedActivity = activityOptions[0]; // default to Jet Travel
  
    let equivalenceMessage = "";
    let funFact = "";
    
    // Function to calculate the equivalence message
    function calculateEquivalence() {
      // Example equivalences for CO2 emissions
      if (selectedDiet.co2 > selectedActivity.co2) {
        equivalenceMessage = `Your ${selectedDiet.name} diet for one day equals ${Math.round(selectedDiet.co2 / selectedActivity.co2)} hours of flying!`;
        funFact = `Did you know? A jet emits around 100kg of CO2 per hour of flight!`;
      } else {
        equivalenceMessage = `Your ${selectedActivity.name} equals about ${Math.round(selectedActivity.co2 / selectedDiet.co2)} days of ${selectedDiet.name} meals!`;
        funFact = `A car emits about 0.4 kg of CO2 per mile driven!`;
      }
    }
  
    // Watch for changes in diet or activity selection
    $: selectedDiet, selectedActivity, calculateEquivalence();
  </script>
  
  <main>
    <!-- Diet and Activity Selection -->
    <div class="selection-container">
      <div class="selection">
        <h3>Select your diet:</h3>
        <div class="options">
          {#each dietOptions as {name, co2}}
            <button class:selected={selectedDiet.name === name} on:click={() => selectedDiet = { name, co2 }}>
              {name}
            </button>
          {/each}
        </div>
      </div>
  
      <div class="selection">
        <h3>Select an activity:</h3>
        <div class="options">
          {#each activityOptions as {name, co2}}
            <button class:selected={selectedActivity.name === name} on:click={() => selectedActivity = { name, co2 }}>
              {name}
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
  
    <!-- CO2 Emission Meter/Overflow -->
    <div class="emission-meter">
      <div class="meter">
        <div class="meter-fill" style="height: {selectedDiet.co2}%"></div>
      </div>
      <div class="emission-bubbles">
        {#each Array(Math.round(selectedDiet.co2)) as _, index (index)}
          <div class="bubble" style="animation-delay: {index * 0.1}s"></div>
        {/each}
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
  
    .selection-container {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-bottom: 2rem;
    }
  
    .selection h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  
    .options {
      display: flex;
      flex-direction: column;
    }
  
    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      border-radius: 5px;
    }
  
    button.selected {
      background-color: #45a049;
    }
  
    .equivalence-message {
      text-align: center;
      margin-top: 2rem;
      font-size: 1.2rem;
    }
  
    .emission-meter {
      position: relative;
      width: 200px;
      height: 300px;
      margin-top: 2rem;
    }
  
    .meter {
      background-color: #ddd;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
    }
  
    .meter-fill {
      background-color: #ff7043;
      width: 100%;
      transition: height 0.3s ease;
    }
  
    .emission-bubbles {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }
  
    .bubble {
      width: 20px;
      height: 20px;
      background-color: #FFEB3B;
      border-radius: 50%;
      margin: 5px;
      opacity: 0.8;
      animation: floatBubble 4s ease-in-out infinite;
    }
  
    @keyframes floatBubble {
      0% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-30px) scale(1.5); }
      100% { transform: translateY(0) scale(1); }
    }
  </style>
  
