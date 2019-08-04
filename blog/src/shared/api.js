// shared/api.js

import fetch from 'isomorphic-fetch'

export function fetchPopularRepos (postSlug) {
    const encodedURI = encodeURI(`https://api.yepstepz.io/wp-json/wp/v2/posts?slug=${postSlug}`)

    return fetch(encodedURI)
        .then((data) => data.json())
        .then((repos) => repos[0].content.rendered)
        .catch((error) => {
            console.warn(error)
            throw new Error
        });
}

export function fetchArticles () {
    const encodedURI = encodeURI(`https://api.yepstepz.io/wp-json/wp/v2/posts`)

    return fetch(encodedURI)
        .then((data) => data.json())
        .catch((error) => {
            console.warn(error)
            throw new Error
        });
}
