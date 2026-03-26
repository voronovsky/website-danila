document.addEventListener("DOMContentLoaded", () => {
    const logInButton = document.querySelector('.login_form_enterButton')
    const formLog = document.querySelector('#user_login')
    const formPass = document.querySelector('#user_password')
    console.log('Privet pidarasy')

    async function getUserInfo(login, password) {
        try {
            const url = new URL('/api/logInUser', window.location.origin);
            url.searchParams.append('login', login);
            url.searchParams.append('password', password);

            const getUserInfoResponse = await fetch(url, {
                method: 'GET'
            });
            
            const data = getUserInfoResponse.text;
            return data;
        }catch (error) {
            console.error('Ошибка при вызове API:', error.getUserInfoResponse?.data || error.message);
        }        
    }


    if (logInButton) {
        logInButton.addEventListener('click', (e) => {
            let logValue = formLog.value;
            let passValue = formPass.value;
            
            const info = getUserInfo(logValue, passValue);
            localStorage.setItem('user_id', info.id);          
            localStorage.setItem('user_fio', info.full_name);
        });
    }
});