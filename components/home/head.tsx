import _Head from 'next/head'

export function Head() {
  return (
    <_Head>
      <title>Fuser Camelot Wheel</title>
      <link
        rel="preload"
        href="/fonts/AttenRoundNew-Bold.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/AttenRoundNew-ExtraBold.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/AttenRoundNew-Regular.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/AttenRoundNew-RegularItalic.ttf"
        as="font"
        crossOrigin=""
      />
      <link rel="icon" href="/favicon.svg" />
    </_Head>
  )
}
