<template>
</template>
<script>
    export default {
        name: "LsTile",
        props: [ 'value', 'saveToStore' ],
        methods:{
            clickFunc(func, data){
                if(func){
                    return func(data, this.$parent);
                }
            },
        },
        mounted: function () {
            this.$nextTick(function () {
                if(this.$props['saveToStore']){
                    if(!this.$store.state.lsMade){
                        this.$store.state.lsMade = {}
                    }
                    this.$store.state.lsMade.title = this.$props.value
                }
                window.document.title = this.$props.value
            })
        },
    }
</script>

<style scoped>

</style>