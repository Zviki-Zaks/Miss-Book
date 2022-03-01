export default {
    template: `
        <section class="books-filter">
            <label for="name">Name </label>
            <input type="text" id="name" v-model="filterBy.name" placeHolder="Search" @input="setFilter">
            <br>
            <label for="from">From price </label>
            <input type="number" id="from" v-model="filterBy.fromPrice" placeHolder="Enter price" @input="setFilter">
            <label for="to">To </label>
            <input type="number" id="to" v-model="filterBy.topPrice" placeHolder="Enter price" @input="setFilter">
        </section>
    `,
    data() {
        return {
            filterBy: {
                name: '', fromPrice: 0, topPrice: 1000,
            },
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy)
        }
    },
}