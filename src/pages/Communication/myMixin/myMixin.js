export default {
    // 对外暴露的对象，可以放置组件重复js业务逻辑
    methods: {
        giveMoney() {
            this.money -= 50;
            //$parent,组件实例VC的一个属性,可以操作父组件的数据和方法(属性|方法)
            this.$parent.money += 50;
        },
    },
    // 除了methods，mounted、computed等等js逻辑都可以进行封装
}