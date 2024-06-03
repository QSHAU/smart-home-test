<script>
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import option from "@Data/option";

    let isReg = true;

    const changeAuth = (status) => {
        isReg = status
    }
</script>

{#if isReg}
    <Register {option} />
{:else}
    <Login {option} />
{/if}

<button class="reg-btn" type="button" on:click={() => changeAuth(true)}>Sign Up</button>
<button class="log-btn" type="button" on:click={() => changeAuth(false)}>Sign In</button>