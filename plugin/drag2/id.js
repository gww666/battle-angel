/**
 * 生成组件id
 */
import { REAL_PREFIX, STYLE_PREFIX } from "./prefix";
function random(range = 100000) {
    return parseInt(Math.random() * range + range);
}
export const getRealElData = () => {
    return REAL_PREFIX + "-" + random();
}

export const getStyleElData = () => {
    return STYLE_PREFIX + "-" + random();
}