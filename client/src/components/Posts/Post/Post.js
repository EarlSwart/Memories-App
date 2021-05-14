import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHoriztIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { Lightbox } from 'react-modal-image';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [open, setOpen] = useState(false);

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(true);
    };

    return (
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} onClick={handleToggle} />
                {open && (<Lightbox
                    medium={post.selectedFile}
                    large={post.selectedFile}
                    alt={post.title}
                    onClose={handleClose} />)}
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHoriztIcon fontSize="default" />
                        </Button>
                    </div>
                )}
                <div className={classes.details} >
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" >{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button color="primary" size="small" disabled={!user?.result} onClick={() => { dispatch(likePost(post._id)) }}>
                        <Likes />
                    </Button>
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                        (<Button color="primary" size="small" onClick={() => { dispatch(deletePost(post._id)) }}>
                            <DeleteIcon fontSize="small" /> Delete
                        </Button>)}
                </CardActions>
            </Card>
    );
}

export default Post;