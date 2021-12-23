import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import FileBase from 'react-file-base64';
import InputField from '../../../components/input';
import { createPost } from '../posts-thunk';
import { useNavigate } from 'react-router-dom';

function FormCreate() {
    const { profile } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        title: yup
            .string()
            .required()
            .test('check title', 'title at least two word', (value) => {
                return value.split(' ').filter((x) => x.length >= 2).length >= 2;
            }),
        content: yup
            .string()
            .required()
            .test('check content', 'content at least two word', (value) => {
                return value.split(' ').filter((x) => x.length >= 2).length >= 2;
            }),
    });

    const { handleSubmit, control, reset, setValue } = useForm({
        defaultValues: {
            name: profile?.name,
            title: '',
            content: '',
            imageUrl: '',
        },
        resolver: yupResolver(schema),
    });

    const handleOnSubmit = async (data) => {
        try {
            await dispatch(createPost(data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <InputField name="title" fullWidth label="Title" control={control} />
            <InputField name="content" fullWidth multiline label="Content" control={control} />
            <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setValue('imageUrl', base64)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Create
            </Button>
        </Box>
    );
}

export default FormCreate;
