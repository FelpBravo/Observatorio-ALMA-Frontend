import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 2),
    },
    paper: {
        maxWidth: 500,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(1),
    },
}));

const Metadata = () => {
    const classes = useStyles();
    const { docs } = useSelector(state => state.documents);

    return (
        <div>
            {docs.aspectGroup &&
                <>
                    <span className="badge badge-primary ">{docs.aspectGroup.name}</span>
                    {docs.aspectGroup.aspectList.map((a) => {
                        return <div className={classes.root}>
                            <Paper className={classes.paper}>
                                <div style={{ fontSize: "16px", fontFamily: "Poppins", fontWeight: '500' }} className='mt-2'>{a.label}</div>
                                {a.customPropertyList.map((p) => {
                                    return <div className="container">
                                        <div style={{ padding: "9px 6px 9px 0px" }} className="row">
                                            <div style={{ fontSize: "13px", fontFamily: "Poppins", fontWeight: 'bold' }}>
                                                {p.label}:
                                    </div>
                                            <div style={{ fontSize: "13px", fontFamily: "Poppins" }} className='ml-1'>
                                                {isNaN(Date.parse(p.value)) ? p.value : new Date(p.value).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </Paper>
                        </div>
                    })}
                </>
            }



        </div>
    )

}

export default Metadata