import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { withBreakable } from "../../helpers/styled"

export const Container = styled.div<{
  breakable?: boolean
}>`
  ${withBreakable}
`

export const List = styled.ul`
  list-style: none;
  padding-left: 0;

  ul {
    margin-left: 0.125in;
  }
`

export const ListItem = styled.li`
  margin-bottom: 1px;
`

export const Label = styled.div<{
  level: number
  name: string
}>`
  ${({ level }) =>
    level === 0 &&
    css`
      font-size: 0.25in;
      color: #58180d;
      border-bottom: 2px solid #c9ad6a;
      font-variant: small-caps;

      margin-top: 0.0625in;
      margin-bottom: 0.0625in;
    `}

  ${({ level }) =>
    level === 1 &&
    css`
      font-size: 0.15in;
    `}

  ${({ level }) =>
    level > 0 &&
    css`
      width: auto;
      overflow: hidden;
      white-space: nowrap;
      display: block;

      &:after {
        font-family: BookSanity;
        font-size: 0.125in;
        font-weight: normal;
        color: black;
        content: " .............................."
          "......................................"
          "......................................"
          "......................................";
      }
    `}
`

export const PageNumber = styled.div<{
  level: number
}>`
  float: right;
  margin-left: 1px;

  ${({ level }) =>
    level === 0 &&
    css`
      margin-top: ${(0.25 * 1.25 * 1) / 4}in;
      line-height: ${(0.25 * 1.25 * 3) / 4}in;
    `}

  ${({ level }) =>
    level === 1 &&
    css`
      line-height: ${0.15 * 1.25}in;
    `}

  ${({ level }) =>
    level > 1 &&
    css`
      line-height: ${0.125 * 1.25}in;
    `}
`
