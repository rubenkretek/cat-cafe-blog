import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const CafesPostTemplate = ({
  content,
  contentComponent,
  description,
  location,
  website,
  tags,
  title,
  subtitle,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <h2>{subtitle}</h2>
            <p>{description}</p>
            <h2>{location}</h2>
            <p>{dateVisited}</p>
            <a href={website}>{website}</a>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

CafesPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  location: PropTypes.string,
  website: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  helmet: PropTypes.object,
}

const CafesPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <CafesPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        location={post.frontmatter.location}
        website={post.frontmatter.website}
        helmet={
          <Helmet titleTemplate="%s | Cafes">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
      />
    </Layout>
  )
}

CafesPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default CafesPost

export const pageQuery = graphql`
  query CafesPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        subtitle
        description
        location
        website
        dateVisited(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
