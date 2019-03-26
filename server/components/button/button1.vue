<script>
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class Home extends Vue {


    render() {
        return (
            <div class="button1-box">
                <span>确定</span>
            </div>
        )
    }
    mounted() {
        
    }
}
</script>
<style lang="scss" scoped>
.button1-box {
    background: linear-gradient(to right, #59b8f4, #0168b7);
    // background: #9b9b9b;
    width: 90%;
    height: 0.88rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.32rem;
    border-radius: 0.44rem;
    /* width: 100%;
    height: 0.88rem;
    display: flex;
    justify-content: center; */
}

.button1-box>span {
    /* background: #9b9b9b;
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.32rem;
    border-radius: 0.44rem; */
}
</style>

