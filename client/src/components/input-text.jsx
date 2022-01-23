import { InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const InputField = (props) => {
  const { name, value, label, disabled, control, placeholder, height } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field, fieldState: { invalid, error } }) => {
          return (
            <>
              <InputLabel
                htmlFor={name}
                sx={{
                  color: '#eee',
                  display: 'block',
                  marginTop: '20px',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                {label}
              </InputLabel>
              <TextField
                {...field}
                id={name}
                margin="normal"
                disabled={disabled}
                fullWidth
                placeholder={placeholder}
                error={invalid}
                helperText={error?.message}
                sx={{
                  mt: 1,
                  '& .MuiOutlinedInput-root': {
                    color: '#eee',
                    '& input': {
                      borderColor: 'transparent',
                      display: 'block',
                      height: height || '50px',
                      width: '100%',
                      backgroundColor: 'common.light_dark',
                      borderRadius: '3px',
                      padding: '0 10px',
                      fontSize: '14px',
                      '$::placeholder': {
                        color: ' #e5e5e5',
                      },
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }}
              />
            </>
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
