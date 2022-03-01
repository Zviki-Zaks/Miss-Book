import { booksService } from "../services/books-service.js"

export default {
    props: ['review', 'bookId'],
    template: `
        <section class="book-reviews">
            <button @click="remove">x</button>
            <p>Reader: {{review.name}}</p>
            <div class="rate">Rare: {{getRate}}</div>
            <p>Reade at: {{review.readAt}}</p>
            <p>Review: {{review.txt}}</p>
            
        </section>
    `,
    data() {
        return {
            // review: {
            //     name: 'Books Reader',
            //     rate: '',
            //     readAt: new Date().toISOString().substring(0, 10),
            //     txt: '',
            // },
        }
    },
    methods: {
        remove(){
            booksService.removeReview(this.bookId, this.review)
            .then(() => {this.$emit('remove-review')
            console.log('remove');})
        }
    },
    computed: {
        getRate(){
            let star = '⭐';
            return star.repeat(this.review.rate)
        }
    },
}