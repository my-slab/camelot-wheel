import Image from 'next/image'
import { Lock, MusicNotes } from 'phosphor-react'
import { ReactNode } from 'react'
import { VisuallyHidden } from '@react-aria/visually-hidden'

import { Track as _Track } from '../../types'
import { displayKey } from '../app-provider'

function Placeholder(props: { children: ReactNode }) {
  let { children } = props

  return (
    <div
      className="relative rounded-lg p-4 w-32 h-32 bg-gray-300 dark:bg-gray-700 bg-contain bg-center border-purple-200 flex flex-col justify-center items-center"
      role="presentation"
    >
      <MusicNotes size={48} weight="bold" />
      {children}
    </div>
  )
}

export function Track(props: _Track) {
  let { BPM, artist, base, cover, keyId, title } = props

  return (
    <li className="flex flex-col gap-1">
      <Placeholder>
        {cover && (
          <Image
            className="rounded-lg"
            src={cover}
            role="presentation"
            layout="fill"
          />
        )}
      </Placeholder>

      <div className="flex flex-col mt-1 w-32">
        <div className="font-bold text-lg truncate text-center">{title}</div>
        <div className="truncate text-center">{artist}</div>
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <div>
          <VisuallyHidden>Key: </VisuallyHidden>
          <div className="bg-purple-600 px-2 rounded-md text-gray-50">
            {displayKey(keyId)}
          </div>
        </div>
        <div>
          <div className="bg-green-700 px-2 rounded-md text-gray-50">
            <VisuallyHidden>BPM: </VisuallyHidden>
            {BPM}
          </div>
        </div>
        {!base && (
          <Lock size={16} weight="bold" aria-label="Downloadable content" />
        )}
      </div>
    </li>
  )
}
