<script>
	import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import api from "../api";
    import option from "../option";

    const isAuth = writable(false);
    const authStatus = writable(false);
    const createFormActive = writable(false);
    const allRooms = writable(false);
    const allDevices = writable(false);
    const checkForm = writable(false);
    const roomId = writable(false);
    // const deviceId = writable(false);
    const device = writable(false);

    const checkRooms = async () => {
        const response = await api.get(`rooms/allByHouse/${option?.houseId}`);

        return response;
    }

    const checkDevices = async () => {
        const response = await api.get(`device`);

        return response;
    }

    const refreshRooms = async () => {
        $allRooms = (await checkRooms()).data.data;
    }

    const refreshDevices = async () => {
        $allDevices = (await checkDevices()).data.data
    }

    setContext('store', {
        isAuth,
        authStatus,
        createFormActive,
        allRooms,
        allDevices,
        roomId,
        checkForm,
        device,
        refreshRooms,
        refreshDevices
        // deviceId,
    })
</script>

<slot />