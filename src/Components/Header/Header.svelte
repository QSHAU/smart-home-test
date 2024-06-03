<script>
  import { getContext } from "svelte";

    const {currentHome} = getContext('store')
</script>
<header class="header">
    <button class="header-btn" type="button">
        {$currentHome}
    </button>
    <div class="header__wrapper">
        <button class="header__settings" type="button"></button>
        <button class="header__add" type="button"></button>
    </div>
</header>