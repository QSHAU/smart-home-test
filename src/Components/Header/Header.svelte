<script>
    import { getContext } from "svelte";
    import api from "../../Data/api";
    import option from "../../Data/option";

    const {isAuth} = getContext('store');

    const getHouseName = async () => {
        const response = await api.get(`house/${option?.houseId}`)
        
        return response.data.data.name
    }

    const logout = () => {
        localStorage.clear();
        $isAuth = false;
        alert('You have been logout');
    }
    
</script>
<header class="header">
    {#if $isAuth}
        <h3 class="header-name">
            {#await getHouseName()}
                Wait
            {:then name} 
                {name}
            {/await}
        </h3>
        <button 
            class="header__logout" 
            type="button"
            on:click={logout}
        >Logout</button>
    {:else}
        <button 
            class="header__login" 
            type="button"
            
        >Login</button>
    {/if}
</header>

<style lang="scss">
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-name {
            font-size: 20px;
            line-height: 24px;
            color: #F8F8F8;
            margin: 0;
            margin-right: 15px;
        }

        &__logout {
            display: inline-block;
            font-size: 12px;
            line-height: 16px;
            color: #211D1D;
            border: none;
            background-color: #FFB267;
            padding: 6px 12px;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 0 0 transparent;
            transition: box-shadow .3s;

            &:hover {
                box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.7);
            }
        }
    }
</style>