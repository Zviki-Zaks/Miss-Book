export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            <h1 class="book-title">{{book.title}}</h1>
            <p class="book-price">Price: {{currencySymbol}}</p>
        </section>
    `,
    methods: {
        
    },
    computed: {
        currencySymbol() {
            return Intl.NumberFormat('en',{ style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        }
    },
}