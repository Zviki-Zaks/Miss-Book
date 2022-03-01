import { booksService } from "../services/books-service.js"
import { eventBus } from "../services/eventBus-service.js"

import reviewAdd from "../cmps/review-add.cmp.js"

export default {
    template: `
        <section class="book-add">
            <label >Search: 
                <input ref="searchInput" type="search" v-model.lazy="search" @change="searchBooks">
            </label>
            <ul v-if="books">
                <li v-for="book in books" value="book.id" @click="selectBook(book)">{{book.title}}</li>
            </ul>
            <!-- <review-add :bookId="book.id"/> -->
        </section>
    `,
    data() {
        return {
            search: '',
            books: null,

        }
    },
    created() {

    },
    mounted() {
        this.$refs.searchInput.focus()
    },
    components: {
        reviewAdd,
    },
    methods: {
        searchBooks() {
            booksService.searchBooks(this.search)
                .then(books => {
                    this.books = books[this.search]
                    console.log(books);
                })
        },
        selectBook(book) {
            console.log('click');
            booksService.addBook(book)
                .then(book => {
                    console.log(book);
                    this.$emit('add-book')
                    this.$router.push('/book')
                })
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
        reviewBtn() {
            return this.isAdd ? 'Close' : 'Add review'
        },
    },
}