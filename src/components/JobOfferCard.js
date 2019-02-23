import React from 'react';
import PropTypes from 'prop-types';

class JobOfferCard extends React.Component {
  state = {visited: false};

  static propTypes = {
    city: PropTypes.string,
    capacity: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
  };

  render() {
    const {city, capacity, description, link} = this.props;

    return (
      <div>
        <h3>{city}</h3>
        <span>{capacity}</span>
        <span>{description}</span>
        <a href={link}>{'Ver Oferta'}</a>
      </div>
    );
  }
}

//Ussage
//<JobOfferCard city={'Madrid'} capacity={'Backend'} description={'Developer'} link={'https://www.kairosds.com/trabaja-con-nosotros/backend-developer/'}/>

export default JobOfferCard;
