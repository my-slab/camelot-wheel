export type Key = 'major' | 'minor'
export type Note = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
export type Signature = 'flat' | 'sharp' | 'natural'

export type KeySignature = {
  id: string
  key: Key
  note: Note
  signature: Signature
  display: string
}

type Artist = string
type BPM = number
type Title = string
type Cover = string

export type Track = {
  BPM: BPM
  artist: Artist
  base: boolean
  cover?: Cover
  keyId: string
  title: Title
}

export type Tracks = Track[]
