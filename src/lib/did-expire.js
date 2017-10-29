let didExpire = (data, interval = 'weekly') => {

    const now = Date.now();
    const json = JSON.parse(data);
    const indexTime = json.indexed || 1;

    const period = now - indexTime;

    if (interval === 'monthly' && period >= 2629746000) {
        // monthly
        return true;
    } else if (interval === 'weekly' && period >= 604800000) {
        // weekly
        return true;
    } else if (interval === 'daily' && period >= 86400000) {
        // daily
        return true;
    } else if (isNaN(interval) === false && period >= interval) {
        // custom
        return true;
    }
 
    return false;
};

export { didExpire };
