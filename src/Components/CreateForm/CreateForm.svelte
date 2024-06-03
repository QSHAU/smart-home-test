<script>
  import { getContext } from "svelte";
    import option from "../../Data/option";
    import { getToken } from "../../Data/AuthStore/AuthStore";

    const {houseId} = getContext('store');
    
    let nameHouse;
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
            name: nameHouse,
            house_id: $houseId
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
            return json.data;
        } else {
            console.error('Error', json.message)
        }
    }
</script>

<h3 class="createRoom__title">
    Добавление комнаты
</h3>
<form class="createForm" on:submit={(e) => createRoom(e)}>
    <label class="name">
        Название
        <input 
            bind:value={nameHouse}
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

<style lang="scss">

</style>