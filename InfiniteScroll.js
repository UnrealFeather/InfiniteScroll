var InfiniteScroll = function (domId, data) {
    var that = this
    that.distance= 100      //距离底部阈值
    that.loading = false    //防止接口重复请求
    that.noMore  = false    //是否禁止加载更多
    that.initLoad= true     //若为真，则会立即检查是否需要执行加载方法。在初始状态下内容撑不满容器时十分有用。
    that.loadMore = function () {
    }
    that.restart = function () {
        that.loading = false
        that.noMore = false
    }
    that.stop = function () {
        that.noMore = true
    }
    var list = document.getElementById(domId)
    // console.log(list)
    list.onscroll = function (e){ //实时监听dom滚动条
        // console.log('滚动条位置', list.scrollTop)
        // console.log('内容区高度', list.scrollHeight)
        // console.log('视口高度', list.clientHeight)
        // console.log('距离底部高度', list.scrollHeight - list.scrollTop - list.clientHeight)
        if(list.scrollHeight - list.scrollTop - list.clientHeight < that.distance ) {
            if(!that.noMore && !that.loading){
                that.loading = true
                //执行加载方法
                that.loadMore()
            }
        }
    }
    for(var key in data){   
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。 覆盖默认设置
    if (data.hasOwnProperty(key) === true){  
            that[key] = data[key]
        }
    }
    that.init = function (){
        if(list.scrollHeight <= list.clientHeight && that.initLoad) {
            that.loadMore()
            setTimeout(() => {
                that.init()
            }, 200)
        }else {
            return
        }
    }
    that.init()
}