export const postMessage = data => {
    document.querySelector(".iframe").contentWindow.postMessage(data, "*");
}