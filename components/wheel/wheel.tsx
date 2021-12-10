import { RovingTabIndexProvider } from 'react-roving-tabindex'

import { Donut } from './donut'
import { keys } from '../../data/keys'

export function Wheel() {
  const height = 400
  const width = 400
  const radius = Math.min(width, height) / 2
  const donutWidth = 80
  let donutProps = { donutWidth, height, radius, width }
  let { major, minor } = keys

  return (
    <div className="relative">
      <svg
        height={height}
        width={width}
        role="grid"
        className="overflow-visible"
      >
        <RovingTabIndexProvider options={{ focusOnClick: false }}>
          <Donut keys={Object.keys(major)} {...donutProps} rowIndex={1} />
          <Donut
            keys={Object.keys(minor)}
            {...donutProps}
            radius={radius - donutWidth}
            rowIndex={2}
          />
        </RovingTabIndexProvider>
      </svg>
    </div>
  )
}
