
export const aboutThanks = {
    template: `<section>
                    <h1>Thank you to my dear parents, 
                        wife and children</h1>
              </section>`
}

export default {
    template: `
        <section class="about-page app-layout">
            <h1>Miss-Book</h1>
            <p>This is my first VUE app</p>
            <img src="imgs/logo.svg">
            <nav class="about-nav">
                <router-link to="/about/thanks">Thanks</router-link>
            </nav>
            <router-view/>
        </section>
    `,
    components: {
        aboutThanks
    }
}
