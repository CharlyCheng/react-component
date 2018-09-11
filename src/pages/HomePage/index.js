import React , { Component} from 'react';
import { Link, Route } from 'react-router-dom';
import {
    Tabs
} from '../../components'
import './index.styl'
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            components: [
                {
                    text: 'ButtonList',
                    path: Tabs
                },
                {
                    text: 'Tabs',
                    path: Tabs
                }
            ]
        }
    }

    render () {
        const {
            components
        } = this.state;

        return (
            <div className='cc-style'>
                {
                    components.map ((item, index) => {
                        return <div className='cc-one' key={ index } >
                                    <Link to={`/${item.text}`} replace>{ item.text }</Link>
                               </div>
                    })
                }
            </div>
        )
    }
}

export default Index