import { booksService } from "../services/books-service.js"

import longTxt from "../cmps/long-txt.cmp.js"
import reviewAdd from "../cmps/review-add.cmp.js"
import bookReview from "../cmps/book-review.cmp.js"

export default {
    template: `
        <section v-if="book" class="book-details main-layout">
            <img :src="src">
            <h2><i>{{book.title}}</i>, {{book.authors[0]}}</h2>
            <h3>{{book.subtitle}}</h3>
            <h4>Description: </h4>
            <long-txt :txt="txt"/>
            <hr>
            <p class="categories">
                Categories:  <a v-for="category in book.categories" >{{category}}</a> 
            </p>
            <hr>
            <p>
                <span>Language: {{lng}}</span>
                 &#9672 
                <span> Published: {{year}}{{publishedDescription}}</span>
                 &#9672 
                <span>{{book.pageCount}} pages-{{readingLength}}</span>
            </p>
            <p class="price">Price: <span :class="bookPrice">{{currencySymbol}}</span>  <span v-if="book.listPrice.isOnSale">SALE</span></p>
            <h4 v-if="reviews">reviews: </h4>
            <div v-if="reviews" v-for="review in reviews" class="reviews">
            <book-review :review="review" :bookId="book.id" @remove-review="updateReviews"/>
            </div>
            <button @click="isAdd = !isAdd" class="review-btn">{{reviewBtn}}</button>
            <review-add v-if="isAdd" :bookId="book.id" @add-review="updateReviews"/>
            <button class="bake-btn"><router-link to="/book">Bake</router-link></button>
        </section>
    `,
    data() {
        return {
            book: null,
            src: null,
            year: null,
            txt: null,
            reviews: null,
            isAdd: false
        }
    },
    created() {
        const id = this.$route.params.bookId
        booksService.getBookById(id)
            .then(book => {
                this.book = book
                this.src = book.thumbnail
                this.year = book.publishedDate
                this.txt = book.description
                this.reviews = book.reviews
            })
    },
    components: {
        longTxt,
        reviewAdd,
        bookReview,
    },
    methods: {
        updateReviews(){
            booksService.getBookById(this.book.id)
                .then(book => {this.reviews = book.reviews
                    this.isAdd = false
                    console.log(book);
                console.log('get');})
        }
    },
    computed: {
        lng() {
            return this.book.language.toUpperCase()
        },
        publishedDescription() {
            const publishedDate = new Date().setFullYear(this.year)
            const tenTearsAgo = new Date().setFullYear(new Date().getFullYear() - 10)
            const yearAgo = new Date().setFullYear(new Date().getFullYear() - 1)
            if (publishedDate <= tenTearsAgo) return '-Veteran Book'
            else if (publishedDate >= yearAgo) return '-New!'
        },
        readingLength() {
            if (this.book.pageCount > 500) return 'Long reading'
            else if (this.book.pageCount > 200) return 'Decent reading'
            else if (this.book.pageCount < 100) return 'Light reading'
        },
        currencySymbol() {
            return Intl.NumberFormat('en', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        },
        bookPrice() {
            return {
                red: this.book.listPrice.amount > 150, green: this.book.listPrice.amount < 20
            }
        },
        reviewBtn(){
            return this.isAdd ? 'Close': 'Add review'
        },
    },
}