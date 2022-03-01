import { booksService } from '../services/books-service.js'

import booksFilter from '../cmps/books-filter.cpm.js'
import booksList from '../cmps/books-list.cpm.js'
import bookAdd from '../views/book-add.cmp.js'

export default {
    template: `
        <section class="book-app main-layout">
            <books-filter @filtered="setFilter" />
            <router-link to="/book/add" class="add-link">Add new book</router-link>
            <router-view></router-view>
            <books-list :books="booksToDisplay"/>
        </section>
    `,
    components: {
        booksFilter,
        booksList,
        bookAdd,
    },
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    created() {
        booksService.query()
            .then(books => this.books = books)
    },
    methods: {
        setFilter(filter) {
            console.log('filter', filter);
            this.filterBy = filter
        }
    },
    computed: {
        booksToDisplay() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.name, 'i')
            return this.books.filter(book => {
                return regex.test(book.title)
                    && book.listPrice.amount > this.filterBy.fromPrice
                    && book.listPrice.amount < this.filterBy.topPrice
            })
        }
    },
}