import router from '@/scripts/router'
import getBrowserFingerprint from '@/scripts/tools/get-browser-fingerprint'
import require from '@/scripts/require'


function refreshToken(next) {
    let token = localStorage.getItem('access_token')
    if (token == null) {
        return
    }
    let payload = JSON.parse(atob(token.split(".")[1]));
    let exp = payload["exp"]
    let dateNow = Date.now()
    let finger = getBrowserFingerprint()
    if (dateNow > exp * 1000) {
        require("/auth/refresh", {
            method: "get",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Fingerprint': finger,
            },
        }).then(response => {
            return response.json()
        }).then(data => {
            token = data['access_token'];
            localStorage.setItem('access_token', token);
            console.log('access token: ' + token);
            next('Bearer ' + token, finger)
        }).catch(error => {
            localStorage.removeItem('access_token')
            console.error('error:', error);
            if (router.currentRoute == '/') {
                router.go()
            } else {
                router.push('/')
            }
        })
    } else {
        next('Bearer ' + token, finger)
    }
}

export default refreshToken;