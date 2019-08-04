import React, { useState, useEffect, useLayoutEffect } from 'react';

import {getState} from "../index";
import {ARTICLES_LIST_FETCHED, ARTICLES_LIST_LOADING, ARTICLE_LOADING, ARTICLE_FETCHED } from "../../shared/constants";

export function getAllArticles ({fetchInitialData, staticContext}) {

    let repos
    if (__isBrowser__) {
        repos = window.__INITIAL_DATA__
        window.__INITIAL_DATA__ = ''
    } else {
        repos = staticContext.data
        return {
            loading: false,
            articles: repos
        }
    }

    const [{ articlesList }, dispatch] = getState();

    function fetchArticlesList () {
        dispatch({
            type: ARTICLES_LIST_LOADING,
            loading: true
        })
        fetchInitialData()
            .then((repos) => dispatch({
                type: ARTICLES_LIST_FETCHED,
                articles: repos
            }))
    }

    useEffect(() => {
        if (!repos && !articlesList.articles.length) {
            fetchArticlesList()
        } else if (repos) {
            dispatch({
                type: ARTICLES_LIST_FETCHED,
                articles: repos
            })
        }
    }, []);

    return repos ? {
        loading: false,
        articles: repos
    } : articlesList
}

export function getSingleArticle ({fetchInitialData, staticContext, match }) {

    let repos
    if (__isBrowser__) {
        repos = window.__INITIAL_DATA__
        window.__INITIAL_DATA__ = ''
    } else {
        repos = staticContext.data
        return {
            loading: false,
            [match.params.id]: repos
        }
    }

    const [{ articlePages }, dispatch] = getState();

    const article = articlePages[match.params.id]

    function fetchArticle () {
        if (!repos && !article) {
            dispatch({
                type: ARTICLE_LOADING
            })
            fetchInitialData(match.params.id)
                .then((data) => {
                    dispatch({
                        type: ARTICLE_FETCHED,
                        payload: {
                            [match.params.id]: data
                        }
                    })})
        } else if (repos.length && !article) {
            dispatch({
                type: ARTICLE_FETCHED,
                payload: {
                    [match.params.id]: repos
                }})
        }

    }

    useEffect(() => {
            fetchArticle()
    }, [match.params.id]);

    // useEffect(() => {
    //     fetchArticle()
    // }, [lel])
}


