import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import { css } from 'emotion';
import Link from 'gatsby-link';
import { FaChevronRight } from 'react-icons/lib/fa';
import { postSlug } from '../../utils/helpers';

// Converts YYYY-MM-DD to Month Day, Year
const longDateFormat = date => {
  const dateArr = date.split('/');
  let monthNum = dateArr[1];
  monthNum = `0${monthNum - 1}`.slice(-1);
  let dayNum = dateArr[2];
  dayNum = parseInt(dayNum, 10);
  const monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return `${monthArr[monthNum]} ${dayNum}, ${dateArr[0]}`;
};

const createPostExcerpt = post => {
  const regex = /<p>.+<\/p>/g;
  return post
    .match(regex)
    .slice(0, 2)
    .join('');
};

const BlogIndexContainer = styled.div`
  ${props => props.theme.margins};
  margin-top: 65px;
  padding-top: 1rem;
`;

const postHeaderDetails = css`
  margin-bottom: 0.7rem;
`;

const postHeaderDate = css`
  ${postHeaderDetails};
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
  font-weight: bold;
`;

const PostImage = styled.img`
  float: left;

  @media (min-width: 700px) {
    max-width: 300px;
  }

  @media (min-width: 1000px) {
    max-width: 400px;
  }
`;

const readMore = css`
  margin-right: 0.4rem;
`;

const PostDivider = styled.hr`
  margin: 0.7rem 0 1.5rem 0;
  height: 3px;
  background-color: ${props => props.theme.complementaryDark};
`;

const BlogPostExcerpt = ({ node }) => {
  const { title, postDate } = node;
  const { html: body } = node.body.childMarkdownRemark;
  const headlineImage = !node.headlineImage ? null : node.headlineImage.file.url;
  const headlineAltText = headlineImage ? node.headlineImage.description : null;
  const slug = postSlug(postDate, title);
  const excerpt = createPostExcerpt(body);

  return (
    <div>
      <h1 className={postHeaderDetails}>{title}</h1>
      <div className={postHeaderDate}>{longDateFormat(postDate)}</div>
      {headlineImage && <PostImage src={headlineImage} alt={headlineAltText} />}
      <div
        dangerouslySetInnerHTML={{ __html: excerpt }} // eslint-disable-line react/no-danger
      />
      <Link to={slug}>
        <span className={readMore}>Read More</span>
        <FaChevronRight size={15} />
      </Link>
      <PostDivider />
    </div>
  );
};

BlogPostExcerpt.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    postDate: PropTypes.string.isRequired,
    headlineImage: PropTypes.shape({
      description: PropTypes.string,
      file: PropTypes.shape({
        url: PropTypes.string
      })
    })
  }).isRequired
};

const BlogIndex = ({ data: { allContentfulBlogPost: { edges } } }) => {
  const Posts = edges.map(edge => <BlogPostExcerpt key={edge.node.id} node={edge.node} />);

  return (
    <BlogIndexContainer>
      <Helmet title="Blog | Daniel Lemay" />
      {Posts}
    </BlogIndexContainer>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.shape({
    allContentfulBlogPost: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            postDate: PropTypes.string.isRequired,
            body: PropTypes.shape({
              childMarkdownRemark: PropTypes.shape({
                html: PropTypes.string.isRequired
              }).isRequired
            }).isRequired,
            headlineImage: PropTypes.shape({
              description: PropTypes.string,
              file: PropTypes.shape({
                url: PropTypes.string
              })
            })
          }).isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    allContentfulBlogPost(sort: { fields: [postDate], order: DESC }) {
      edges {
        node {
          id
          title
          postDate(formatString: "YYYY/MM/DD")
          body {
            childMarkdownRemark {
              html
            }
          }
          headlineImage {
            description
            file {
              url
            }
          }
        }
      }
    }
  }
`;
