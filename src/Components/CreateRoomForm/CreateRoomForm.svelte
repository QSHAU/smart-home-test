<script>
    import { getContext } from "svelte";
    import { fade } from "svelte/transition";
    import option from "../../Data/option";
    import { getToken } from "../../Data/AuthStore/AuthStore";

    const {createFormActive} = getContext('store')
    
    let nameRoom;
    let message;
    let userData = {};
    const createRoom = async (e) => {
        e.preventDefault();
        const token = getToken();

        if(!token) {
            message = "You're gay";
            return
        }

        userData = {
            name: nameRoom,
            house_id: option?.houseId
        }

        const response = await fetch(`${option?.apiURL}rooms/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
        
        const json = await response.json();

        if (json.success) {
            console.log(json);
            return json.data;
        } else {
            console.error('Error', json.message)
        }
    }

    const createFormDisable = () => {
        $createFormActive = !$createFormActive
    }
</script>
<div class="createRoom"
     transition:fade>
    <h3 class="createRoom__title">
        Добавление комнаты
    </h3>
    <form class="createRoom-form" on:submit={(e) => createRoom(e)}>
        <label class="name">
            Название
            <input 
                bind:value={nameRoom}
                type="text" 
                class="name-input" 
                placeholder="Чача" 
                maxlength="20"
                >
        </label>
    
        <button type="submit">
            Создать новую комнату
        </button>
    </form>
    <button class="createRoom-close" on:click={createFormDisable}></button>
</div>

<style lang="scss">
    .createRoom {
        width: 100%;
        height: 100%;
        background-color: #0A182E;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;

        &-close {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: none;
            background-color: transparent;
            top: 10px;
            right: 10px;
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
    }
</style>