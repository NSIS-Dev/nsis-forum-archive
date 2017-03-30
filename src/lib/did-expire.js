export default function didExpire(data, interval = 'weekly') {

    const now = Date.now();
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
        console.log('Custom expiration date met');
        return true;
    }
 
    return false;
}