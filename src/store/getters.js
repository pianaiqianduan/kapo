export default ({
    //计算属性--总提交
    msgTj(state) {
        let products = []
        for (let t in state.getChooseList) {
            let obj = {
                productSapId: state.getChooseList[t].id,
                nnumber: state.getChooseList[t].num
            }
            products.push(obj)
        }
        state.tjProductList = products
    },

    //计算属性 -- 产品总数量
    allNum(state) {
        let opt = 0
        if (state.getChooseList.length) {

            for (let i in state.getChooseList) {
                opt += state.getChooseList[i].num
            }
        }
        return opt

    }
})