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
            buttonList = [],
            btnStyle = {}
        } = this.props;
        return (
            <div className='bk-tabs'>
                {
                    buttonList.map ( (item, index) => {
                        return <button 
                                    style={btnStyle}
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

export default Index;