<script>
  import { getContext } from "svelte";

    const {currentHome, isAuth} = getContext('store');

</script>
<header class="header">
    {#if $isAuth}
        <button class="header-btn" type="button">
            {$currentHome}
        </button>
        <div class="header__wrapper">
            <button class="header__settings" type="button"></button>
            <button class="header__add" type="button"></button>
        </div>
    {:else}
        <button class="header__wrapper">
            <button class="header__login" type="button">Войти</button>
            <button class="header__settings" type="button"></button>
        </button>
    {/if}

</header>