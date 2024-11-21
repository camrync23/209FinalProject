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

  