<script>
    import {getContext} from 'svelte';
    import option from '../../Data/option';
    import Auth from '../../States/Auth/Auth.svelte';
    import MainView from '../../States/MainView/MainView.svelte';

    const {isAuth} = getContext('store'); 
</script>
{#if !$isAuth}
    <Auth {option}/>
  {:else}
    <MainView />
{/if}