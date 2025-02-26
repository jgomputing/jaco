declare module 'react-quill' {
  import React from 'react'

  export interface QuillOptions {
    theme?: string
    modules?: any
    formats?: string[]
    bounds?: string | HTMLElement
    scrollingContainer?: string | HTMLElement
    readOnly?: boolean
    placeholder?: string
  }

  export interface ReactQuillProps extends QuillOptions {
    value?: string
    defaultValue?: string
    onChange?: (content: string) => void
    onChangeSelection?: (range: any, source: any, editor: any) => void
    onFocus?: (range: any, source: any, editor: any) => void
    onBlur?: (previousRange: any, source: any, editor: any) => void
    onKeyPress?: (event: any) => void
    onKeyDown?: (event: any) => void
    onKeyUp?: (event: any) => void
    className?: string
    style?: React.CSSProperties
    tabIndex?: number
    preserveWhitespace?: boolean
  }

  export default class ReactQuill extends React.Component<ReactQuillProps> {
    focus(): void
    blur(): void
    getEditor(): any
  }
} 