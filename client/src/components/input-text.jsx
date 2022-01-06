import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const InputField = (props) => {
    const { name, label, value, disabled, control, multiline } = props;

    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={value}
                render={({ field, fieldState: { invalid, error } }) => {
                    return (
                        <TextField
                            {...field}
                            label={label}
                            margin="normal"
                            disabled={disabled}
                            multiline={multiline}
                            fullWidth
                            size="small"
                            rows={multiline ? 8 : null}
                            color="primary"
                            error={invalid}
                            helperText={error?.message}
                        />
                    );
                }}
            />
        </>
    );
};

InputField.propTypes = {
    control: PropTypes.object,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

export default InputField;
