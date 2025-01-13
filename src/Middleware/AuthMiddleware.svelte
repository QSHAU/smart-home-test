<script>
    import { navigate } from "svelte-routing";

    export let isAuthenticated = false;
    export let falseRedirectTo = '/login';
    export let trueRedirectTo = '/smart-home';

    if(!isAuthenticated) {
        navigate(falseRedirectTo, {replace: true})
    } else {
        navigate(trueRedirectTo, {replace: true})
    }
</script>

<slot />