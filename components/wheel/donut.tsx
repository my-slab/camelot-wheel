import { arc as Arc, pie as Pie } from 'd3'
import clsx from 'clsx'

import { Slice } from './slice'

type DonutProps = {
  donutWidth: number
  height: number
  keys: string[]
  radius: number
  rowIndex: number
  width: number
}

export namespace Types {
  export type Data = string[]
}

export function Donut(props: DonutProps) {
  let { donutWidth, height, keys, radius, rowIndex, width } = props

  const pie = Pie<string>()
    .value(() => (1 / 12) * 100)
    .sort(null)

  const arc = Arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius)

  return (
    <g
      transform={`translate(${width / 2}, ${height / 2})`}
      role="row"
      aria-rowindex={rowIndex}
    >
      {pie(keys).map((e, i) => {
        return (
          <Slice
            d={arc(e as any)}
            key={e.data}
            keyId={e.data}
            rowIndex={rowIndex}
            colIndex={i + 1}
            centroid={arc.centroid(e as any)}
          />
        )
      })}
    </g>
  )
}
