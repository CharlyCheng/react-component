import React , { Component} from 'react';
import './index.styl'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0
        }
    }

    changeTab = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    render () {
        const {
            activeIndex
        } = this.state;

        const {
            buttonList = [
                {
                    text: '111'
                },
                {
                    text: '222'
                }
            ]
        } = this.props;

        return (
            <div className='bk-tabs'>
                {
                    buttonList.map ( (item, index) => {
                        return <button 
                                    className={ index === activeIndex ? 'activeStyle': ''} 
                                    key ={index} 
                                    onClick= { () => this.changeTab(index)}> 
                                    { item.text }
                                </button>
                    })
                }
            </div>
        )
    }
}

export default Index