<script>
	import { getContext, onMount, setContext } from "svelte";
    import { writable } from "svelte/store";

    const currentHome = writable(false);
    const isAuth = writable(false);
    const createFormActive = writable(false);

    setContext('store', {
        currentHome,
        isAuth,
        createFormActive
    })
</script>

<slot />