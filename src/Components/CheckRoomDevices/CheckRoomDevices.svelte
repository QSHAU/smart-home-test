<script>
    import { getContext, onMount } from "svelte";
    import api from "../../Data/api";

    const {createFormActive, checkForm, roomId} = getContext('store');
    
    let allDevices;
    const addDevice = () => {
        $checkForm = 'createDevice';
        $createFormActive = !$createFormActive;
    }

    const getAllDevices = async () => {
        const response = await api.get('device');
        
        return response.data.data
    }

    const getRoomDevices = async () => {
        allDevices = (await getAllDevices()).filter((item) => {
            item.room_id === roomId
        })
    }

    onMount(() => {
        getRoomDevices()
        // getAllDevices();
    })

    const checkRoomDevices = async () => {
        // const response = await api.
    }
</script>

<div class="checkRoom">
    <h3 class="checkRoom-title">
        Устройства комнаты
    </h3>
    <!-- {#if $checkRoomDevices?.length}
        <div class="checkRoom-items">
            {#each $checkRoomDevices as roomDevice}
                {roomDevice}
            {/each}
            <button
                class="checkRoom-btn" 
                type="button"
                on:click={addDevice}
            />
        </div>
    {/if} -->
</div>

<style lang="scss">
    .checkRoom {

        &-title {
            font-size: 28px;
            line-height: 1;
            color: #F8F8F8;
            margin-bottom: 32px;
        }
    }
</style>