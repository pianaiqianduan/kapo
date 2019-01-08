export default ({
    //计算属性--总提交
    msgTj(state) {
        let products = []
        for (let t in state.getChooseList) { //箱
            let obj = {
                productSapId: state.getChooseList[t].id,
                nnumber: state.getChooseList[t].num
            }
            products.push(obj)
        }
        for (let h in state.getBagList) { //袋
            let obj = {
                productSapId: state.getBagList[h].id,
                npacknumber: state.getBagList[h].num
            }
            products.push(obj)
        }
        console.log(products)
        state.tjProductList = products
    },

    //计算属性 -- 产品总数量(箱)
    allNum(state) {
        let opt = 0
        if (state.getChooseList.length) {

            for (let i in state.getChooseList) {
                opt += state.getChooseList[i].num
            }
        }
        return opt

    },

    //计算属性 -- 产品总数量(箱)
    allBagNum(state) {
        let opt = 0
        if (state.getBagList.length) {

            for (let i in state.getBagList) {
                opt += state.getBagList[i].num
            }
        }
        return opt

    }


})