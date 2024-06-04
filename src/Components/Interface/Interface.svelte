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

    const {isAuth, createFormActive, allRooms, allDevices, checkRoomDevices, device} = getContext('store');

    let userId;

    const checkRooms = async () => {
        const response = await api.get(`rooms/allByHouse/${option?.houseId}`);

        return response;
    }

    const refreshRooms = async () => {
        $allRooms = (await checkRooms()).data.data;
    }

    const checkDevices = async () => {
        const response = await api.get(`device`);

        return response;
    }

    const refreshDevices = async () => {
        $allDevices = (await checkDevices()).data.data
    }

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