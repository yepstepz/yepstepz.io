// src/shared/App.js

import React, { Component } from 'react'
import { getSingleArticle } from "../../state/hooks";
import {getState} from "../../state";


const Page = (props) => {

    const serverData = getSingleArticle(props)
    let articlePages;

    const [articles, dispatch] = getState();

    if (__isBrowser__) {
        articlePages = articles.articlePages
    } else {
        articlePages = serverData
    }

        if (articlePages.loading) {
            return <p>LOADING</p>
        }
        return (
            <React.Fragment>
                <div>{`This is page #`}</div>
                <div>{articlePages[props.match.params.id]}</div>
            </React.Fragment>
        )
}

export default Page
