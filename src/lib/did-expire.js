export default function didExpire(id) {

    let lastUpdate = localStorage.getItem('nsis-forum.lastUpdate:' + id);

    // 2629746000 = month
    if ((new Date).getTime() - lastUpdate >= 2629746000) {
        return true;
    }

    return false;
}