<script>
    import { getContext } from "svelte";
    import { link, navigate } from 'svelte-routing';
    import api from "../../Data/api";

  
    const {isAuth} = getContext('store');
    
    let email;
    let password;
    let userData = {};

    const formSubmit = async (e) => {
        e.preventDefault();
        userData = {
            email,
            password,
        }
        await api.post('auth', 
        {
            email,
            password
        }, 
        { 
            withCredentials: false 
        })
        .then(function (response) {
            localStorage.setItem('token', response.data.data.access_token);
            localStorage.setItem('refreshToken', response.data.data.refresh_token);
            localStorage.setItem('userId', response.data.data.id);
            localStorage.setItem('houseId', '3');
            $isAuth = true;
            alert('You have success login')
            navigate('/smart-home', { replace: true })
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
</script>

<div class="login">
    <form class="login-form" on:submit={(e) => formSubmit(e)}>
        <label class="login-label">
            Email
            <input type="email" bind:value={email} placeholder="email">
        </label>
        <label class="login-label">
            Login
            <input type="password" bind:value={password} placeholder="password">
        </label>
        <button type="submit">Log In</button>
    </form>
    <a class="reg-btn" href="/register" use:link>Sign Up</a>
</div>

<style lang="scss">
    .login {
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

        .reg-btn {
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