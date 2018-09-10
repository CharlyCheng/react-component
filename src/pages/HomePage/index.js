import React , { Component} from 'react';
import {
    Tabs
} from '../../components'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonList: [
                {
                    text: '爱你姐'
                },
                {
                    text: '爱你妹'
                }
            ]
        }
    }

    render () {
        const {
            buttonList
        } = this.state;

        return (
            <div>
                <Tabs 
                    buttonList = {buttonList}
                />
            </div>
        )
    }
}

export default Index