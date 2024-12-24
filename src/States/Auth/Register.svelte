<script>
    import { getContext } from "svelte";
    import api from "../../Data/api";
    import { link } from 'svelte-routing';

    
    let username;
    let email;
    let password;

    const formSubmit = async (e) => {
        e.preventDefault();

        await api.post('user/create', {
            username,
            email,
            password,
        })
        .then(function(response) {
            alert(response.data.message);
            return response.data;
        })
        .catch(function(response) {
            console.error('Error', response.message)
        })

        return false
    }
</script>

<div class="register">
    <form class="register-form" on:submit={(e) => formSubmit(e)}>
        <label class="register-label">
            Login
            <input type="text" bind:value={username} placeholder="login">
        </label>
        <label class="register-label">
            Email
            <input type="email" bind:value={email} placeholder="email">
        </label>
        <label class="register-label">
            Password
            <input type="password" bind:value={password} placeholder="password">
        </label>
        <button type="submit">Create account</button>
    </form>
    <a class="log-btn" href="/login" use:link>Sign In</a>
</div>

<style lang="scss">
    .register {
        display: flex;
        flex-direction: column;
        width: 100%;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        position: absolute;

        &-form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            grid-gap: 10px;
            margin-bottom: 15px;
        }

        &-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            line-height: 14px;
            color: #fff;
        }

        input {
            display: block;
            font-size: 16px;
            font-weight: 500;
            line-height: 1;
            max-width: 220px;
            border: 1px solid #ccc;
            padding: 8px 12px;
            border-radius: 10px;
            color: #fff;
            background-color: transparent;
            outline: none;

            &::placeholder {
                color: #ccc;
            }
        }

        button[type="submit"] {
            font-size: 17px;
            line-height: 24px;
            font-weight: 500;
            padding: 20px;
            border-radius: 16px;
            max-width: 200px;
            align-self: center;
            border: none;
            background-color: #FFB267;
            margin-top: 25px;
            cursor: pointer;
            transition: box-shadow .3s;

            &:hover {
                box-shadow: 0 0 8px rgba(255, 255, 255, .6);
            }
        }

        & .log-btn {
            display: inline-block;
            font-size: 17px;
            line-height: 24px;
            font-weight: 500;
            color: #000;
            text-decoration: none;
            padding: 20px;
            border-radius: 16px;
            max-width: 200px;
            align-self: center;
            border: none;
            background-color: #FFB267;
            margin: 25px auto 0;
            cursor: pointer;
            transition: box-shadow .3s;

            &:hover {
                box-shadow: 0 0 8px rgba(255, 255, 255, .6);
            }
        }
    }
</style>