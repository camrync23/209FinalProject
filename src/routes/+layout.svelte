<script>
  export let title = "Environmental Impact of Food Production";
  import '../styles/styles.css';
</script>

<header>
  <h1>{title}</h1>
  <p>Explore the relationship between food production and greenhouse gas emissions.</p>
</header>

<slot />

<footer class="custom-footer">
  <p>
    Data Source: <a href="https://www.fao.org" target="_blank">FAO</a>
  </p>
</footer>

<style>
  /* General footer styling */
  .custom-footer {
    background-color: #f4f4f4; /* Light gray background */
    color: #333; /* Dark text for readability */
    padding: 10px 20px;
    text-align: center;
    border-top: 2px solid #ccc; /* Subtle top border */
  }

  .custom-footer a {
    color: #007b5e; /* Dark green for the link */
    text-decoration: none; /* Remove underline */
  }

  .custom-footer a:hover {
    text-decoration: underline; /* Add underline on hover for accessibility */
  }
</style>


  