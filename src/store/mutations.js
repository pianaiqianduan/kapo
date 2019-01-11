export default ({

    /**获取选中的门店id,用于获取产品列表 */
    chooseStoreObj(state, storeObj) {
        console.log(storeObj)
        state.chooseStoreObj = storeObj
    },

    //从多选选中的产品数组集合
    checkedArr(state, msg) {
        state.checkedArr = msg
    },

    //根据用户是否搜索到产品来改变‘Head’组件中头部右侧的内容
    changeHeaderRight(state, msg) {
        state.headerRight = msg
    },

    //根据跳转页面的不同，控制导航栏中部内容
    isHeaderCenterShow(state, msg) {
        state.isHeaderCenterShow = msg
    },

    //永远不变的数组(箱和袋的并集)
    noChangeList(state, chooseItemArr) {
        state.isHave = false //每次都清空
        state.isHaveArr = [] //每次都清空
        if (state.noChangeList.length) {
            for (let j in chooseItemArr) {
                let flag = false
                for (let i in state.noChangeList) {
                    if (state.noChangeList[i].id == chooseItemArr[j].productSapId) {
                        let obj = {
                            name: state.noChangeList[i].title
                        }
                        state.isHave = true
                        flag = true
                        state.isHaveArr.push(obj)
                    } else {
                        if (i == state.noChangeList.length - 1 && !flag) {
                            let obj = {
                                title: chooseItemArr[j].itemdesc, //产品名称
                                id: chooseItemArr[j].productSapId, //产品id
                                spec: chooseItemArr[j].itemspec, //产品吗描述
                                num: 0, //新增的数量字段
                            }
                            state.noChangeList.push(obj)
                            console.log(state.noChangeList)
                        }
                    }
                }
            }
        } else {
            let item = []
            for (let i in chooseItemArr) { //处理请求到的数据
                let obj = {
                    title: chooseItemArr[i].itemdesc, //产品名称
                    id: chooseItemArr[i].productSapId, //产品id
                    spec: chooseItemArr[i].itemspec, //产品吗描述
                    num: 0, //新增的数量字段
                }
                item.push(obj)
            }
            state.noChangeList = item
        }
    },

    //扫码的情况下和多选情况下 --添加产品(箱)
    scanChooseListBox(state, chooseItemArr) {
        if (state.noChangeList.length) {
            for (let j in chooseItemArr) {
                let flag = false
                for (let i in state.noChangeList) {
                    if (state.noChangeList[i].id == chooseItemArr[j].productSapId) {
                        flag = true
                    } else {
                        if (i == state.noChangeList.length - 1 && !flag) {
                            let obj = {
                                title: chooseItemArr[j].itemdesc, //产品名称
                                id: chooseItemArr[j].productSapId, //产品id
                                spec: chooseItemArr[j].itemspec, //产品吗描述
                                num: 0, //新增的数量字段
                            }
                            state.getChooseList.push(obj) //----------箱
                            console.log(state.getChooseList)
                        }
                    }
                }
            }
        } else {
            let item = []
            for (let i in chooseItemArr) { //处理请求到的数据
                let obj = {
                    title: chooseItemArr[i].itemdesc, //产品名称
                    id: chooseItemArr[i].productSapId, //产品id
                    spec: chooseItemArr[i].itemspec, //产品吗描述
                    num: 0, //新增的数量字段
                }
                item.push(obj)
            }
            state.getChooseList = item
        }
    },
    //扫码的情况下和多选情况下 --添加产品(袋)
    scanChooseListBag(state, chooseItemArr) {
        if (state.noChangeList.length) {
            for (let m in chooseItemArr) {
                let flag = false
                for (let n in state.noChangeList) {
                    if (state.noChangeList[n].id == chooseItemArr[m].productSapId) {
                        flag = true
                    } else {
                        if (n == state.noChangeList.length - 1 && !flag) {
                            let obj = {
                                title: chooseItemArr[m].itemdesc, //产品名称
                                id: chooseItemArr[m].productSapId, //产品id
                                spec: chooseItemArr[m].itemspec, //产品吗描述
                                num: 0, //新增的数量字段
                            }
                            state.getBagList.push(obj) //----------袋
                            console.log(state.getBagList)
                        }
                    }
                }
            }
        } else {
            let item = []
            for (let i in chooseItemArr) { //处理请求到的数据
                let obj = {
                    title: chooseItemArr[i].itemdesc, //产品名称
                    id: chooseItemArr[i].productSapId, //产品id
                    spec: chooseItemArr[i].itemspec, //产品吗描述
                    num: 0, //新增的数量字段
                }
                item.push(obj)
            }
            state.getBagList = item
        }

    },

    //监听产品数量的变化并操作(袋)
    productBagNum(state, obj) {

        for (let k in state.getBagList) {
            if (state.getBagList[k].id == obj.id) {
                if (obj.num != 0) {
                    state.getBagList[k].num = obj.num
                    for (let j in state.getChooseList) {
                        if (state.getBagList[k].id == state.getChooseList[j].id) {
                            state.getChooseList.splice(j, 1)
                        }
                    }
                } else if (obj.num !== "" && obj.num == 0) {
                    state.getChooseList.push(state.getBagList[k])
                }
            }
        }
    },

    //监听产品数量的变化并操作(箱)
    productBoxNum(state, obj) {

        for (let m in state.getChooseList) {
            if (state.getChooseList[m].id == obj.id) {
                if (obj.num != 0) {
                    state.getChooseList[m].num = obj.num
                    for (let n in state.getBagList) {
                        if (state.getChooseList[m].id == state.getBagList[n].id) {
                            state.getBagList.splice(n, 1)
                        }
                    }
                } else if (obj.num !== "" && obj.num == 0) {
                    state.getBagList.push(state.getChooseList[m])
                }
            }

        }
    },

    //点击搜索框右侧取消按钮时，清空选中的集合里的数据
    cancelCheckedArr(state) {
        state.checkedArr = []
    },

    //修改click的状态
    isClick(state, msg) {
        state.isClick = msg
    },

    //删除选中产品----3个数组全部删除
    deletBoxItems(state, itemId) {
        for (let i in state.getChooseList) { //删除数据数组的信息----箱
            if (state.getChooseList[i].id == itemId) {
                state.getChooseList.splice(i, 1)
            }
        }
        for (let m in state.getBagList) { //删除数据数组的信息----袋
            if (state.getBagList[m].id == itemId) {
                state.getBagList.splice(m, 1)
            }
        }

        for (let n in state.noChangeList) { //删除数据数组的信息----noChangeList(箱和袋的并集)
            if (state.noChangeList[n].id == itemId) {
                state.noChangeList.splice(n, 1)
            }
        }
    },

    // 删除选中的产品 ----袋
    deletBagItem(state, itemId) {
        for (let i in state.getChooseList) { //删除数据数组的信息----箱
            if (state.getChooseList[i].id == itemId) {
                state.getChooseList.splice(i, 1)
            }
        }
        for (let m in state.getBagList) { //删除数据数组的信息----袋
            if (state.getBagList[m].id == itemId) {
                state.getBagList.splice(m, 1)
            }
        }
        for (let n in state.noChangeList) { //删除数据数组的信息----noChangeList(箱和袋的并集)
            if (state.noChangeList[n].id == itemId) {
                state.noChangeList.splice(n, 1)
            }
        }
    },

    //去结算
    toClose(state) {
        state.productList = []
        boxArr(state);
        bagArr(state)
    },

    //提交成功后删除getChooseList中的数据
    cancelChooseList(state) {
        state.getChooseList = [] //箱中的数据
        state.getBagList = [] //袋中的数据
        state.noChangeList = [] //永远不变的数组
    },

    //删除getBagList中的数据
    cancelGetBagList(state) {
        state.getBagList = []
    },

    //删除箱袋的并集
    cancelNoChangeList(state) {
        state.noChangeList = []
    },

    //获取单个订单中的信息和产品并组合
    getOrderList(state, arr) {
        let Arr = []
        let arr2 = []
        let arr3 = []
        let obj6
        let obj = {
            name: '门店名称',
            nameValue: arr[0].customerName
        }
        let obj4 = {
            label: "期待送货日期",
            value: arr[0].dbillDate
        }
        let obj5 = {
            label: "订单创建日期",
            value: arr[0].orderDate
        }
        if (arr[0].totalNumber && arr[0].totalPackageNumber) { //产品同时有箱和袋
            obj6 = {
                label: "订单总数量",
                value: "<span style='color:red'>" + arr[0].totalNumber + "</span>" + "箱" + "<span style='color:red'>" + arr[0].totalPackageNumber + "</span>" + "袋"
            }
        } else if (arr[0].totalNumber && !arr[0].totalPackageNumber) { //只有箱
            obj6 = {
                label: "订单总数量",
                value: arr[0].totalNumber + "箱"
            }
        } else if (!arr[0].totalNumber && arr[0].totalPackageNumber) { //只有袋
            obj6 = {
                label: "订单总数量",
                value: arr[0].totalPackageNumber + "袋"
            }
        }
        arr2.push(obj)
        arr2.push(obj4)
        arr2.push(obj5)
        arr2.push(obj6)

        arr3.push(arr2)

        let arr4 = []

        for (let j in arr[1]) {
            let arr1 = []
            let obj2
            let obj3
            if (arr[1][j].unit == "piece") { //箱
                obj2 = {
                    label: '产品名称',
                    value: arr[1][j].productName
                }
                obj3 = {
                    label: '产品数量',
                    value: arr[1][j].amount + "箱"
                }
            } else if (arr[1][j].unit == "bag") { //袋
                obj2 = {
                    label: '产品名称',
                    value: arr[1][j].productName
                }
                obj3 = {
                    label: '产品数量',
                    value: arr[1][j].amount + "袋"
                }
            }

            arr1.push(obj2)
            arr1.push(obj3)
            arr4.push(arr1)
        }
        arr3.push(arr4)
        Arr.push(arr3)
        state.orderList = Arr
    },

    //修改头部导航右侧是否显示
    changeHeaderLeft(state, isShow) {
        state.headerLeftShow.showBack = isShow
    },

    //判断头部导航和底部导航是否显示
    isHeaderFooterShow(state, isShow) {
        state.isHeaderFooterShow = isShow
    },

    //判断登录
    login_require(state, msg) {
        state.login_require = msg
    }
})

