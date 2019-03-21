
import getPageName from "../../../utils/gw/getPageName";
import { initComponentsList, initEditComponentsList } from "../initComponents";
export default ({position, part}) => {
    console.log('position',position)
	console.log("part", part);
    let currentPageList = window.manifest[getPageName()][part];
    console.log('currentPageList',currentPageList)
    currentPageList.removeAt(position);
    initComponentsList();
    initEditComponentsList({componentName: "", id: "", part});
}