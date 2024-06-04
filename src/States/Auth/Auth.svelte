<script>
    import { getContext } from "svelte";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";

    const { authStatus } = getContext('store');

</script>

{#if $authStatus}
    <Register/>
{:else}
    <Login />
{/if}
