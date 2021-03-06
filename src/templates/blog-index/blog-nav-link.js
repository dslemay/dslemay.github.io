// @flow
import * as React from 'react'
import { Link } from 'gatsby'

type Props = {
  test: boolean,
  text: string,
  url: string,
}

const BlogNavLink = ({ test, text, url }: Props) => {
  return !test ? <Link to={url}>{text}</Link> : null
}

export default BlogNavLink
