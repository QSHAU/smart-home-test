<script>
  import Store from "./Data/Store/Store.svelte";
  import Interface from "./Components/Interface/Interface.svelte";

</script>

<div class="page">
  <Store >
    <Interface />
  </Store>
</div>

<style lang="scss">
  .page {
    background-color: #0A182E;
    max-width: 375px;
    width: 100%;
  }
</style>