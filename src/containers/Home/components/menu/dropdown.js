// <script>
// import Vue from "vue";
// import Component from "vue-class-component";
// @Component
// export default class Dropdown extends Vue {
//     left = "";
//     top = "";
//      menuData = [
        //     {
        //         title: "新建项目",
        //     },
        //     {
        //         title: "新建页面",
        //         children: [
        //             {
        //                 title: "flex布局",
                        
        //             },
        //             {
        //                 title: "绝对定位布局",
        //             },
        //         ]
        //     }
        // ];
export const generateMenu = (data, {left, top}) => {
    let div = document.createElement("div");
    div.setAttribute("class", "menu-item-box");
    div.style.left = left;
    div.style.top = top;
    data.forEach(item => {
        let i = document.createElement("div");
        i.setAttribute("class", "item");
        i.onmouseover = (event) => {
            if (!item.children) return;
            // let el = event.target;
            // let left = i.getBoundingClientRect().right + "px";
            let left = i.offsetWidth + "px";
            // let top = i.getBoundingClientRect().top + "px";
            let top = 0;
            i.appendChild(generateMenu(item.children, {left, top}));
        }
        let html = `
            <span>${item.title}</span>
        `;
        i.insertAdjacentHTML("beforeend", html);
        // return i;
        div.appendChild(i);
    });
    return div;
}
// init(menuData, {left, top}) {
//     let menu = this.generateMenu(menuData, {left, top});
//     let box = document.querySelector(".dropdown-menu-box");
//     box.appendChild(menu);
// }
//     render() {
//         return (
//             <div class="dropdown-menu-box"></div>
//         )
//     }
// }
// </script>
// <style lang="scss" scoped>
// // .dropdown-menu-box {
// //     position: absolute;
//     .menu-item-box {
//         background: #fff;
//         width: 200px;
//         position: absolute;

//         .item {
//             border-bottom: 1px solid #f1f1f1;
//             display: flex;
//             box-sizing: border-box;
//             justify-content: space-between;
//             padding: 10px;
//             width: 100%;
//         }
//     }
// // }
// </style>
