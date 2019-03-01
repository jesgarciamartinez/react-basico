import React from 'react';
import PropTypes from 'prop-types';

class JobOfferCard extends React.Component {
  state = {visited: false};

  visitedClass = {
    backgroundColor: 'red',
  };

  static propTypes = {
    city: PropTypes.string,
    capacity: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
  };

  setVisited = () => {
    // window.open(this.props.link);
    this.setState({visited: true});
  };

  render() {
    const {city, capacity, description} = this.props;

    return (
      <div
        className={`job-offer-card ${this.state.visited &&
          'job-offer-card-visited'}`}
      >
        <span className={'job-offer-card-city'}>{city}</span>
        <span className={'job-offer-card-capacity'}>{capacity}</span>
        <span className={'job-offer-card-description'}>{description}</span>
        <button
          className={'job-offer-card-show-offer'}
          onClick={this.setVisited}
        >
          {'Ver Oferta'}
        </button>
      </div>
    );
  }
}

//Ussage
//<JobOfferCard city={'Madrid'} capacity={'Backend'} description={'Developer'} link={'https://www.kairosds.com/trabaja-con-nosotros/backend-developer/'}/>

export default JobOfferCard;
