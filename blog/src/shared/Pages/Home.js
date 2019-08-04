import React, { useState, useEffect, useLayoutEffect } from 'react';
import { getState } from '../../state';
import { getAllArticles } from "../../state/hooks";

import { ARTICLES_LIST_LOADING, ARTICLES_LIST_FETCHED } from "../constants";

export function Home (props) {
    const articlesList = getAllArticles(props)

    if (articlesList.loading || !articlesList.articles.length) {
        return '...loading'
    }

    if (articlesList.articles.length) {
        return  (
            <React.Fragment>
                {
                    articlesList.articles.map((article) => (
                        <div key={article.id}>{article.id} {article.excerpt.rendered}</div>
                    ))
                }
            </React.Fragment>
        )
    }
}
