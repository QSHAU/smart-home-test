<script>
    import { Router, Route } from "svelte-routing";
    import { getContext, onMount } from "svelte";

    onMount(() => {
        if(window.location.pathname === '/auth') {
            window.location.href = "/auth/login";
        }
    });

</script>
<Router basepath="/auth">

</Router>