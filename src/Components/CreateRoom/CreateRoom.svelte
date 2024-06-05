<script>
    import { getContext, onMount } from "svelte";
    import option from "../../Data/option";
    import api from "../../Data/api";

    const {createFormActive, allRooms, checkForm, roomId, checkRoomDevices, refreshRooms} = getContext('store');

    const setFormActive = () => {
        $createFormActive = !$createFormActive;
        $checkForm = 'createRoom';
    }

    const removeRoom = async ( id) => {
        const response = await api.delete(`rooms/delete/${id}`)
        .then(function(response) {
            if(!response.data.success) {
                alert("You can't delete a room if a device is linked to it")
            } else {
                refreshRooms();
                alert(response.data.message)
            }
        })
        return false
    }

    const roomDevices = (e, id) => {
        if(e.target.className.includes('room-item__remove')) return false;
        $roomId = id
        $checkRoomDevices = true;
    }

    onMount(async () => {
        refreshRooms()
    })
</script>
<div class="room">
    <h2 class="room-title">
        Rooms
    </h2>

    <div class="room-items">
        {#if $allRooms?.length}
            {#each $allRooms as room}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="room-item"
                 on:mouseup={(e) => roomDevices(e, room.id)}>
                {room.name}
                <button 
                    class="room-item__remove" 
                    type="button"
                    on:click={() => removeRoom(room.id)}
                    >
                </button>
            </div>
            {/each}
        {/if}
        <button 
            class="add-btn"
            class:isAlone={!$allRooms?.length}
            type="button" 
            on:click={setFormActive} 
        />
    </div>
</div>

<style lang="scss">
    .room {
        border-radius: 8px;
        margin: 0 5px;
        color: #FFF;

        &-title {
            font-size: 16px;
            font-weight: 500;
            color: #FFF;
            margin: 0 0 15px;
        }
        &-items {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 1fr;
            grid-gap: 15px;
            margin-bottom: 15px;
        }

        &-item {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 100px;
            border-radius: 8px;
            padding: 15px;
            background-color: #454545;
            box-shadow: 0 0 0 transparent;
            transition: box-shadow .3s;
            cursor: pointer;
            position: relative;

            &:hover {
                box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.7);
            }

            &__remove {
                width: 20px;
                height: 20px;
                border: none;
                background-color: transparent;
                top: 5px;
                right: 5px;
                cursor: pointer;
                position: absolute;

                &::before,
                &::after {
                    content: '';
                    width: 15px;
                    height: 2px;
                    border-radius: 2px;
                    background-color: #FFF;
                    top: 50%;
                    left: 50%;
                    position: absolute;
                }

                &::before {
                    transform: translate(-50%, -50%) rotate(45deg);
                }

                &::after {
                    transform: translate(-50%, -50%) rotate(-45deg);
                }
            }
        }
    }
</style>