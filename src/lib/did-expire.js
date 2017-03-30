export default function didExpire(id, interval = 'weekly') {

    const now = Date.now();
    const data = localStorage.getItem('nsis-forum.thread:' + id);
    const json = JSON.parse(data);
    const indexTime = json.indexed || 0;

    const period = now - indexTime;

    if (interval === 'monthly' && period >= 2629746000) {
        // monthly
        console.warn('Monthly expiration date met, reloading from JSON');
        return true;
    } else if (interval === 'weekly' && period >= 604800000) {
        // weekly
        console.warn('Weekly expiration date met');
        return true;
    } else if (interval === 'daily' && period >= 86400000) {
        // daily
        console.warn('Daily expiration date met');
        return true;
    } else if (isNaN(interval) === false && period >= interval) {
        // custom
        console.warn('Custom expiration date met');
        return true;
    }

    return false;
}