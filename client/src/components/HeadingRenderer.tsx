import { Children, ReactNode, createElement, isValidElement } from 'react'

// The flatten function is a helper function used to convert a tree of React nodes into a flat string.
const flatten = (text: string, child: ReactNode): string => {
  if (typeof child === 'string') {
    return text + child
  } else if (isValidElement(child)) {
    return Children.toArray(child.props.children as ReactNode[]).reduce(flatten, text)
  }
  return text
}

// generate id from heading text that may contain CJK chars
const githubId = (val: string) => {
  return (
    val
      .toLowerCase()
      .replace(/ /g, '-')
      // single chars that are removed
      .replace(/[`~!@#$%^&*()+=<>?,./:;"'|{}[\]\\–—]/g, '')
      // CJK punctuations that are removed
      // eslint-disable-next-line no-irregular-whitespace
      .replace(/[　。？！，、；：“”【】（）〔〕［］﹃﹄“”‘’﹁﹂—…－～《》〈〉「」]/g, '')
  )
}

/**
 * HeadingRenderer is a custom renderer
 * It parses the heading and attaches an id to it to be used as an anchor
 */
const HeadingRenderer = (props: { children: ReactNode | ReactNode[]; level: number }) => {
  const chd = Children.toArray(props.children)
  const text = chd.reduce(flatten, '')
  const slug = githubId(text)
  return createElement('h' + props.level, { id: slug }, props.children)
}

export default HeadingRenderer
