<script>
    export let showModal = false; // Control visibility of the modal
    export let onClose = () => {}; // Callback for closing the modal
  
    const closeModal = () => {
      showModal = false;
      onClose(); // Notify parent to update state
    };
  </script>
  
  <div class="modal-backdrop" style:display={showModal ? 'block' : 'none'} on:click={closeModal}></div>
  <div class="modal" style:display={showModal ? 'block' : 'none'}>
    <div class="modal-content">
      <button class="close-btn" on:click={closeModal}>&times;</button>
      <h2>🌍 Is Your Food Contributing to Global Warming?</h2>
      <p>
        Every bite you take has an impact. Discover how food production affects the environment and explore tools to make more sustainable choices.
      </p>
      <p>
        Join us in uncovering the surprising connections between your plate and the planet.
      </p>
      <button class="explore-btn" on:click={closeModal}>Explore Now</button>
    </div>
  </div>
  
  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
  
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      z-index: 1001;
      max-width: 500px;
      padding: 20px;
      text-align: center;
    }
  
    .modal-content {
      position: relative;
    }
  
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #333;
    }
  
    .close-btn:hover {
      color: red;
    }
  
    .explore-btn {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007b5e;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
    }
  
    .explore-btn:hover {
      background-color: #005a42;
    }
  </style>
  