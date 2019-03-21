//接收父页面的postmessage
const events = (type) => {
    const _event = {
        reload(data) {
            console.log("需要刷新");
            let url = data.url;
            // window.location.reload(true);
            // console.log("window.location.href", window.location.href);
            window.location.href = url;
            
        }

    }
    if (_event[type]) {
        return _event[type];
    }
    return () => {};
}
const receiveMessage = (data) => {
    data = data.data;
    console.log("接收到data", data);
    // data = JSON.parse(data.data);
    events(data.type)(data);
    
}
window.addEventListener("message", receiveMessage, false);

