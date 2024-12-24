<script>
  import { Router, Route, navigate } from "svelte-routing";
  import Login from "./States/Auth/Login.svelte";
  import Register from "./States/Auth/Register.svelte";
  import MainView from "./States/MainView/MainView.svelte";
  import NotFound from "./States/NotFound/NotFound.svelte";
  import Store from "./Data/Store/Store.svelte";
  import api from "./Data/api";
  import { onMount } from "svelte";

  const isAuth = async() => {
    const result = await api.get('/auth/isAuth');
		return result.data.success;
  }
  onMount(async() => {
    if(await isAuth()) {
      navigate('/smart-home', { replace: true })
    } else {
      navigate('/login', {replace: true})
    }
  })
</script>

<div class="page">
  <Store >
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/smart-home" component={MainView} />
      <Route path="*" component={NotFound} />
    </Router>
  </Store>
</div>

<style lang="scss">
  .page {
    flex-grow: 1;
    background-color: #282424;
    // max-width: 375px;
    width: 100%;
    margin: auto;
    position: relative;
  }
</style>