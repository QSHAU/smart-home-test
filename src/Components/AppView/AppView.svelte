<script>
  import CreateHome from "../CreateRoom/CreateRoom.svelte";
  import CreateDevice from "../CreateDevice/CreateDevice.svelte";
    
</script>
<div class="appView">
    <CreateHome />
    <CreateDevice />
</div>

<style lang="scss">
    .appView {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding-top: 15px;
    }
</style>