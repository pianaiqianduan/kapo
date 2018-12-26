export default ({

    /**获取选中的门店数组 */
    chooseStoreList(state, arr) {
        state.chooseStoreList = arr
    },


    //初始化得到的产品数组集合用于搜索
    getChooseList(state) {
        state.getChooseList = []
    },

    //从多选选中的产品数组集合
    checkedArr(state, msg) {
        state.checkedArr = msg
    },

    //根据用户是否搜索到产品来改变‘Head’组件中头部右侧的内容
    changeHeaderRight(state, msg) {
        state.headerRight = msg
    },

    // 添加选中产品 --输入产品名称的条件下  --------------------------------------单个选中的已经取消逻辑
    // setChooseList(state, chooseItemObj) {
    //     if (state.getChooseList.length) {
    //         state.isHave = false //每次都清空
    //         state.isHaveArr = [] //每次都清空
    //         let flag = false
    //         for (let i in state.getChooseList) {
    //             if (state.getChooseList[i].id == chooseItemObj.id) { //是否有重复的
    //                 let obj = {
    //                     name: state.getChooseList[i].title
    //                 }
    //                 state.isHaveArr.push(obj)
    //                 flag = true
    //                 state.isHave = true
    //             } else {
    //                 if (i == state.getChooseList.length - 1 && !flag) {
    //                     state.getChooseList.push(chooseItemObj)
    //                     console.log(state.getChooseList)
    //                 }
    //             }
    //         }
    //     } else {
    //         state.getChooseList.push(chooseItemObj)
    //         console.log(state.getChooseList)
    //     }

    // },

    //扫码的情况下和多选情况下 --添加产品
    scanChooseList(state, chooseItemObj) {
        state.isHave = false //每次都清空
        state.isHaveArr = [] //每次都清空
        if (state.getChooseList.length) {
            for (let j in chooseItemObj) {
                let flag = false
                for (let i in state.getChooseList) {
                    if (state.getChooseList[i].id == chooseItemObj[j].id) {
                        let obj = {
                            name: state.getChooseList[i].title
                        }
                        state.isHave = true
                        flag = true
                        state.isHaveArr.push(obj)
                    } else {
                        if (i == state.getChooseList.length - 1 && !flag) {
                            state.getChooseList.push(chooseItemObj[j]) //----------箱
                            state.getBagList.push(chooseItemObj[j]) //----------袋
                            console.log(state.getChooseList)
                        }
                    }
                }
            }
        } else {
            state.getChooseList = chooseItemObj //-------箱
            state.getBagList = chooseItemObj //袋
            console.log(state.getChooseList)
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

    //删除选中产品
    changeItem(state, itemId) {
        for (let i in state.getChooseList) { //删除数据数组的信息
            if (state.getChooseList[i].id == itemId) {
                state.getChooseList.splice(i, 1)
            }
        }
    },

    //获取产品数量--箱
    productNum(state, obj) {
        for (let i in state.getChooseList) {
            if (state.getChooseList[i].id == obj.id) {
                state.getChooseList[i].num = obj.num
                console.log(state.getChooseList)
                break
            }
        }
    },
    productBagNum(state, obj) {
        for (let i in state.getChooseList) {
            if (state.getBagList[i].id == obj.id) {
                state.getBagList[i].num = obj.num
                console.log(state.getBagList)
                break
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