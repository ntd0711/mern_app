import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { InputField } from 'components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import EditorPost from './post-editor';

function PostForm({ onSubmit, post }) {
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

    const { handleSubmit, control, setValue, reset, getValues } = useForm({
        defaultValues: {
            creator: post?.creator || profile?.name,
            title: post?.title || '',
            htmlContent: post?.htmlContent || '',
            textContent: post?.textContent || '',
            description: post?.description || '',
            tags: post?.tags.join(' ') || '',
        },
        resolver: yupResolver(schema),
    });

    const handleOnSubmit = (data) => {
        if (onSubmit) {
            onSubmit(data);
            reset();
        }
    };

    const handleChangeContent = ({ html, text }) => {
        setValue('htmlContent', html);
        setValue('textContent', text);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <InputField
                name="title"
                value={getValues('title')}
                setValue={setValue}
                label="Title"
                control={control}
            />
            <EditorPost onChange={handleChangeContent} value={getValues('textContent')} />
            <InputField
                name="description"
                value={getValues('title')}
                setValue={setValue}
                fullWidth
                label="Description"
                control={control}
            />
            <InputField
                name="tags"
                value={getValues('tags')}
                setValue={setValue}
                fullWidth
                label="Tags"
                control={control}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Create
            </Button>
        </Box>
    );
}

export default PostForm;
