import router from '@/router';
import getBrowserFingerprint from '@/scripts/tools/get-browser-fingerprint';
import require from '@/scripts/require';

function refreshToken(next: (token: string | null, finger: string | null) => void) {
    let token = localStorage.getItem('access_token')
    if (token == null) {
        next(null, null)
        return
    }
    let payload = JSON.parse(atob(token.split(".")[1]));
    let exp = payload["exp"]
    let dateNow = Date.now()
    let finger = getBrowserFingerprint() || "no-fingerprint"
    if (dateNow > exp * 1000) {
        require("/auth/refresh",
            {
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
                localStorage.setItem('access_token', token || "");
                next('Bearer ' + token, finger)
            }).catch(error => {
                localStorage.removeItem('access_token')
                console.error('error:', error);
                if (router.currentRoute.value.path == '/') {
                    router.go(0)
                } else {
                    router.push('/')
                }
                next(null, null)
            })
    } else {
        next('Bearer ' + token, finger)
    }
}

export default refreshToken;