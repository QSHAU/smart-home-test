<script>
    import Header from "../../Components/Header/Header.svelte";
    import AppView from "../../Components/AppView/AppView.svelte";

</script>
<div class="main"> 
    <Header />
    <AppView />
</div>

<style lang="scss">
    .main {
        padding: 15px;
        max-height: 100vh;
        overflow: auto;
    }
</style>