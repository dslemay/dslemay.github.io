import React from 'react';
import styled from 'react-emotion';

import heroImg from '../../assets/img/hero-image.jpg';

const Image = styled.div`
  background-image: url(${heroImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  height: 400px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;

  :before {
    background: rgba(230, 216, 175, 0.8);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
  }
`;

const HeroText = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  z-index: 3;

  h1 {
    margin-bottom: 0.6rem;
    font-weight: bold;
  }

  hr {
    background-color: ${props => props.theme.baseColor};
    margin-bottom: 0.6rem;
    height: 4px;
    border-radius: 5px;
  }
`;

const Hero = () => (
  <Image>
    <HeroText>
      <h1>Daniel Lemay</h1>
      <hr />
      <h1>Full Stack JavaScript Developer</h1>
    </HeroText>
  </Image>
);

export default Hero;
