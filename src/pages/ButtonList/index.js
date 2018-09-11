import React, { Component } from 'react';
import {
    ButtonList
} from '../../components'

class Index extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            buttonList: [
                {
                    text: '好好学习'
                },
                {
                    text: '天天向上'
                }
            ],
            btnStyle: {
                color: 'blue'
            }
        }
    }

    render () {
        const { 
            buttonList,
            btnStyle
         } = this.state;

        return (
            <div>
                <ButtonList  
                    buttonList = {buttonList}
                    btnStyle = {btnStyle}
                />
            </div>
        )
    }
}

export default Index;