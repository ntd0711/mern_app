import React from 'react';
import { useParams } from 'react-router-dom';

function BlogDetail() {
    const { id } = useParams;
    return (
        <div>
            <h2>Blog detail {id}</h2>
        </div>
    );
}

export default BlogDetail;
