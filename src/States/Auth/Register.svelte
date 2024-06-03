<script>
  import { getContext } from "svelte";

    export let option;

    const {isAuth} = getContext('store');
    
    let username;
    let email;
    let password;
    let userData = {};

    const formSubmit = async (e) => {
        e.preventDefault();

        userData = {
            username,
            email,
            password,
        }

        const response = await fetch(`${option?.apiURL}user/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
            
        const json = await response.json();
        
        if (json.success) {
            alert(json.message);
            $isAuth = true;
            return json.data;
        } else {
            console.error('Error', json.message)
        }
    }
</script>

<form on:submit={(e) => formSubmit(e)}>
    <input type="text" bind:value={username} placeholder="login">
    <input type="email" bind:value={email} placeholder="email">
    <input type="password" bind:value={password} placeholder="password">
    <button type="submit">submit</button>
</form>
