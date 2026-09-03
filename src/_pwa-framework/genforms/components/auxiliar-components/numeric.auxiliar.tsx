import { NumericFormat, NumericFormatProps } from "react-number-format";

import { forwardRef } from "react";

export const NumericControl = forwardRef<NumericFormatProps, any>(
  function NumericFormatCustom(props: any, ref: any) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            name: props.name,
            value: values.value,
          });
        }}
        thousandSeparator={!props.avoidseparator}
        valueIsNumericString
        fixedDecimalScale={
          props.format === "finance" ? true : props.fixdecimalseparator
        }
        decimalScale={
          props.format == "finance"
            ? 2
            : props.format == "units"
              ? 0
              : props.decimalScale
        }
        prefix={props.format == "finance" ? props.prefix ?? "$" : props.prefix}
      />
    );
  }
);
