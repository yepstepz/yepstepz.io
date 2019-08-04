import { Home } from './Pages/Home'
import Page from './Pages/Page'
import { fetchPopularRepos, fetchArticles } from './api'

export const routes =  [
    {
        path: '/',
        exact: true,
        component: Home,
        fetchInitialData: (path = '') => fetchArticles()
    },
    {
        path: '/popular/:id',
        component: Page,
        fetchInitialData: (path = '') => fetchPopularRepos(
            path.split('/').pop()
        )
    }
]

export default routes
