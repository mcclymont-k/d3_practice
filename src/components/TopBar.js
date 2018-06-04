import React, {Component} from 'react'
import { animateScroll as scroll, scroller } from 'react-scroll'


class TopBar extends Component {

  smoothScroll(e){
    const target = Number(e.target.dataset.set)
    const scrollDestination = target * 1980
    scroll.scrollTo(scrollDestination)
  }

  scrollAction() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
      })
    }

  render() {
    return(
      <div className='topBarContainer'>
        <button data-set='0' onClick={e => this.smoothScroll(e)}>1</button>
        <button data-set='1' onClick={e => this.smoothScroll(e)}>2</button>
        <button data-set='2' onClick={e => this.smoothScroll(e)}>3</button>
        <button data-set='3' onClick={e => this.smoothScroll(e)}>4</button>
        <button data-set='4' onClick={e => this.smoothScroll(e)}>5</button>
      </div>
    )
  }
}

export default TopBar