function boxArr(state) { //去结算 -- 箱
    let flag = false

    if (state.getChooseList.length) {
        state.isHaveProduct = true
        for (let i in state.getChooseList) {
            if (state.getChooseList[i].num == 0) {
                flag = true
                break
            }
        }
        if (!flag) {
            if (state.getChooseList.length) {
                for (let m in state.getChooseList) {
                    let arr = [];
                    let obj = {};
                    let obj2 = {};
                    let obj3 = {};
                    obj.label = "产品规格";
                    obj.value = state.getChooseList[m].spec;
                    obj2.label = "产品数量";
                    obj2.value = state.getChooseList[m].num + "箱";
                    obj3.id = state.getChooseList[m].id
                    obj3.titC = state.getChooseList[m].title
                    arr.push(obj3)
                    arr.push(obj);
                    arr.push(obj2);
                    // state.getChooseList[m] = arr;
                    state.productList.push(arr)
                }
                console.log(state.productList)
            }
            return
        } else {
            for (let j in state.getChooseList) {
                if (state.getChooseList[j].num == 0) {
                    state.getChooseList.splice(j, 1)
                    state.getChooseList = state.getChooseList
                    break
                }
            }
            return boxArr(state)
        }
    } else {
        state.isHaveProduct = false

    }

}

