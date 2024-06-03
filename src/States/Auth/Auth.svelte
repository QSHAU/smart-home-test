<script>
  import { getContext } from "svelte";

    export let option;

    const {isAuth} = getContext('store');
    let username;
    let email;
    let password;
    let userData = {};

    const formSubmit = async (status, method, e) => {
        e.preventDefault();

        if(status === 'user/create') {
            userData = {
                username,
                email,
                password,
            }
        } else if (status === 'auth') {
            userData = {
                email,
                password,
            }
        }

        const response = await fetch(`${option?.apiURL}${status}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(userData),
        });
            
        const json = await response.json();
        
        if (json.success) {
            if(status === 'user/create') {
                alert(json.message);
                $isAuth = true;
            }
            return json.data;
        } else {
            console.error('Error', json.message)
        }
    }
</script>
<form on:submit={(e) => formSubmit('user/create', 'POST', e)}>
    <input type="text" bind:value={username} placeholder="login">
    <input type="email" bind:value={email} placeholder="email">
    <input type="password" bind:value={password} placeholder="password">
    <button type="submit">submit</button>
</form>