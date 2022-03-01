export default {
    props: ['txt'],
    template: `
        <section class="long-txt">
            <p>{{showTxt}}</p>
            <button v-if="isLong" @click="toggleTxt">{{moreBtn}}</button>
        </section>
    `,
    data() {
        return {
            moreTxt: false,
            isLong: true
        }
    },
    created(){
        if (this.txt.length<=100) this.isLong = false
    },
    methods: {
        toggleTxt(){
            this.moreTxt = !this.moreTxt
        },
    },
    computed: {
        showTxt() {
            return this.moreTxt? this.txt: this.txt.slice(0,99)
        },
        moreBtn(){
            return !this.moreTxt? 'read more': 'read less'
        },
    },
}