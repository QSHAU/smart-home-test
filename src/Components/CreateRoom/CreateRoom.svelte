<script>
  import { onMount } from "svelte";
  import option from "../../Data/option";
  import { getToken, getHouseId } from "../../Data/AuthStore/AuthStore";

    let getAllHouses;
    onMount(async () => {
        const token = getToken();
        const houseId = getHouseId();
        const response = await fetch(`${option?.apiURL}rooms/allByUser/${houseId}`, {
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
</script>
<div class="home">
    <h2 class="home-title">
        Добавить дом
    </h2>
    {#if getAllHouses?.length}
        {#each getAllHouses as house}
            {house.name}
        {/each}
    {/if}
    <button class="appView-btn__add" type="button">
        
    </button>
</div>