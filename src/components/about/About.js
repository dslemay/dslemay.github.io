import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Element } from 'react-scroll';
import Hero from './Hero';
import Skills from './Skills';
import Blurb from './Blurb';
import RandomQuote from './RandomQuote';
import themeUtils from '../themeUtils';

import headshot from '../../assets/img/headshot.jpg';

const AboutGridContainer = styled.div`
  ${themeUtils.margins};
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template: repeat(3, auto) / repeat(6, 1fr);
  grid-gap: 20px;

  @media (max-width: 700px) {
    grid-gap: 10px;
  }
`;

const ProfilePic = styled.img`
  margin: 0 auto;
  border-radius: 50%;
  max-width: 150px;
  max-height: 150px;
  grid-area: 1 / 1 / 2 / 3;
  align-self: center;

  @media (min-width: 700px) {
    max-width: 175px;
    max-height: 175px;
  }

  @media (min-width: 1000px) {
    max-width: 250px;
    max-height: 250px;
  }
`;

const AboutHeader = styled.h1`
  font-size: 3rem;
  justify-self: center;
  align-self: center;
  grid-area: 1 / 4 / 2 / span 3;
  color: ${themeUtils.baseColor};

  @media (min-width: 700px) {
    grid-column: 5 / span 2;
  }

  @media (min-width: 1000px) {
    grid-column: 3 / span 2;
    font-size: 4rem;
  }
`;

const About = props => (
  <section id="about" ref={props.inputRef}>
    <Hero />
    <Element name="about" />
    <AboutGridContainer>
      <ProfilePic src={headshot} />
      <AboutHeader>About</AboutHeader>
      <RandomQuote />
      <Skills />
      <Blurb />
    </AboutGridContainer>
  </section>
);

About.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default About;
