export default ({

    /**获取选中的门店数组 */
    chooseStoreList(state, arr) {
        state.chooseStoreList = arr
    },

    //从多选选中的产品数组集合
    checkedArr(state, msg) {
        state.checkedArr = msg
    },

    //根据用户是否搜索到产品来改变‘Head’组件中头部右侧的内容
    changeHeaderRight(state, msg) {
        state.headerRight = msg
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

    //切换tab时调用
    getIndex(state, index) {
        if (index == 0) {
            state.getIndex = false
        } else if (index == 1) {
            state.getIndex = true
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
        dataArr(state)
    },

    //提交成功后删除getChooseList中的数据
    cancelChooseList(state) {
        state.getChooseList = []
    },

    //获取单个订单中的信息和产品并组合
    getOrderList(state, arr) {
        let Arr = []
        let arr2 = []
        let arr3 = []
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

        arr2.push(obj)
        arr2.push(obj4)
        arr2.push(obj5)

        arr3.push(arr2)

        let arr4 = []
        for (let j in arr[1]) {
            let arr1 = []

            let obj2 = {
                label: '产品名称',
                value: arr[1][j].productName
            }
            let obj3 = {
                label: '产品数量',
                value: 'x' + arr[1][j].amount
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

function dataArr(state) { //去结算 -- 数据数组
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
                    obj2.value = "x" + state.getChooseList[m].num;
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
            return dataArr(state)
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