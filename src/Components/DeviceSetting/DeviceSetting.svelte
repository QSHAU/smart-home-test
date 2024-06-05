<script>
    import { fade } from 'svelte/transition';
    import {getContext, onMount} from 'svelte';
    import api from '../../Data/api';
    import option from '../../Data/option';

    const {allRooms, roomId, device, refreshRooms, refreshDevices} = getContext('store');
    
    let nameDevice

    const roomDevices = (id) => {
        $roomId = id
    }

    const attachDevice = async () => {
        await api.put(`device/attachDevice/${$device?.id}`, {
            house_id: option?.houseId,
            room_id: $roomId
        })
        .then(function(response) {
            alert(response?.data?.message)
        })
        .catch(function(response) {
            alert('Something went wrong')
            console.log(response?.data?.message)
        })
    }

    const changeDeviceName = async (e) => {
        e.preventDefault();
        if(!nameDevice?.length) return;
        await api.put(`device/update/${$device?.id}`, {
            name: nameDevice,
            type: $device?.type
        })
        .then(function(response) {
            alert(response?.data?.message)
        })
        .catch(function(response) {
            alert('Something went wrong')
            console.log(response?.data?.message)
        })
    }

    const closeDeviceSettings = () => {
        $roomId = false;
        $device = false;
    }

    onMount(() => {
        refreshRooms();
        refreshDevices();
        if($device?.room_id) {
            $roomId = $device?.room_id
        }
    })
</script>

<div class="deviceSettings"
     transition:fade
     >
    <div class="deviceSettings-rename">
        <h3 class="deviceSettings-title">
            Device settings
        </h3>
        <form class="deviceSettings-form"
             on:submit={(e) => changeDeviceName(e)}>
            <label class="deviceSettings-label">
                <span>
                    New device name
                </span>
                <input 
                    type="text" 
                    bind:value={nameDevice}
                    placeholder="Roboboi"
                >
            </label>
            <button type="submit">
                Update device name
            </button>
        </form>
    </div>
    <div class="deviceSettings-attach">
        <h3 class="deviceSettings-title">
            Attach device
        </h3>
        <span class="deviceSettings-rooms">Rooms</span>
        {#if $allRooms.length}
            <div class="deviceSettings-items">
                {#each $allRooms as room}
                <div class="deviceSettings-item"
                    class:active={room?.id === $roomId}
                    on:click={() => roomDevices(room?.id)}>
                    {room?.name}  
                </div>
                {/each}
            </div>
            <button 
                class="deviceSettings-attach__btn" 
                type="button"
                on:click={attachDevice}
            >
                Attach device
            </button>
        {:else}
            No rooms available
        {/if}
    </div>
    <button 
        class="deviceSettings-close" 
        type="button"
        on:click={closeDeviceSettings}
    />
</div>

<style lang="scss">
    .deviceSettings {
        width: 100%;
        height: 100%;
        color: #FFF;
        padding: 15px;
        background-color: #282424;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;

        &-title {
            font-size: 28px;
            color: #F8F8F8;
            margin: 0 0 25px;
        }

        &-rename {
            margin-bottom: 40px;
        }

        &-label {
            display: flex;
            flex-direction: column;

            span {
                display: block;
                font-size: 12px;
                color: #f8f8f8;
                margin-bottom: 5px;
                padding-left: 16px;
            }

            input {
                font-size: 16px;
                line-height: 18px;
                font-weight: 500;
                color: #FFF;
                padding: 8px 16px;
                border-radius: 12px;
                background-color: transparent;
                border: 1px solid #f8f8f8;
                outline: none;
                margin-bottom: 15px;

                &::placeholder {
                    color: #ccc;
                    font-weight: 400;
                }
            }
        }

        &-rooms {
            display: block;
            margin-bottom: 15px;
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
            border: 1px solid transparent;
            box-shadow: 0 0 0 transparent;
            transition: all 0.3s;
            cursor: pointer;
            position: relative;

            &:hover {
                box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.7);
            }

            &.active {
                border: 1px solid #FFB267;
            }
        }

        button {
            display: block;
            width: 200px;
            font-size: 17px;
            line-height: 24px;
            font-weight: 500;
            color: #211D1D;
            background-color: #FFB267;
            padding: 20px;
            margin-top: auto;
            outline: none;
            border: none;
            cursor: pointer;
            margin: 0 auto;
            border-radius: 20px;
            transition: box-shadow .3s;

            &:hover {
                box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.7);
            }
        }

        .deviceSettings-close {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: none;
            background-color: transparent;
            top: 10px;
            right: 10px;
            cursor: pointer;
            border-radius: 0;
            box-shadow: none;
            position: absolute;

            &::before,
            &::after {
                content: '';
                width: 15px;
                height: 2px;
                border-radius: 2px;
                background-color: #fff;
                top: 50%;
                left: 50%;
                position: absolute;
            }

            &::before {
                transform: translate(-50%, -50%) rotate(-45deg);
            }

            &::after {
                transform: translate(-50%, -50%) rotate(45deg);
            }

            &:hover {
                box-shadow: none;
            }
        }
    }
</style>