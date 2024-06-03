<script >
    import {getContext, onMount} from 'svelte';
    import Auth from '../../States/Auth/Auth.svelte';
    import MainView from '../../States/MainView/MainView.svelte';
    import CreateForm from '../CreateForm/CreateForm.svelte';
    import { loginUser } from '../../Data/AuthStore/AuthStore';

    const {isAuth} = getContext('store');

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
  <CreateForm />
  {/if}
  <!-- <MainView /> -->
  <!-- <CreateForm /> -->