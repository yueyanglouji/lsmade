<template>
</template>
<script>
    export default {
        name: "LsTitle",
        props: [ 'value', 'saveToStore', 'pageId' ],
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
                if(this.$props['pageId']){
                    const cl = window.document.body.className
                    const pageId = "lsmade-" + this.$props['pageId'] + " " + this.$props['pageId']
                    const removeId = []
                    const result = []
                    if(cl){
                        cl.split(" ")
                        for(let i=0;i<cl.length;i++){
                            const ccl = cl[i]
                            if(/lsmade-.*/.test(ccl)){
                                const p_id = ccl.substr(7)
                                removeId.push(ccl)
                                removeId.push(p_id)
                            }
                        }
                        for(let i=0;i<cl.length;i++){
                            const ccl = cl[i]
                            if(!removeId.contains(ccl)){
                                result.push(ccl)
                            }
                        }
                        let result_class = removeId.join(" ")
                        if(result_class){
                            result_class += " "
                        }
                        window.document.body.className = result_class + pageId
                    }else{
                        window.document.body.className = pageId
                    }

                }
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