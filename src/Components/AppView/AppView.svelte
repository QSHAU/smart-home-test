<script>
  import CreateHome from "../CreateRoom/CreateRoom.svelte";
    
</script>
<div class="appView">
    <CreateHome />
    <div class="room">
        <h2 class="room-title">
            Добавить комнату
        </h2>
        <button class="appView-btn__add" type="button">
            
        </button>
    </div>
    <div class="device">
        <h2 class="device-title">
            Добавить устройство
        </h2>
        <button class="appView-btn__add" type="button">

        </button>
    </div>
</div>

<style lang="scss">
    .appView {
        &-btn__add {
            width: 50px;
            height: 50px;

        }
    }
</style>