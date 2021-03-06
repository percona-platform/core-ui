import React, { FC, useMemo, ReactNode } from 'react';
import { Field, FieldMetaState, FieldInputProps, UseFieldConfig } from 'react-final-form';
import { cx } from 'emotion';
import { useStyles } from '@grafana/ui';
import { Validator, compose } from '../../shared/validators';
import { getStyles } from './TextInput.styles';
import { FieldInputAttrs } from '../../shared/types';

/**
 * Note: the validation error message will be displayed once the the input has been modified.
 * To show the error message on blur you have to pass `showErrorOnBlur`.
 */
export interface TextInputFieldProps extends UseFieldConfig<string> {
  className?: string;
  disabled?: boolean;
  fieldClassName?: string;
  inputProps?: FieldInputAttrs;
  label?: string | ReactNode;
  name: string;
  placeholder?: string;
  required?: boolean;
  showErrorOnBlur?: boolean;
  validators?: Validator[];
}

interface TextFieldRenderProps {
  input: FieldInputProps<string>;
  meta: FieldMetaState<string>;
}

export const TextInputField: FC<TextInputFieldProps> = React.memo(
  ({
    className,
    disabled = false,
    fieldClassName,
    inputProps,
    label,
    name,
    placeholder,
    required = false,
    showErrorOnBlur = false,
    validators,
    ...fieldConfig
  }) => {
    const styles = useStyles(getStyles);
    const inputId = `input-${name}-id`;
    const validate = useMemo(() => (Array.isArray(validators) ? compose(...validators) : undefined), [
      validators,
    ]);

    return (
      <Field {...fieldConfig} type="text" name={name} validate={validate}>
        {({ input, meta }: TextFieldRenderProps) => {
          const validationError = ((!showErrorOnBlur && meta.modified) || meta.touched) && meta.error;

          return (
            <div className={cx(styles.field, fieldClassName)} data-qa={`${name}-field-container`}>
              {label && (
                <label className={styles.label} htmlFor={inputId} data-qa={`${name}-field-label`}>
                  {`${label}${required ? ' *' : ''}`}
                </label>
              )}
              <input
                id={inputId}
                {...input}
                {...inputProps}
                disabled={disabled}
                placeholder={placeholder}
                data-qa={`${name}-text-input`}
                className={cx(styles.input, { invalid: !!validationError }, className)}
              />
              <div data-qa={`${name}-field-error-message`} className={styles.errorMessage}>
                {validationError}
              </div>
            </div>
          );
        }}
      </Field>
    );
  },
);

TextInputField.displayName = 'TextInputField';
