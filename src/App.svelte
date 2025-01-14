<script>
  import { Router } from "svelte-routing";
  import LazyRoute from "./Components/LazyRoute/LazyRoute.svelte";
  import Store from "./Data/Store/Store.svelte";
  import api from "./Data/api";
  import AuthMiddleware from "./Middleware/AuthMiddleware.svelte";

  const Login = () => import("./States/Auth/Login.svelte").then(delayModuleLoad);
  const Register = () => import("./States/Auth/Register.svelte").then(delayModuleLoad);
  const MainView = () => import("./States/MainView/MainView.svelte").then(delayModuleLoad);
  const NotFound = () => import("./States/NotFound/NotFound.svelte").then(delayModuleLoad);

  const isAuth = async() => {
    const result = await api.get('/auth/isAuth');
    return result.data.success;
  }

  const delayModuleLoad = module =>
    new Promise(res =>
      setTimeout(() => res(module), Math.random() * 2000),
    );
</script>

<div class="page">
  <Store >
    <Router>
      <LazyRoute path="/login" component={Login} delayMs={500}>
        <h4 class="loader">Loading...</h4>
      </LazyRoute>
      <LazyRoute path="/register" component={Register} delayMs={500}>
        <h4 class="loader">Loading...</h4>
      </LazyRoute>
      {#await isAuth()}
        <h4 class="loader">Loading...</h4>
      {:then autResult}
        <AuthMiddleware isAuthenticated={autResult} falseRedirectTo={'/login'}>
            <LazyRoute path="/smart-home" component={MainView}>
              <h4 class="loader">Loading...</h4>
            </LazyRoute>
          <LazyRoute path="*" component={NotFound} />
        </AuthMiddleware>
      {/await}
    </Router>
  </Store>
</div>

<style lang="scss">
  .page {
    flex-grow: 1;
    background-color: #282424;
    width: 100%;
    margin: auto;
    position: relative;

    .loader {
      font-size: 34px;
      color: #eee;
      margin: 0;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      position: absolute;
    }
  }
</style>