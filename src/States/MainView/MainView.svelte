<script>
    import { getContext } from "svelte";
    import Header from "../../Components/Header/Header.svelte";
    import AppView from "../../Components/AppView/AppView.svelte";


    const {currentHome, user, isAuth} = getContext('store');

    $currentHome = 'biba';

    // const logout = () => {
    //     user.set(null);
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('userId');
    //     $isAuth = false;
    // }
</script>
<div class="main"> 
    <Header />
    <AppView />
</div>

<!-- <button on:click={logoutUser}></button> -->