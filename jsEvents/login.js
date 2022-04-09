async function loginHandler(e) {

    e.preventDefault();
    
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if(email && password) {

        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(res.ok) {
            document.location.replace('/dashboard/')
        } else {
            alert(res.statusText)
        }
    }
}

async function signupHandler(e) {

    e.preventDefault();
    
    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if(username && email && password) {
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(res.ok) {
            document.location.replace('/dashboard/')
        } else {
            alert(res.statusText)
        }
    }
}

async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
document.querySelector('#logout').addEventListener('click', logout);
document.querySelector('#signup-form').addEventListener('submit', signupHandler);
document.querySelector('#login-form').addEventListener('submit', loginHandler);