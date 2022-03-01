import bookPreview from "./book-preview.cmp.js"

export default {
    props: ['books'],
    template: `
        <section class="books-list">
            <ul>
                <li v-for="book in books" :key="book.id" class="book-preview-container">
                    <book-preview :book="book" @click="selected(book)"/>
                </li>
            </ul>
        </section>
    `,
    components: {
        bookPreview,
    },
    methods: {
        selected(book) {
            this.$router.push(`/book/${book.id}`)
        }
    },
}