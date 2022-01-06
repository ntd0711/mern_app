import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

const InputPassword = (props) => {
    const { name, label, control } = props;
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
                        <FormControl
                            sx={{ mt: 2, mb: 1 }}
                            size="small"
                            fullWidth
                            variant="outlined"
                            error={invalid}
                        >
                            <InputLabel>{label}</InputLabel>
                            <OutlinedInput
                                {...field}
                                type={isShowPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleShowPassword}
                                            edge="end"
                                            sx={{ color: `${invalid ? 'error.light' : ''}` }}
                                        >
                                            {isShowPassword ? (
                                                <MdOutlineVisibilityOff />
                                            ) : (
                                                <MdOutlineVisibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={label}
                            />
                            <FormHelperText id="component-error-text">
                                {error?.message}
                            </FormHelperText>
                        </FormControl>
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
