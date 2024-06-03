<script>
	import { getContext, onMount, setContext } from "svelte";
    import option from "../option";
    import { writable } from "svelte/store";

    onMount(async () => {
        return false;
        const response = await fetch(`${option?.apiURL}auth/isAuth`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });
    });

    const currentHome = writable(false);
    const isAuth = writable(false);

    setContext('store', {
        currentHome,
        isAuth,
    })
</script>

<slot />