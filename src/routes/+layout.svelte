<script>
    export let title = "Environmental Impact of Food Production";
    import '../styles/styles.css';
  </script>
  
  <header>
    <h1>{title}</h1>
    <p>Explore the relationship between food production and greenhouse gas emissions.</p>
  </header>
  
  <slot />
  
  <footer>
    <p>Data Source: <a href="https://www.fao.org" target="_blank">FAO</a></p>
  </footer>
  
  <style>
    header, footer {
      text-align: center;
      padding: 1em;
      background-color: #f8f9fa;
    }
    footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
  