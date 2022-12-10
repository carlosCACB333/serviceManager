import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Tooltip } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { ClientSetRatingApi } from '../../helpers/api';

interface Props {
  id: number;
  initValue: number;
}

const Rating = ({ id, initValue }: Props) => {
  const [sliderValue, setSliderValue] = React.useState(initValue);
  const [showTooltip, setShowTooltip] = React.useState(false);

  useEffect(() => {
    if (sliderValue === initValue) return;
    ClientSetRatingApi(id, sliderValue)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }, [sliderValue, id, initValue]);

  return (
    <Slider
      id="slider"
      defaultValue={initValue}
      min={0}
      max={100}
      step={5}
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
        0
      </SliderMark>
      <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
        25%
      </SliderMark>
      <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
        50%
      </SliderMark>
      <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
        75%
      </SliderMark>
      <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
        100%
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip hasArrow placement="top" isOpen={showTooltip} label={`${sliderValue}%`}>
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

export default Rating;
