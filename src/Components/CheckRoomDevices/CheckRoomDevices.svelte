<script>
    import { getContext, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import api from "../../Data/api";

    const {
        createFormActive, 
        checkForm, 
        roomId, 
        allDevices, 
        checkRoomDevices, 
        allRooms, 
        currentRoomDevices,
    } = getContext('store');

    let currentRoom,
        rangeValue = 23;

    const checkRoomClose = () => {
        $checkRoomDevices = false;
        $roomId = false;
    }

    const addNewRoomDevice = () => {
        $checkForm = 'createDevice';
        $createFormActive = !$createFormActive;
    }

    const getRoomDevices = () => {
        if($allDevices) {
            $currentRoomDevices = $allDevices.filter((item) => {
                return item.room_id === $roomId
            })
        }
    }

    const deviceActivate = async (e, id) => {
        let activeStatus = e.target.className.includes('active');

        await api.put(`device/updateInfo/${id}`, {
            active: !activeStatus
        })

        if(activeStatus) {
            e.target.classList.remove('active')
        } else {
            e.target.classList.add('active')
        }
    }

    // const changeTemp = async (id) => {
    //     await api.put(`device/updateInfo/${id}`, {
    //         temperature: rangeValue
    //     })
    // }

    onMount(() => {
        getRoomDevices()
        currentRoom = $allRooms.filter(item => {
            return item?.id === $roomId
        })
    })

</script>

<div class="checkRoom" transition:fade>
    <h3 class="checkRoom-name">
        {#if currentRoom}
            {currentRoom?.[0]?.name}
        {/if}
    </h3>
    <h3 class="checkRoom-title">
        Room devices
    </h3>
    <div class="checkRoom-items">
        {#if $currentRoomDevices?.length}
            {#each $currentRoomDevices as roomDevice}
                <div class="checkRoom-item">
                    <span class="checkRoom-item__type">
                        {roomDevice?.type}
                    </span>
                    {#if roomDevice?.type === 'conditioner' || 
                        roomDevice?.type === 'thermostat' || 
                        roomDevice?.type === 'heating'
                    }
                    <!-- <label class="checkRoom-item__temperature">
                        {rangeValue}
                        <input  
                            type="range"
                            min="16"
                            max="30"
                            bind:value={rangeValue}
                            on:change={() => changeTemp(roomDevice?.id)}
                        />
                    </label> -->
                    {/if}
                    {roomDevice?.name}
                    <button 
                        class="checkRoom-item__activate" 
                        type="button"
                        class:active={roomDevice?.active}
                        on:click={(e) => deviceActivate(e, roomDevice?.id)}
                    >
                        <span></span>
                    </button>
                </div>
            {/each}
        {/if}
        <button 
            class="add-btn"
            class:isAlone={!$currentRoomDevices?.length}
            type="button" 
            on:click={addNewRoomDevice}
        />
        </div>
    <button 
        class="checkRoom-close"
        type="button"
        on:click={checkRoomClose}
    />
</div>

<style lang="scss">
    .checkRoom {
        width: 100%;
        height: 100%;
        overflow: auto;
        color: #FFF;
        padding: 15px;
        background-color: #282424;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;

        &-name {
            font-size: 32px;
        }

        &-title {
            font-size: 28px;
            line-height: 1;
            color: #F8F8F8;
            margin-bottom: 32px;
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
            text-align: center;
            height: 200px;
            border-radius: 8px;
            padding: 15px;
            background-color: #454545;
            position: relative;

            &__type {
                font-size: 12px;
                line-height: 14px;
                color: rgba(255, 255, 255, 0.6);
                text-transform: capitalize;
                transform: translateX(-50%);
                bottom: 5px;
                left: 50%;
                position: absolute;
            }

            &__activate {
                width: 50px;
                height: 26px;
                background-color: #282424;
                border-radius: 20px;
                border: none;
                padding: 0;
                transform: translate(-50%, -50%);
                top: calc(50% - 20px);
                left: 50%;
                transition: background .3s;
                cursor: pointer;
                position: absolute;

                span {
                    display: block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #FFB267;
                    transition: all .3s;
                    transform: translateY(-50%);
                    pointer-events: none;
                    top: 50%;
                    left: 3px;
                    position: absolute;
                }

                &.active {
                    background-color: #FFB267;

                    span {
                        background-color: #282424;
                        left: calc(100% - 23px);
                    }
                }
            }

            &__temperature {
                display: block;
                width: auto;
                height: auto;
                transform: translate(-50%, -50%);
                top: calc(50% + 20px);
                left: 50%;
                position: absolute;
            }
        }

        &-close {
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