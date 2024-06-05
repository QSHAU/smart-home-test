<script >
    import {getContext, onMount} from 'svelte';
    import Auth from '../../States/Auth/Auth.svelte';
    import MainView from '../../States/MainView/MainView.svelte';
    import CreateForm from '../CreateForm/CreateForm.svelte';
    import CheckRoomDevices from '../CheckRoomDevices/CheckRoomDevices.svelte';
    import DeviceSetting from '../DeviceSetting/DeviceSetting.svelte';

    const {isAuth, createFormActive, checkRoomDevices, device, refreshRooms, refreshDevices} = getContext('store');

    let userId;

    onMount(() => {
        const token = localStorage.getItem('token');
        userId = localStorage.getItem('userId');
        if($isAuth) {
            refreshRooms();
            refreshDevices();
        }
        if(token) {
            $isAuth = true;
        }
    });
</script>

{#if !$isAuth}
    <Auth />
{:else}
    <MainView />
    {#if $createFormActive}
        <CreateForm />
    {/if}
    {#if $checkRoomDevices}
        <CheckRoomDevices />
    {/if}
    {#if $device}
        <DeviceSetting />
    {/if}
{/if}
