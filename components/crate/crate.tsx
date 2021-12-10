import {
  ArrowCircleDown,
  ArrowCircleUp,
  ArrowsClockwise,
  MusicNotes,
  Package,
} from 'phosphor-react'
import { useMemo, useState } from 'react'

import { Slider } from './slider'
import { Tracklist } from './tracklist'
import { displayKey, useCamelotKeys } from '../app-provider'
import { tracklist as data } from '../../data/tracklist'

export function Crate() {
  let [[floor, ceiling], setRange] = useState([120, 130])
  let { selectedKey, keyUp, keyDown, keyChange } = useCamelotKeys()

  const filterByBPM = useMemo(
    () =>
      function filterByBPM(e: { BPM: number }) {
        let { BPM } = e
        BPM = Number(BPM)
        return BPM >= floor && BPM <= ceiling
      },
    [floor, ceiling]
  )

  let selectedKeyData = data?.[selectedKey]?.filter(filterByBPM)
  let keyUpData = data?.[keyUp]?.filter(filterByBPM)
  let keyDownData = data?.[keyDown]?.filter(filterByBPM)
  let keyChangeData = data?.[keyChange]?.filter(filterByBPM)

  return (
    <div className="flex flex-col rounded-md gap-5">
      <div className="flex justify-between items-center">
        <h2 className="text-left text-3xl font-bold inline-flex flex-row gap-2 items-center">
          <Package weight="bold" role="presentation" /> Crate
        </h2>

        <Slider
          defaultValue={[floor, ceiling]}
          label="BPM"
          maxValue={150}
          minValue={90}
          onChange={(v: [number, number]) => setRange(v)}
          step={5}
        />
      </div>

      <div
        className="flex flex-col gap-8 flex-wrap border-t-4 border-purple-600 pt-8"
        aria-live="polite"
      >
        <Tracklist
          icon={<MusicNotes weight="bold" />}
          heading={`Selected key - ${displayKey(selectedKey)}`}
          tracklist={selectedKeyData}
        />
        <Tracklist
          icon={<ArrowCircleUp weight="bold" />}
          heading={`Key up - ${displayKey(keyUp)}`}
          tracklist={keyUpData}
        />
        <Tracklist
          icon={<ArrowCircleDown weight="bold" />}
          heading={`Key down - ${displayKey(keyDown)}`}
          tracklist={keyDownData}
        />
        <Tracklist
          icon={<ArrowsClockwise weight="bold" />}
          heading={`Key change - ${displayKey(keyChange)}`}
          tracklist={keyChangeData}
        />
      </div>
    </div>
  )
}
