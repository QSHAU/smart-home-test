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
    flex-grow: 1;
    background-color: #282424;
    max-width: 375px;
    width: 100%;
    margin: auto;
    position: relative;
  }
</style>