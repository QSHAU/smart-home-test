<script>
    import { getContext, onMount } from "svelte";
    import option from "../../Data/option";
    import { getToken } from "../../Data/AuthStore/AuthStore";

    const {createFormActive} = getContext('store');

    let getAllHouses;
    onMount(async () => {
        const token = getToken();
        const response = await fetch(`${option?.apiURL}rooms/allByHouse/${option?.houseId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            getAllHouses = json.data;
            return json.data;
        } else {
            console.error('Error', json.message)
        }
    })
    
    const setFormActive = () => {
        $createFormActive = !$createFormActive
    }
</script>
<div class="home">
    <h2 class="home-title">
        Добавить комнату
    </h2>
    {#if getAllHouses?.length}
        {#each getAllHouses as house}
            {house.name}
        {/each}
    {/if}
    <button class="appView-btn__add" type="button" on:click={setFormActive} />
</div>