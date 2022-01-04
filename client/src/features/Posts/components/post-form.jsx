import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { InputField } from 'components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import EditorPost from './post-editor';

function PostForm({ onSubmit }) {
    const { profile } = useSelector((state) => state.user);

    const schema = yup.object().shape({
        title: yup
            .string()
            .required()
            .test('check title', 'title at least two word', (value) => {
                return value.split(' ').filter((x) => x.length >= 2).length >= 2;
            }),
        // content: yup
        //     .string()
        //     .required()
        //     .test('check content', 'content at least two word', (value) => {
        //         return value.split(' ').filter((x) => x.length >= 2).length >= 2;
        //     }),
        description: yup
            .string()
            .required()
            .test('check description', 'description at least two word', (value) => {
                return value.split(' ').filter((x) => x.length >= 2).length >= 2;
            }),
        tags: yup.string().required(),
    });

    const { handleSubmit, control, setValue } = useForm({
        defaultValues: {
            creator: profile?.name,
            title: '',
            content: '',
            description: '',
            tags: '',
        },
        resolver: yupResolver(schema),
    });

    const handleOnSubmit = (data) => {
        if (onSubmit) onSubmit(data);
    };

    const handleChangeContent = (value) => {
        setValue('content', value);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <InputField name="title" fullWidth label="Title" control={control} />
            {/* <InputField name="content" fullWidth multiline label="Content" control={control} /> */}
            <EditorPost onChange={handleChangeContent} />
            <InputField name="description" fullWidth label="Description" control={control} />
            <InputField name="tags" fullWidth label="Tags" control={control} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Create
            </Button>
        </Box>
    );
}

export default PostForm;
