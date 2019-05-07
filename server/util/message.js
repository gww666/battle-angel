// import {createStore} from "../store";
// const store = createStore();
// import {createStore} from "../store";
import store from "../store";
const postMessage = (data) => {
    window.parent.postMessage(data, "*");
}
import {initDrag, alignCenter} from "./preview-helper";
import {setComConfigById} from "./setConfig";
//接收父页面的postmessage
const events = (type) => {
    const _event = {
        reload(data) {
            console.log("需要刷新");
            let url = data.url;
            window.location.href = url;
        },
        addComponent(data) {
            let {component, pageId} = data;
            store.commit("setCurrentPageId", pageId);
            store.commit("addComponentToList", {pageId, comId: component.id, component});
            //顺便初始化组建的拖拽等事件
            //nextTick
            setTimeout(() => {
                initDrag();
            }, 0);   
        },
        // 删除组件
        deleteThisComponent(data) {
            let {id, group} = data;
            store.commit('deleteComponentById', {id, group})
            setTimeout(() => {
                initDrag();
            }, 0); 
        },
        //更改页面配置
        changePageProps(data) {
            let id = data.id;
            // delete data.id;
            // PSEvent.trigger(id, data);
            PSEvent.trigger(id, data.config);
        },
        //更改组件配置
        changeComponentProps(data) {
            let id = data.id;
            PSEvent.trigger(id, data.config);
            //保存到vuex中
            setComConfigById(id, data.config);

        },
        //获取所有页面配置信息
        getPageConfig(data) {
            // return document.documentElement.outerHTML;
            let {cb} = data;
            postMessage({
                type: cb,
                data: {
                    config: store.state.pageConfig
                }
            });
        },
        //获取某个元素水平居中的left值
        alignCenter(data) {
            alignCenter(data.comId);
        },
        //改变组件的父组件
        changeComParent(data) {
            let {pageId, comId, newParentId, oldParentId, cb} = data;
            let pageConfig = JSON.parse(JSON.stringify(store.state.pageConfig));
            let componentList = pageConfig[pageId].componentList;
            //找到所有的盒子组件
            let obj = {};
            let getBoxComponents = (_componentList) => {
                console.log("_componentList", _componentList);
                _componentList.forEach(item => {
                    if (item.group === "box") {
                        obj[item.id] = item;
                        if (item.config.componentList) {
                            //同时遍历该box组件下面的componentList
                            getBoxComponents(item.config.componentList);
                        }
                    }
                });
            }
            getBoxComponents(componentList);
            
            //代表要从盒子组件移到根页面中
            if (newParentId === "page") {
                let index = 0;
                for (let item of obj[oldParentId].componentList) {
                    if (item.id === comId) {
                        let copy = JSON.parse(JSON.stringify(item));
                        //删除原有的
                        obj[oldParentId].config.componentList.splice(index, 1);
                        //追加到根页面的componentList中
                        componentList.push(copy);
                        break;
                    }
                    index++;
                }
            } else {
                //代表从根页面或盒子组件移动到盒子组件中
                let _list = oldParentId === "page" ? componentList : obj[oldParentId].componentList;
                let index = 0;
                let com = _list.find((item, i) => {
                    if (item.id === comId) {
                        index = i;
                        return item;
                    }
                });
                let copy = JSON.parse(JSON.stringify(com));
                //删除原有的
                _list.splice(index, 1);
                //追加到盒子组件的组件列表中
                if (!obj[newParentId].config.componentList) {
                    obj[newParentId].config.componentList = [];
                }
                obj[newParentId].config.componentList.push(copy);
            }
            //保存到vuex中
            store.commit("setPageConfig", pageConfig);
            //回传父页面，调用compiler接口
            // postMessage({
            //     type: cb,
            //     data: {
            //         componentList
            //     }
            // });
        }
    }
    if (_event[type]) {
        return _event[type];
    }
    console.warn(`没有定义${type}事件的handler`);
    
    return () => {};
}
const receiveMessage = (data) => {
    data = data.data;
    console.log("接收到data", data);
    // data = JSON.parse(data.data);
    events(data.type)(data.data);
    
}
// if (typeof window !== undefined) {
// window.addEventListener("message", receiveMessage, false);
window.addEventListener("message", receiveMessage, false);
// }


