<script>
  import { getContext } from "svelte";
    import Header from "../../Components/Header/Header.svelte";

    const {currentHome} = getContext('store');

    $currentHome = 'biba';
</script>
<div class="main"> 
    <Header />
</div>