export function isLoggedIn() {
    var token = localStorage.getItem('id_token'); 
    return (token && token.length); 
}