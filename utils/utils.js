function transformMilisecondsToSeconds(miliseconds) {
    return (miliseconds / 1000)?.toFixed(2);
}

export {
    transformMilisecondsToSeconds
}