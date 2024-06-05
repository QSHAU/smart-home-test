<script>
    import { getContext } from "svelte";
    import { fade } from "svelte/transition";
    import option from "../../Data/option";
    import api from "../../Data/api";

    const {createFormActive, allRooms, checkForm, allDevices} = getContext('store')
    
    let nameRoom,
        nameDevice,
        typeDevice;

    const checkRooms = async () => {
        const response = await api.get(`rooms/allByHouse/${option?.houseId}`);

        return response;
    }

    const choosedDevice = (type) => {
        typeDevice = type;
    }

    const refreshRooms = async () => {
        $allRooms = (await checkRooms()).data.data;
    }

    const createFormDisable = () => {
        $createFormActive = !$createFormActive;
    }

    const checkDevices = async () => {
        const response = await api.get(`device`);

        return response;
    }

    const refreshDevices = async () => {
        $allDevices = (await checkDevices()).data.data
    }


    const createForm = async (e) => {
        e.preventDefault();
        if($checkForm === 'createRoom') {
            if(!nameRoom?.length) {
                alert('Please, type something')
                return false;
            }
            const response = await api.post('rooms/create', {
                name: nameRoom,
                house_id: option?.houseId
            })
            .then(function (response) {
                refreshRooms();
                alert('The room has been successfully created')
                createFormDisable();
                $checkForm = false;
            })
            .catch(function(response) {
                console.log('error:', response)
            })
            return response;
        } else if ($checkForm === 'createDevice') {
            if(!nameDevice) {
                alert("Please, type something")
                return false
            } else if(!typeDevice) {
                alert("Please, choose something")
                return false;
            }
            const response = await api.post('device/create', {
                name: nameDevice,
                type: typeDevice,
            })
            .then(function (response) {
                $checkForm = false;
                alert('The device has been successfully created')
                refreshDevices()
                createFormDisable();
            })
            .catch(function(response) {
                console.log('error:', response)
            })
            return response;
        }
    }
</script>
<div class="createForm"
     transition:fade
     on:outroend={() => ($checkForm = false)}>
    <h3 class="createForm__title">
        {$checkForm === 'createRoom' ? 'Room create' : 'Device create'}
    </h3>
    <form class="createForm-form" on:submit={(e) => createForm(e)}>
        {#if $checkForm === 'createRoom'}
            <label class="name">
                Room name
                <input 
                    bind:value={nameRoom}
                    type="text" 
                    class="name-input" 
                    placeholder="Bedroom"
                    maxlength="20"
                    >
            </label>
        {:else if $checkForm === 'createDevice'}
            <label class="name">
                Device name
                <input type="text" 
                    class="name-input"
                    bind:value={nameDevice}
                    placeholder="Bob"
                >
            </label>
            <div class="device-items">
                {#each option?.deviceList as device}
                    <button
                        class="device-item"
                        class:active={device?.type === typeDevice}
                        on:click={() => choosedDevice(device?.type)}
                        type="button">
                        {device?.name}
                    </button>
                {/each}
            </div>
        {/if}
        <button type="submit">
            {$checkForm === 'createRoom' ? 
                'Create new room' : 
                'Create device'
            }
        </button>
    </form>
    <button 
        class="createForm-close" 
        on:click={createFormDisable}
    />
</div>

<style lang="scss">
    .createForm {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: #211D1D;
        padding: 15px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;

        &__title {
            font-size: 28px;
            line-height: 1;
            color: #F8F8F8;
            margin-bottom: 32px;
        }

        &-form {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        label {
            display: flex;
            flex-direction: column;
            font-size: 16px;
            color: #FFF;
            gap: 5px;
            margin-bottom: 25px;
        }

        .name-input {
            display: block;
            width: 100%;
            font-size: 16px;
            font-weight: 500;
            line-height: 1;
            border-radius: 10px;
            color: #fff;
            border: 1px solid #ccc;
            background-color: transparent;
            padding: 8px 12px;
            outline: none;

            &::placeholder {
                color: #ccc;
            }
        }

        button[type="submit"] {
            display: inline-block;
            width: 100%;
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
            border-radius: 20px;
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
        }

        .device-items {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 100px;
            grid-gap: 12px;
        }

        .device-item {
            font-size: 17px;
            line-height: 24px;
            color: #F8F8F8;
            font-weight: 500;
            background-color: #282424;
            border-radius: 24px;
            border: 1px solid transparent;
            transition: border .3s;
            cursor: pointer;

            &.active {
                border: 1px solid #FFB267;
            }
        }

    }
</style>