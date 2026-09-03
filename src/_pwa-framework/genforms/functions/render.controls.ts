import { ControlDictionary, EControls } from "../types/common.types";

import { BasicAutocompleteFields } from "../components/basics-controls/autocomplete.generic";
import { BasicCheckFields } from "../components/basics-controls/check.generic";
import { BasicCustomComponent } from "../components/basics-controls/custom-component.generic";
import { BasicDateFields } from "../components/basics-controls/date.generic";
import { BasicNumberFields } from "../components/basics-controls/number.generic";
import { BasicRadioFields } from "../components/basics-controls/radio.generic";
import { BasicRatingFields } from "../components/basics-controls/rating.generic";
import { BasicSelectFields } from "../components/basics-controls/select.generic";
import { BasicSliderFields } from "../components/basics-controls/slider.generic";
import { BasicSwitchFields } from "../components/basics-controls/switch.generic";
import { BasicTextFields } from "../components/basics-controls/input.generic";
import { BasicTimeFields } from "../components/basics-controls/time.generic";
import { ScannerGeneric } from "../components/special-controls/scanner.generic";
import { GeoLocationField } from "../components/basics-controls/geo.generic";

export function getControl(type: EControls) {
  return DICTIONARY[type];
}

const DICTIONARY: ControlDictionary = {
  number: BasicNumberFields,
  select: BasicSelectFields,
  multiselect: BasicSelectFields,
  autocomplete: BasicAutocompleteFields,
  date: BasicDateFields,
  time: BasicTimeFields,
  check: BasicCheckFields,
  switch: BasicSwitchFields,
  slider: BasicSliderFields,
  text: BasicTextFields,
  radio: BasicRadioFields,
  rating: BasicRatingFields,
  component: BasicCustomComponent,
  scanner: ScannerGeneric,
  geo: GeoLocationField,
};
