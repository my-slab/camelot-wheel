import clsx from 'clsx'
import { mergeProps } from '@react-aria/utils'
import { useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex'
import { useHover, usePress } from '@react-aria/interactions'
import { useRef } from 'react'

import { keys } from '../../data/keys'
import { useCamelotKeys } from '../app-provider'

type SliceProps = {
  centroid: [number, number]
  colIndex: number
  d: string
  keyId: string
  rowIndex: number
}
export function Slice(props: SliceProps) {
  let { centroid, d, keyId, rowIndex, colIndex } = props
  let { setSelectedKey } = useCamelotKeys()
  let { hoverProps, isHovered } = useHover({})
  let { pressProps, isPressed } = usePress({})

  const ref = useRef(null)
  const [tabIndex, focused, _handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    false,
    rowIndex
  )

  useFocusEffect(focused, ref)
  let fill = useFill({ keyId, isHovered, isPressed })

  function handleKeyDown(e) {
    _handleKeyDown(e)

    if (e.keyCode === 32 || e.key === 'Enter') {
      e.preventDefault()
      setSelectedKey(keyId)
    }
  }

  function handleOnClick() {
    setSelectedKey(keyId)
    handleClick()
  }

  return (
    <g>
      // @ts-ignore
      <path
        d={d}
        {...mergeProps(hoverProps, pressProps)}
        ref={ref}
        className={clsx(
          'transition-fill ease-linear delay-50 outline-none stroke-purple-600 dark:stroke-purple-500',
          fill
        )}
        style={{ transform: focused && 'scale(1.04)' }}
        strokeWidth={focused ? '8px' : '4px'}
        onKeyDown={handleKeyDown}
        onClick={handleOnClick}
        aria-colindex={colIndex}
        id={keyId}
        role="gridcell"
        tabIndex={tabIndex}
      />
      <Text centroid={centroid} keyId={keyId} />
    </g>
  )
}

function Text(props: Pick<SliceProps, 'centroid' | 'keyId'>) {
  let { centroid, keyId } = props

  return (
    <text
      className={`font-bold text-sm pointer-events-none fill-gray-800 dark:fill-gray-200`}
      style={{
        transform: `translate(${centroid[0] - 6}px, ${centroid[1] + 4}px)`,
      }}
    >
      {(keys.major[keyId] || keys.minor[keyId]).display}
    </text>
  )
}

function useFill({ keyId, isHovered, isPressed }) {
  let { keyChange, keyDown, keyUp, selectedKey } = useCamelotKeys()

  let isSelected = keyId === selectedKey
  let isKeyUp = keyId === keyUp
  let isKeyDown = keyId === keyDown
  let isKeyChange = keyId === keyChange

  let fill = clsx({
    'fill-gray-100': !isHovered,
    'dark:fill-gray-700': !isHovered,
    'fill-green-100': isHovered,
    'dark:fill-gray-600': isHovered,
  })

  if (isSelected)
    fill = clsx({
      'fill-green-500': isSelected || isPressed,
      'dark:fill-green-800': isSelected || isPressed,
      'fill-green-400': isHovered,
      'dark:fill-green-700': isHovered,
    })
  else if (isKeyUp)
    fill = clsx({
      'fill-red-500': isKeyUp || isPressed,
      'dark:fill-pink-700': isKeyUp || isPressed,
      'fill-red-400': isHovered,
      'dark:fill-pink-600': isHovered,
    })
  else if (isKeyDown)
    fill = clsx({
      'fill-blue-500': isKeyDown || isPressed,
      'dark:fill-blue-700': isKeyDown || isPressed,
      'fill-blue-400': isHovered,
      'dark:fill-blue-800': isHovered,
    })
  else if (isKeyChange)
    fill = clsx({
      'fill-yellow-500': isKeyChange || isPressed,
      'dark:fill-purple-800': isKeyChange || isPressed,
      'fill-yellow-400': isHovered,
      'dark:fill-purple-700': isHovered,
    })

  return fill
}
