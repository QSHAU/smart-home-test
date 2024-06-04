<script >
    import {getContext, onMount} from 'svelte';
    import Auth from '../../States/Auth/Auth.svelte';
    import MainView from '../../States/MainView/MainView.svelte';
    import CreateRoomForm from '../CreateRoomForm/CreateRoomForm.svelte';
    import { loginUser } from '../../Data/AuthStore/AuthStore';

    const {isAuth, createFormActive} = getContext('store');

    onMount(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if(token) {
            $isAuth = true;
            loginUser(token, userId);
        }
    });
</script>

{#if !$isAuth}
    <Auth />
{:else}
    <MainView />
    {#if $createFormActive}
        <CreateRoomForm />
    {/if}
{/if}
  <!-- <MainView />
  <CreateForm /> -->