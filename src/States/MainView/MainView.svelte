<script>
    import { getContext } from "svelte";
    import Header from "../../Components/Header/Header.svelte";
    import AppView from "../../Components/AppView/AppView.svelte";


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

<style lang="scss">
    .main {
        padding: 15px;
    }
</style>