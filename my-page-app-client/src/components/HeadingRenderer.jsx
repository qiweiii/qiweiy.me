import React from 'react'

const flatten = (text, child) => {
  return typeof child === 'string' ? text + child : React.Children.toArray(child.props.children).reduce(flatten, text)
}

// generate id from heading text that may contain CJK chars
const githubId = (val) => {
  return (
    val
      .toLowerCase()
      .replace(/ /g, '-')
      // single chars that are removed
      .replace(/[`~!@#$%^&*()+=<>?,./:;"'|{}[\]\\–—]/g, '')
      // CJK punctuations that are removed
      .replace(/[　。？！，、；：“”【】（）〔〕［］﹃﹄“”‘’﹁﹂—…－～《》〈〉「」]/g, '')
  )
}

/**
 * HeadingRenderer is a custom renderer
 * It parses the heading and attaches an id to it to be used as an anchor
 */
const HeadingRenderer = (props) => {
  const children = React.Children.toArray(props.children)
  const text = children.reduce(flatten, '')
  const slug = githubId(text)
  return React.createElement('h' + props.level, { id: slug }, props.children)
}

export default HeadingRenderer
