import { booksService } from "../services/books-service.js"

export default {
    props: ['bookId'],
    template: `
        <section class="review-add">
            <form class="review-form">
                <label for="name">Your Name </label>
                <input ref="nameInput" type="text" id="name" v-model="review.name" placeHolder="Enter full name" >
                <label for="rate">Rate </label>
                <input list="rate-list" id="rate" v-model="review.rate" >
                <datalist id="rate-list">
                    <option v-for="n in 5" :value="n">{{n}}</option>
                </datalist>
                <label for="date">Read at</label>
                <input type="date" id="date" v-model="review.readAt">
                <label for="txt">Your review</label>
                <textarea id="txt" rows="3" v-model="review.txt"></textarea>
                <button class="save-btn" @click.prevent="onForm">Save</button>
            </form>
        </section>
    `,
    mounted() {
        this.$refs.nameInput.focus()
    },
    data() {
        return {
            review: {
                name: 'Books Reader',
                rate: '',
                readAt: new Date().toISOString().substring(0, 10),
                txt: '',
            },
        }
    },
    methods: {
        onForm() {
            booksService.addReview(this.bookId, this.review)
                .then(() => {this.$emit('add-review')
                console.log('add');})

        }
    },
}