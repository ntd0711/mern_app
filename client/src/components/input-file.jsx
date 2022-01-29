import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const InputFile = (props) => {
  const { name, disabled, control, onSetFile } = props;

  const handleChangeFile = (e) => {
    if (onSetFile) onSetFile(e.target.files[0]);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, value, ref }, fieldState: { invalid, error } }) => {
          return (
            <>
              <TextField
                sx={{ display: 'none' }}
                id="upload_image"
                onChange={handleChangeFile}
                onBlur={onBlur}
                margin="normal"
                disabled={disabled}
                type="file"
                size="small"
                color="primary"
                error={invalid}
                helperText={error?.message}
                inputProps={{
                  accept: 'image/*',
                }}
              />
            </>
          );
        }}
      />
    </>
  );
};

InputFile.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputFile;
