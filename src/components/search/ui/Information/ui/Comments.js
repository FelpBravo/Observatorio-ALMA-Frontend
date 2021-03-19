import { IconButton, TextField, Grid, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import { makeStyles } from '@material-ui/core/styles';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveCommentsLoading } from 'actions/information'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    coment: {
        backgroundColor: '#EFF7FF',
        color: '#494B74',
        padding: 10,
        paddingBottom: '1rem',
        borderRadius: 10,
        height: 'auto',
        marginTop:10
    },
}));


const Comments = (props) => {
    const { authUser, fileId } = props

    const classes = useStyles();
    const dispatch = useDispatch()
    const { comments = [], } = useSelector(state => state.info);

    useEffect(() => {
        dispatch(startSaveCommentsLoading(authUser, fileId))
    }, [fileId])



    const NewComent = () => {

    const handleSubmit = ()=>{
        console.log("Prueba");

    }

    const [text,setText] = useState('')
    

        return (
            <div>
            <form onSubmit={handleSubmit}>
                <p onClick={() => {
                    console.log(comments);
                }}>Prueba</p>
                <Grid container>
                    <Grid item xs={10}>
                        <TextField
                            label={<IntlMessages id="comment.newcomment.title" />}
                            variant="outlined"
                            color="primary"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={1} className="mt-3 ml-1">
                        <IconButton type="submit" style={{ background: "#3699FF", width: 15, height: 15 }}>
                            <NearMeOutlinedIcon style={{ color: "white", fontSize: 15 }} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <AttachFileOutlinedIcon fontSize="small" />
                        </IconButton>
                    </label>
                    <p style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, color: "#3699FF", marginTop: 13 }}	>
                        <IntlMessages id="comment.attachment.title" />
                    </p>
                </Grid>
                </form>
            </div>
        )
    }


    const Comment = (props) => {
        const { author, text, date, countcomments, attachment } = props

        const [active, setActive] = useState(false);

    

        return (
            <div className={classes.coment}>
                <span style={{ fontSize: 14, color: "#3699FF" }}>{author}</span>
                <p style={{ fontSize: 13 }}>{text}</p>
                {attachment.length > 0 && attachment.map(({ name }) => {
                    return (<p style={{ color: "#3699FF", fontSize: 11 }}>{name}</p>)
                })

                }
                <Grid container >
                    
                    <span style={{ fontSize: 12, cursor:'pointer' }} onClick={()=>setActive(!active)} ><MessageOutlinedIcon style={{ fontSize: 20 }} /><IntlMessages id="comment.button.comment" /></span>
                    <span style={{ marginLeft: 5, fontSize: 12, color: "#A7A8BB" }} >{countcomments} <IntlMessages id="comment.button.totalcomments" /></span>
                </Grid>
                {active &&
                   <NewComent/>
                }


            </div>)

    }

    const NewReply = () => {
        return (
            <div>
                <Grid>
                    <Grid item xs={10}>
                        <TextField
                            label="Escribe nuevo comentario"
                            variant="outlined"
                            color="primary"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={1} className="mt-3 ml-1">
                        <IconButton type="submit" style={{ background: "#3699FF", width: 15, height: 15 }}>
                            <NearMeOutlinedIcon style={{ color: "white", fontSize: 15 }} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid >
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <AttachFileOutlinedIcon fontSize="small" />
                        </IconButton>
                    </label>
                    <p style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, color: "#3699FF", marginTop: 13 }}	>
                        Adjuntar documento al comentario
                    </p>
                </Grid>
            </div>
        )
    }

    return (
        <div>
            <NewComent />
            {comments.length > 0 && comments.map(({ author, content, createdOn, id, totalReplies, attachments }) => {
                return (
                    <>
                        <Comment
                            author={author}
                            text={content}
                            date={createdOn}
                            countcomments={totalReplies}
                            attachment={attachments}
                        />
                    </>
                )

            })
            }
        </div>
    )

}

export default Comments
