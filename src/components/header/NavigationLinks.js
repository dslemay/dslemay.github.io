import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { css } from 'emotion';
import Link from 'gatsby-link';
import ScrollLink from '../ScrollLink';
import themeUtils from '../themeUtils';

const LinksContainer = styled.div`
  margin-bottom: 0;
  margin-right: 0;
  background-color: ${themeUtils.baseColor};

  a {
    color: ${themeUtils.lightAccent};
    cursor: pointer;
    transition: color 500ms;

    &:visited {
      color: ${themeUtils.lightAccent};
    }

    &:hover {
      color: ${themeUtils.complementaryDark};
    }
  }
`;

const MobileLinks = css`
  position: absolute;
  right: 0px;
  padding: 0 1em;
  padding-top: 0.5em;
  transition: all 800ms;
  z-index: 9;

  a {
    margin-bottom: 0.75em;
  }
`;

const MobileLinksOpen = css`
  ${MobileLinks};
  top: 63px;
  opacity: 1;
`;

const MobileLinksClosed = css`
  ${MobileLinks};
  top: -100px;
  opacity: 0;
`;

const LinkStyleDesktop = css`
  margin-right: 1.5em;
  text-decoration: none;
  display: inline;
`;

const LinkStyleMobile = css`
  margin-right: 0;
  text-decoration: none;
  display: block;
`;

const NavLink = props => {
  if (props.homePage) {
    return (
      <ScrollLink
        to={props.to}
        href={`#${props.to}`} // Needed for accessibility of react-scroll implementation
        className={props.mobile ? LinkStyleMobile : LinkStyleDesktop}
        smooth
        offset={-80}
        duration={1000}
      >
        {props.text}
      </ScrollLink>
    );
  }
  return (
    <Link to={`/#${props.to}`} className={props.mobile ? LinkStyleMobile : LinkStyleDesktop}>
      {props.text}
    </Link>
  );
};

NavLink.propTypes = {
  homePage: PropTypes.bool.isRequired
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
  text: PropTypes.string.isRequired
};

NavLink.defaultProps = {
  mobile: false
};

function renderLinksLayout(mobile, isOpen) {
  if (!mobile) return '';
  return mobile && isOpen ? MobileLinksOpen : MobileLinksClosed;
}

const NavigationLinks = props => {
  const { home } = props;
  return (
    <LinksContainer className={renderLinksLayout(props.mobile, props.isOpen)}>
      <NavLink to="about" text="About" mobile={props.mobile} homePage={home} />
      <NavLink to="work" text="Work" mobile={props.mobile} homePage={home} />
      <NavLink to="contact" text="Contact" mobile={props.mobile} homePage={home} />
      <Link to="/blog" className={props.mobile ? LinkStyleMobile : LinkStyleDesktop}>
        Blog
      </Link>
    </LinksContainer>
  );
};

NavigationLinks.propTypes = {
  mobile: PropTypes.bool,
  isOpen: PropTypes.bool,
  home: PropTypes.bool.isRequired
};

NavigationLinks.defaultProps = {
  mobile: false,
  isOpen: false
};

export default NavigationLinks;
