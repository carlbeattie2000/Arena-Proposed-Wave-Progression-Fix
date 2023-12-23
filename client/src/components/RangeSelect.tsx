import { Box, FormControl, FormLabel, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface RangeSelectProps {
  label: string,
  min: number,
  max: number,
  minStepsBetween: number,
  step: number,
  setStart?: Dispatch<SetStateAction<number>>,
  setEnd?: Dispatch<SetStateAction<number>>,
  format?: boolean
}

export default function RangeSelect({label, min, max, minStepsBetween, step, setStart, setEnd, format}: RangeSelectProps) {
  const [startValue, setStartValue] = useState(min);
  const [endValue, setEndValue] = useState(max)

  return (
    <FormControl>
    <FormLabel>{label}</FormLabel>
    <RangeSlider aria-label={['start year', 'end year']} value={[startValue, endValue]} min={min} max={max} minStepsBetweenThumbs={minStepsBetween} step={step} onChange={(e) => {
      if (setStart && setEnd) {
      setStart(e[0]);
      setEnd(e[1]);
      }

      setStartValue(e[0]);
      setEndValue(e[1]);
    }}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>

      <RangeSliderThumb boxSize={8} index={0}>
        <Box>
          <Text fontSize='xs'>{format ? new Intl.NumberFormat().format(startValue) : startValue}</Text>
        </Box>
      </RangeSliderThumb>

      <RangeSliderThumb boxSize={8} index={1}>
        <Box>
          <Text fontSize='xs'>{format ? new Intl.NumberFormat().format(endValue) : endValue}</Text>
        </Box>
      </RangeSliderThumb>

    </RangeSlider>
    </FormControl>
  )
}
