import React from 'react';
import PropTypes from 'prop-types';
import styles from './About.module.css';

const About = () => (
  <div className="container" style={{marginTop: 15}}>
    This website is to study and create flashcards! You can search by going to the home page or create your own by navigating to the create page!
  </div>
);

About.propTypes = {};

About.defaultProps = {};

export default About;
