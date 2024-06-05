<script >
    import {getContext, onMount} from 'svelte';
    import Auth from '../../States/Auth/Auth.svelte';
    import MainView from '../../States/MainView/MainView.svelte';
    import CreateForm from '../CreateForm/CreateForm.svelte';
    import { loginUser } from '../../Data/AuthStore/AuthStore';
    import api from '../../Data/api';
    import option from '../../Data/option';
    import CheckRoomDevices from '../CheckRoomDevices/CheckRoomDevices.svelte';
    import DeviceSetting from '../DeviceSetting/DeviceSetting.svelte';

    const {isAuth, createFormActive, allRooms, allDevices, checkRoomDevices, device, refreshRooms, refreshDevices} = getContext('store');

    let userId;

    onMount(() => {
        const token = localStorage.getItem('token');
        userId = localStorage.getItem('userId');
        refreshRooms();
        refreshDevices();
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
        <CreateForm />
    {/if}
    <!-- {#if $checkRoomDevices}

    {/if} -->
    <!-- <CheckRoomDevices /> -->
    {#if $device}
        <DeviceSetting />
    {/if}
{/if}