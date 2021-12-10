import { PauseCircle } from 'phosphor-react'
import { ReactNode } from 'react'

import { Track } from './track'
import { Track as _Track, Tracks } from '../../types'

type TracklistProps = { tracklist: Tracks; heading: ReactNode; icon: ReactNode }
export function Tracklist(props: TracklistProps) {
  let { heading, icon, tracklist = [] } = props

  return (
    <section className="flex flex-col items-start gap-5">
      <h3 className="bg-gray-600 px-2 rounded-md text-gray-50">
        <span className="flex flex-row items-center justify-center gap-2">
          {icon} {heading}
        </span>
      </h3>

      {tracklist.length ? (
        <ol className="flex flex-row gap-8 flex-wrap">
          {tracklist.map((t: _Track) => {
            let { BPM, artist, base, cover, keyId, title } = t

            return (
              <Track
                BPM={BPM}
                artist={artist}
                base={base}
                cover={cover}
                key={`${artist}::${title}`}
                keyId={keyId}
                title={title}
              />
            )
          })}
        </ol>
      ) : (
        <p className="italic font-bold flex-col gap-2 items-center inline-flex">
          <PauseCircle weight="bold" size={32} /> There are no tracks in the
          selected key and BPM range.
        </p>
      )}
    </section>
  )
}
