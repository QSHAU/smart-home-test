<script>
  import { getContext } from "svelte";
    import api from "../../Data/api";

    const {createFormActive, checkForm, allDevices, device, allRooms, favouriteDevices, refreshDevices} = getContext('store');

    const setFormActive = () => {
        $createFormActive = !$createFormActive;
        $checkForm = 'createDevice';
    }

    const removeDevice = async (id) => {
        await api.delete(`device/delete/${id}`)
        .then(function(response) {
            refreshDevices()
            alert(response.data.message)
        })
        return false
    }

    const deviceClick = (e, deviceItem) => {
        if(e.target?.className.includes('device-item__remove') || e.target?.className.includes('device-item__favourite')) return false;
        $device = deviceItem
    }

    const setDeviceFavourite = (device) => {
        let isDeviceFavourite = $favouriteDevices.includes(device?.id)
        
        if(isDeviceFavourite) {
            $favouriteDevices = $favouriteDevices.filter(favourite => {
                return favourite !== device?.id
            })
        } else {
            $favouriteDevices.push(device?.id);
        }
        localStorage.setItem('favouriteItems', JSON.stringify($favouriteDevices))
        $favouriteDevices = $favouriteDevices
    }


</script>

<div class="device">
    <h2 class="device-title">
        Devices
    </h2>
    <div class="device-items">
        {#if $allDevices?.length}
            {#each $allDevices as device}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="device-item"
                    on:click={(e) => deviceClick(e, device)}>
                    {device.name}
                    <span class="device-item__type">
                        {device?.type}
                    </span>
                    <button class="device-item__favourite"
                        class:isActive={$favouriteDevices && $favouriteDevices.includes(device?.id)}
                        on:click={() => setDeviceFavourite(device)}
                    >
                    </button>
                    <span class="device-item__room">
                        {#if $allRooms}
                            {$allRooms.filter(
                                item => {
                                    return device?.room_id === item?.id
                                })
                                ?.[0]?.name || 
                                'Not attached'
                            }
                        {:else}
                            No rooms found
                        {/if}
                    </span>
                    <button
                        class="device-item__remove"
                        type="button"
                        on:click={() => removeDevice(device.id)}
                    />
                </div>
            {/each}

        {/if}
        <button 
            class="add-btn"
            class:isAlone={!$allDevices?.length}
            type="button"
            on:click={setFormActive}
        />
    </div>
</div>

<style lang="scss">
    .device {
        margin: 0 5px 15px;
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
            transition: box-shadow 0.3s;
            cursor: pointer;
            position: relative;

            &:hover {
                box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.7);
            }

            &__type,
            &__room {
                font-size: 12px;
                line-height: 14px;
                color: rgba(255, 255, 255, 0.6);
                text-transform: capitalize;
                transform: translateX(-50%);
                bottom: 5px;
                left: 50%;
                position: absolute;
            }

            &__room {
                bottom: unset;
                top: 10px;
                left: 10px;
                transform: unset;
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

            &__favourite {
                width: 25px;
                height: 25px;
                background-color: transparent;
                padding: 0;
                border: none;
                cursor: pointer;
                left: 5px;
                bottom: 5px;
                position: absolute;

                &::before {
                    content: '';
                    width: 20px;
                    height: 20px;
                    background-image: url(../../../public/icons/favourite.png);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    filter: invert(1);
                    transition: all .3s;
                    opacity: .6;
                    transform: translate(-50%, -50%);
                    top: 50%;
                    left: 50%;
                    position: absolute;
                }

                &.isActive::before {
                    opacity: 1;
                    filter: invert(0);
                }
            }
        }
    }
</style>