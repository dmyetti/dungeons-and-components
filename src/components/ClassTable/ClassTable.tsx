import type { TableProps, Column } from "../Table/Table"

import React from "react"

import { getOrdinal } from "../../helpers/numbers"
import Table from "../Table/Table"

type Level<T> = {
  features?: string[]
  spellcasting?: {
    cantrips?: number
    spells?: number
    slots?: number[]
  }
} & T

export interface ClassTableProps<T> extends TableProps<Level<T>> {
  title: string
  before?: Column<Level<T>>[]
  after?: Column<Level<T>>[]
  levels: Array<Level<T>>
}

export default function ClassTable<T>({
  title,
  before = [],
  after = [],
  levels,
  ...props
}: ClassTableProps<T>): JSX.Element {
  const hasCantrips = levels.some((level) => level.spellcasting?.cantrips)
  const hasSpellsKnown = levels.some((level) => level.spellcasting?.spells)
  const maxSpellLevel = Math.max(
    ...(levels
      .map((level) => level.spellcasting?.slots?.length)
      .filter((v) => (typeof v === "number" ? true : false)) as number[]),
  )

  const beforeCols = before.map<Column<Level<T>>>(
    ({ key, label, transform, ...props }) => ({
      key,
      label,
      align: "center",
      transform: (value, data, index) =>
        orDash((transform && transform(value, data, index)) || value),
      ...props,
    }),
  )

  const afterCols = after.map<Column<Level<T>>>(
    ({ key, label, transform, ...props }) => ({
      key,
      label,
      align: "center",
      transform: (value, data, index) =>
        orDash((transform && transform(value, data, index)) || value),
      ...props,
    }),
  )

  const spellData =
    maxSpellLevel <= 0
      ? []
      : ([
          hasCantrips && {
            key: "spellcasting.cantrips",
            label: "Cantrips Known",
            align: "center",
            transform: orDash,
          },
          hasSpellsKnown && {
            key: "spellcasting.spells",
            label: "Spells Known",
            align: "center",
            transform: orDash,
          },
          maxSpellLevel >= 1 && {
            key: "spellcasting.slots[0]",
            label: "1st",
            align: "center",
            transform: orDash,
          },
          maxSpellLevel >= 2 && {
            key: "spellcasting.slots[1]",
            label: "2nd",
            align: "center",
            transform: orDash,
          },
          maxSpellLevel >= 3 && {
            key: "spellcasting.slots[2]",
            label: "3rd",
            align: "center",
            transform: orDash,
          },
          maxSpellLevel >= 4 && {
            key: "spellcasting.slots[3]",
            label: "4th",
            align: "center",
            transform: orDash,
          },
          maxSpellLevel >= 5 && {
            key: "spellcasting.slots[4]",
            label: "5th",
            align: "center",
            transform: orDash,
          },
          maxSpellLevel >= 6 && {
            key: "spellcasting.slots[5]",
            label: "6th",
            align: "center",
            transform: orDash,
          },
          maxSpellLevel >= 7 && {
            key: "spellcasting.slots[6]",
            label: "7th",
            align: "center",
            transform: orDash,
          },
          maxSpellLevel >= 8 && {
            key: "spellcasting.slots[7]",
            label: "8th",
            align: "center",
            transform: orDash,
          },
          maxSpellLevel >= 9 && {
            key: "spellcasting.slots[8]",
            label: "9th",
            align: "center",
            transform: orDash,
          },
        ].filter((v) => v) as Column<Level<T>>[])

  return (
    <Table
      {...props}
      wide
      bordered
      title={title}
      data={levels}
      columns={[
        {
          key: "@index",
          label: "Level",
          align: "center",
          transform: (index: number) => getOrdinal(index + 1),
        },
        {
          key: "@index",
          label: "Proficiency Bonus",
          align: "center",
          transform: (index: number) => getProficiencyBonus(index),
        },
        ...beforeCols,
        {
          key: "features",
          label: "Features",
          transform: (v: string[]) => (v ? v.join(", ") : orDash(v)),
        },
        ...spellData,
        ...afterCols,
      ]}
    />
  )
}

function orDash<T>(value: T): T | string {
  return value || "—"
}

function getProficiencyBonus(level: number) {
  return Math.floor(level / 4) + 2
}
