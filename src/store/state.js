export default ({
    getChooseList: [], //选中的产品组包括id,规格,数量,产品名称------------箱

    isHave: false, //是否有重复的

    isHaveArr: [], //重复的产品数组

    isHaveProduct: true, //是否有产品订单

    productList: [], //产品订单数据,渲染用

    tjProductList: [], //总提交需要的产品组信息

    orderList: [], //单个订单的产品数组

    headerLeftShow: { showBack: false }, //是否显示头部导航左侧的返回字段

    login_require: false, //路由meta的元数据信息

    checkedArr: [], //从多选中选中的集合

    headerRight: '门店选择', //头部右侧导航到底显示什么内容----默认显示“门店选择”

    isClick: false, //当头部右侧的内容为‘确定’时,判断用户是否点击了,默认没有点击

    isHeaderFooterShow: true, //头部导航和底部导航是否显示

    chooseStoreList: [] //选中的门店个数

})