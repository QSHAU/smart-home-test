<script>
	import { setContext } from "svelte";
    import { writable } from "svelte/store";

    const isAuth = writable(false);
    const authStatus = writable(false);
    const createFormActive = writable(false);
    const allRooms = writable(false);
    const allDevices = writable(false);
    const checkForm = writable(false);
    const roomId = writable(false);
    // const deviceId = writable(false);
    const device = writable(false);

    setContext('store', {
        isAuth,
        authStatus,
        createFormActive,
        allRooms,
        allDevices,
        roomId,
        checkForm,
        device,
        // deviceId,
    })
</script>

<slot />