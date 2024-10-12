function transfromMilisecondsToSeconds(miliseconds) {
    return (miliseconds / 1000)?.toFixed(2);
}

export {
    transfromMilisecondsToSeconds
}