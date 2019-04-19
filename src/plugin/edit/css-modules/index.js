// style-loader
export default (style) => {
    let str = "";
    for (let key in style) {
        str += `${key}: ${style[key]};`;
    }
    return str;
}