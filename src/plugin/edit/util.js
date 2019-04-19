/**
 * 生成组件id
 */
function random(range = 100000) {
    return parseInt(Math.random() * range + range);
}

export const generatorId = () => {
    return "" + random();
}