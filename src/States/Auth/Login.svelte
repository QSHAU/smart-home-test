<script>
    import { getContext } from "svelte";
  
      export let option;
  
      const {isAuth} = getContext('store');
      
      let email;
      let password;
      let userData = {};
  
      const formSubmit = async (e) => {
            e.preventDefault();
  
            userData = {
                email,
                password,
            }
        
          const response = await fetch(`${option?.apiURL}auth`, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
          });
              
          const json = await response.json();
          
          if (json.success) {
            localStorage.setItem('token', json.data.access_token);
            localStorage.setItem('userId', json.data.id);
            localStorage.setItem('houseId', '3');
            $isAuth = true;
            alert('You have success login')
            return json.data;
          } else {
              console.error('Error', json.message)
          }
      }
  </script>
  
  <form on:submit={(e) => formSubmit(e)}>
      <input type="email" bind:value={email} placeholder="email">
      <input type="password" bind:value={password} placeholder="password">
      <button type="submit">submit</button>
  </form>
  
  