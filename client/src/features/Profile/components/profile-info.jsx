import { Button, Stack, Typography } from '@mui/material';
import { AvatarCustom } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';
import { toUpperCaseFirstLetter } from 'utils/common';

function ProfileInfo({ profile, postQuantity, isOtherUser }) {
    return (
        <Stack direction="row">
            <AvatarCustom
                url={
                    profile?.avatar?.filePath && `http://localhost:5000/${profile?.avatar.filePath}`
                }
                size={8.1}
            />
            <Stack spacing={2} mt={2} ml={10}>
                <Stack direction="row" spacing={4}>
                    <Typography component="h2" variant="h5">
                        {toUpperCaseFirstLetter(profile?.name)}
                    </Typography>
                    {!isOtherUser && (
                        <Link to="/profile/setting">
                            <Button
                                sx={{ textTransform: 'none' }}
                                color_custom="pink"
                                size="small"
                                variant="outlined"
                            >
                                Edit Profile
                            </Button>
                        </Link>
                    )}
                </Stack>
                <Typography fontSize="1rem" variant="subtitle2">
                    {postQuantity}{' '}
                    <Typography component="span" variant="body1">
                        posts
                    </Typography>
                </Typography>
            </Stack>
        </Stack>
    );
}

export default ProfileInfo;
