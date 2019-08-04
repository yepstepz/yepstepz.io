// src/shared/App.js

import React, { Component } from 'react'
import routes from '../routes'
import { Route, NavLink } from 'react-router-dom'
import { StateProvider } from '../../state';
import { mainReducer } from "../../state/reducer";

const App = () => {
        const initialState = {
            articlesList: { loading: false, articles: null },
            articlePages: { loading: false, articles: null }
        }
        return (
            <React.Fragment>
                <ul>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/popular/qqqq'}>Page qqqq</NavLink></li>
                    <li><NavLink to={'/popular/123q'}>Page 123q</NavLink></li>
                </ul>
                <StateProvider initialState={initialState} reducer={mainReducer}>
                    {routes.map(({ path, exact, component: C, ...rest }) => (
                        <Route
                            key={path}
                            path={path}
                            exact={exact}
                            render={(props) => (
                                <C {...props} {...rest} />
                            )}

                        />

                    ))}
                </StateProvider>
            </React.Fragment>
        )
}

export default App
