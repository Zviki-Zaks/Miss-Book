import aboutPage, {aboutThanks} from "./views/about-page.cmp.js";
import bookAdd from "./views/book-add.cmp.js";
import bookApp from "./views/book-app.cmp.js";
import bookDetails from "./views/book-details.cmp.js";
import homePage from "./views/home-page.cmp.js";

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp,
        children: [
            {
                path: 'add',
                component: bookAdd
            }
        ]
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'thanks',
                component: aboutThanks
            }
        ]
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})