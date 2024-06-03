<script>
	import { getContext, onMount, setContext } from "svelte";
    import option from "../option";
    import { writable } from "svelte/store";

    const currentHome = writable(false);
    const isAuth = writable(false);
    const houseId = writable(false);

    setContext('store', {
        currentHome,
        isAuth,
        houseId,
    })
</script>

<slot />