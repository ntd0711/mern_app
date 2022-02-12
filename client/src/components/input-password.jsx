import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const InputPassword = (props) => {
  const { name, label, control, clearErrorFromServer } = props;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
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
              <FormControl sx={{ mt: 1 }} size="small" fullWidth variant="outlined" error={invalid}>
                <OutlinedInput
                  {...field}
                  onInput={clearErrorFromServer}
                  id={name}
                  placeholder={label}
                  type={isShowPassword ? 'text' : 'password'}
                  sx={{
                    color: '#eee',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    '& input': {
                      borderColor: 'transparent',
                      display: 'block',
                      height: '50px',
                      width: '100%',
                      borderRadius: '3px',
                      padding: '0 10px',
                      fontSize: '14px',
                      fontWeight: 300,
                      '$::placeholder': {
                        color: ' #e5e5e5',
                      },
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    },
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                        sx={{ color: `${invalid ? 'error.light' : '#e5e5e5'}` }}
                      >
                        {isShowPassword ? <i class="bx bx-show"></i> : <i class="bx bx-hide"></i>}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={label}
                />
                <FormHelperText id="component-error-text">{error?.message}</FormHelperText>
              </FormControl>
            </>
          );
        }}
      />
    </>
  );
};

InputPassword.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  multiline: PropTypes.bool,
};

export default InputPassword;
