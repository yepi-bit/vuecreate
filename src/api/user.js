import request from '../utils/request'

export async function login(data) {

    let results = await request({
        url: window.urlconfig.system + '/oauth/token',
        method: 'post',
        headers: {
            Authorization: 'Basic YW5kcm9pZDphbmRyb2lk',
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: {...data, ...{grant_type: 'password'}}
    });

    if(Object.keys(results).includes('access_token') && results['access_token']){
        return {code: 0, ...results};
    }
    // debugger
    return results;
}


export function getInfo() {
    return request({
        url: window.urlconfig.system + '/user',
        method: 'get'
    })
}

export function logout(token) {
    return request({
        url: window.urlconfig.system + '/principal/exit/'+token,
        method: 'delete'
    })
}
