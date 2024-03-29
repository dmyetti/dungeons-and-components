import type { LinkTarget } from "../Link/Link"

import React from "react"

import Link, { useLinks } from "../Link/Link"

import {
  Container,
  List,
  ListItem,
  Label,
  PageNumber,
} from "./TableOfContents.styled"

interface Item {
  label: string
  name: string
  page?: number
}

type Items = Array<Item | Items>

type ItemsInput = Array<string | Item | ItemsInput>

export interface TableOfContentsProps
  extends React.ComponentProps<typeof Container> {
  items: ItemsInput
}

export default function TableOfContents({
  items,
  ...props
}: TableOfContentsProps): JSX.Element {
  return (
    <Container {...props}>
      <Rows level={0} items={items} />
    </Container>
  )
}

interface RowsProps {
  level: number
  items: ItemsInput
}

function Rows({ level, items: items_ }: RowsProps): JSX.Element {
  const links = useLinks()
  const items = normalize(links, items_)

  return (
    <List>
      {items.map((item, index) =>
        Array.isArray(item) ? (
          <ListItem key={index}>
            <Rows level={level + 1} items={item} />
          </ListItem>
        ) : (
          <ListItem key={index}>
            <PageNumber level={level}>{item.page}</PageNumber>
            <Label as={Link} level={level} name={item.name}>
              {item.label}
            </Label>
          </ListItem>
        ),
      )}
    </List>
  )
}

function normalize(
  links: Record<string, { ref: LinkTarget; label: string }>,
  list: ItemsInput,
): Items {
  return list.map((item) => {
    if (Array.isArray(item)) {
      return normalize(links, item)
    }

    if (typeof item === "string") {
      const link = links[item]

      return {
        name: item,
        label: link?.label || item,
        page: getPage(link),
      }
    }

    const link = links[item.name]

    return {
      ...item,
      page: typeof item.page === "number" ? item.page : getPage(link),
    }
  })
}

function getPage(link?: {
  ref: LinkTarget
  label: string
}): number | undefined {
  if (link) {
    const page = link.ref.current?.closest("[data-page=true]")
    if (page) {
      const container = page.parentElement
      if (container) {
        const pages = Array.from(container.querySelectorAll("[data-page=true]"))
        const number = pages.indexOf(page) + 1
        if (number > 0) {
          return number
        }
      }
    }
  }

  return undefined
}
