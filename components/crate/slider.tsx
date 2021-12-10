import { VisuallyHidden } from '@react-aria/visually-hidden'
import { mergeProps } from '@react-aria/utils'
import { useFocusRing } from '@react-aria/focus'
import { useNumberFormatter } from '@react-aria/i18n'
import { useRef } from 'react'
import { useSlider, useSliderThumb } from '@react-aria/slider'
import { useSliderState } from '@react-stately/slider'

export function Slider(props) {
  let trackRef = useRef(null)
  let numberFormatter = useNumberFormatter(props.formatOptions)
  let state = useSliderState({ ...props, numberFormatter })
  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  )

  return (
    <div
      {...groupProps}
      className="relative flex flex-col items-center"
      style={{
        width: 300,
        touchAction: 'none',
      }}
    >
      <div className="flex self-stretch">
        {props.label && (
          <label {...labelProps} className="font-bold">
            {props.label}
          </label>
        )}
        <output
          {...outputProps}
          className="flex flex-auto text-sm items-center justify-end text-right"
        >
          {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
        </output>
      </div>

      <div
        {...trackProps}
        ref={trackRef}
        className="relative"
        style={{
          height: 30,
          width: ' 100%',
        }}
      >
        <div
          className="absolute bg-gray-500 w-full"
          style={{
            height: 3,
            top: 13,
          }}
        />
        <Thumb index={0} state={state} trackRef={trackRef} />
        <Thumb index={1} state={state} trackRef={trackRef} />
      </div>
    </div>
  )
}

export function Thumb(props) {
  let { state, trackRef, index } = props
  let inputRef = useRef(null)
  let { thumbProps, inputProps } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state
  )

  let { focusProps, isFocusVisible } = useFocusRing()
  return (
    <div
      style={{
        position: 'absolute',
        top: 4,
        transform: 'translateX(-50%)',
        left: `${state.getThumbPercent(index) * 100}%`,
      }}
    >
      <div
        {...thumbProps}
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: isFocusVisible
            ? 'orange'
            : state.isThumbDragging(index)
            ? 'dimgrey'
            : 'gray',
        }}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </div>
    </div>
  )
}
