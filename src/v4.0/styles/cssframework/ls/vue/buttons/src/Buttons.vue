<template>
    <div class="span-24" :class="alignClass">
        <el-button @click="clickFunc(b.click, b.data)" :type="b.type" v-for="b in buttons" :key="b.label" :class="b.class" :style="b.style">{{b.label}}</el-button>
    </div>
</template>

<script>
    export default {
        name: "LsButtons",
        props: [ 'buttons', 'align' ],
        computed:{
            alignClass(){
                if(this.align === 'center'){
                    return 'flex-center';
                }
                else if(this.align === 'right'){
                    return 'flex-right';
                }
                else{
                    return '';
                }
            },
        },
        methods:{
            clickFunc(func, data){
                if(func){
                    return func(data, this.$parent);
                }
            },
        }
    }
</script>

<style scoped>

</style>