<script>
    let getAllDevices;
</script>

<div class="device">
    <h2 class="device-title">
        Добавить устройство
    </h2>
    {#if getAllDevices?.length}
        {#each getAllDevices as device}
            {device.name}
        {/each}
    {/if}
    <button class="appView-btn__add add-btn" type="button">
        
    </button>
</div>