'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import './search.less'
import logo from './images/ico.png'

class Search extends React.Component {
    
    render () {
        return <div className="search-text">
                文字的美感与您不期而遇
                <img src={ logo }/>
            </div>
    }

}

ReactDom.render(
    <Search/>,
    document.getElementById('root')
)