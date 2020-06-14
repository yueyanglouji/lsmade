<template>
</template>
<script>
    export default {
        name: "LsTitle",
        props: [ 'value', 'saveToStore' ],
        methods:{
            clickFunc(func, data){
                if(func){
                    return func(data, this.$parent);
                }
            },
            setTitle(){
                if(this.$props['saveToStore']){
                    if(!this.$store.state.lsMade){
                        this.$store.state.lsMade = {}
                    }
                    this.$store.state.lsMade.title = this.$props.value
                }
                window.document.title = this.$props.value
            }
        },
        watch: {
            value: {
                handler(val) {
                    this.setTitle();
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.setTitle();
            })
        },
    }
</script>

<style scoped>

</style>