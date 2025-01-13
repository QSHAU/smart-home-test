<script>
    import { getContext } from "svelte";
    import CreateHome from "../CreateRoom/CreateRoom.svelte";
    import CreateDevice from "../CreateDevice/CreateDevice.svelte";
    import CreateForm from "../CreateForm/CreateForm.svelte";
    import CheckRoomDevices from '../CheckRoomDevices/CheckRoomDevices.svelte';
    import DeviceSetting from '../DeviceSetting/DeviceSetting.svelte';

    const {
        createFormActive,
        checkRoomDevices,
        device,
    } = getContext("store");
</script>

<div class="appView">
    <CreateHome />
    <CreateDevice />
    {#if $checkRoomDevices}
        <CheckRoomDevices />
    {/if}
    {#if $device}
        <DeviceSetting />
    {/if}
    {#if $createFormActive}
        <CreateForm />
    {/if}
</div>

<style lang="scss">
    .appView {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding-top: 15px;
    }
</style>
