<script>
    import { getContext, onMount } from "svelte";

    const {createFormActive, checkForm, roomId, allDevices} = getContext('store');

    let test;
    const getRoomDevices = () => {
        test = $allDevices.filter((item) => {
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
        Room devices
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
    <button 
        class="checkRoom-close"
        type="button"
    />
</div>

<style lang="scss">
    .checkRoom {
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
            line-height: 1;
            color: #F8F8F8;
            margin-bottom: 32px;
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