function bagArr(state) { //去结算 -- 袋
    let flag = false

    if (state.getBagList.length || state.getChooseList.length) {
        state.isHaveProduct = true
        for (let i in state.getBagList) {
            if (state.getBagList[i].num == 0) {
                flag = true
                break
            }
        }
        if (!flag) {
            if (state.getBagList.length) {
                for (let m in state.getBagList) {
                    let arr = [];
                    let obj = {};
                    let obj2 = {};
                    let obj3 = {};
                    obj.label = "产品规格";
                    obj.value = state.getBagList[m].spec;
                    obj2.label = "产品数量";
                    obj2.value = state.getBagList[m].num + "袋";
                    obj3.id = state.getBagList[m].id
                    obj3.titC = state.getBagList[m].title
                    arr.push(obj3)
                    arr.push(obj);
                    arr.push(obj2);
                    // state.getChooseList[m] = arr;
                    state.productList.push(arr)
                }
                console.log(state.productList)
            }
            return
        } else {
            for (let j in state.getBagList) {
                if (state.getBagList[j].num == 0) {
                    state.getBagList.splice(j, 1)
                    state.getBagList = state.getBagList
                    break
                }
            }
            return bagArr(state)
        }
    } else {
        state.isHaveProduct = false

    }

}

// function pannelArr(state) { //去结算 -- 模板数组

//     let flag = false
//     if (state.pannelList.length) {
//         state.isHaveProduct = true
//         for (let i in state.pannelList) {
//             if (state.pannelList[i].num == 0) {
//                 flag = true
//                 break
//             }
//         }
//         if (!flag) {
//             return
//         } else {
//             for (let j in state.pannelList) {
//                 if (state.pannelList[j].num == 0) {
//                     state.pannelList.splice(j, 1)
//                     break
//                 }
//             }
//             return pannelArr(state)
//         }
//     } else {
//         state.isHaveProduct = false
//     }

// }