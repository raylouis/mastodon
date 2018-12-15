import React from 'react';
import ReactSwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import screenHello from '../../../images/screen_hello.svg';
import screenFederation from '../../../images/screen_federation.svg';
import screenInteractions from '../../../images/screen_interactions.svg';

const FrameWelcome = () => (
  <div className='introduction__frame'>
    <div className='introduction__illustration'>
      <img src={screenHello} />
    </div>

    <div className='introduction__text introduction__text--centered'>
      <h3>First steps</h3>
      <p>Since this is your first time, let's go over the basics of Mastodon so you can make it your new home. You will be able to share and exchange messages with your followers all across the fediverse, since Mastodon is decentralized. But this server is special -- it hosts your profile, so remember its name.</p>
    </div>
  </div>
);

const FrameFederation = () => (
  <div className='introduction__frame'>
    <div className='introduction__illustration'>
      <img src={screenFederation} />
    </div>

    <div className='introduction__text introduction__text--columnized'>
      <div>
        <h3>Home</h3>
        <p>Posts from people you follow will appear in your home feed. You can follow anyone on any server!</p>
      </div>

      <div>
        <h3>Local</h3>
        <p>Public posts from people on the same server as you will appear in the local timeline.</p>
      </div>

      <div>
        <h3>Federated</h3>
        <p>Public posts from other servers of the fediverse will appear in the federated timeline.</p>
      </div>
    </div>
  </div>
);

const FrameInteractions = () => (
  <div className='introduction__frame'>
    <div className='introduction__illustration'>
      <img src={screenInteractions} />
    </div>

    <div className='introduction__text introduction__text--columnized'>
      <div>
        <h3>Reply</h3>
        <p>You can reply to other people's and your own toots, which will chain them together in a conversation.</p>
      </div>

      <div>
        <h3>Boost</h3>
        <p>You can share other people's toots with your followers by boosting them.</p>
      </div>

      <div>
        <h3>Favourite</h3>
        <p>You can save a toot for later, and let the author know that you liked it, by favouriting it.</p>
      </div>
    </div>
  </div>
);

const pages = [
  <FrameWelcome />,
  <FrameFederation />,
  <FrameInteractions />,
];

export default class Introduction extends React.PureComponent {

  state = {
    currentIndex: 0,
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleDot = (e) => {
    const i = Number(e.currentTarget.getAttribute('data-index'));
    e.preventDefault();
    this.setState({ currentIndex: i });
  }

  handlePrev = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: Math.max(0, currentIndex - 1),
    }));
  }

  handleNext = () => {
    this.setState(({ currentIndex }) => ({
      currentIndex: Math.min(currentIndex + 1, pages.length - 1),
    }));
  }

  handleSwipe = (index) => {
    this.setState({ currentIndex: index });
  }

  handleKeyUp = ({ key }) => {
    switch (key) {
    case 'ArrowLeft':
      this.handlePrev();
      break;
    case 'ArrowRight':
      this.handleNext();
      break;
    }
  }

  render () {
    const { currentIndex } = this.state;

    const hasMore = currentIndex < pages.length - 1;

    const nextOrDoneBtn = hasMore ? (
      <button onClick={this.handleNext} className='button shake-bottom'>
        <FormattedMessage id='onboarding.next' defaultMessage='Next' /> <i className='fa fa-fw fa-chevron-right' />
      </button>
    ) : (
      <button onClick={this.handleClose} className='button shake-bottom'>
        <FormattedMessage id='onboarding.done' defaultMessage='Done' /> <i className='fa fa-fw fa-check' />
      </button>
    );

    return (
      <div className='introduction'>
        <ReactSwipeableViews index={currentIndex} onChangeIndex={this.handleSwipe} className='introduction__pager'>
          {pages.map((page, i) => (
            <div key={i} className={classNames('introduction__frame-wrapper', { 'active': i === currentIndex })}>{page}</div>
          ))}
        </ReactSwipeableViews>

        <div className='introduction__dots'>
          {pages.map((_, i) => (
            <div
              key={`dot-${i}`}
              role='button'
              tabIndex='0'
              data-index={i}
              onClick={this.handleDot}
              className={classNames('introduction__dot', { active: i === currentIndex })}
            />
          ))}
        </div>
      </div>
    );
  }

}
