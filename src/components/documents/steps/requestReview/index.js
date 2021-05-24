import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { startApprovesListLoading } from 'actions/flowDocument';
import { TextField } from 'components/ui/Form';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import IntlMessages from 'util/IntlMessages';

import schema from './requestReview.schema';
import RolItem from './RolItem';

const useStyles = makeStyles((theme) => ({
    rolTitle: {
        margin: theme.spacing(0, 1),
    },
    rolSubTitle: {
        color: "gray",
        margin: theme.spacing(0, 1),
    },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    buttonPrimary: {
        fontFamily: "Poppins",
        fontSize: '12px',
        fontWeight: 600,
        border: "none",
        boxShadow: "none",
        height: '45px',
        width: '120px'
    }
}));

export default function RequestStep() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);
    const { approvesList } = useSelector(state => state.flowDocument);

    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {},
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    const flowName = "GENERAL";

    const onSubmit = values => {
        const data = { // TODO: Esta es la variable para enviar por props en el modal informativo.
            "flow": {
                "name": flowName
            },
            "document": {
                "uuid": "89b95882-8803-40ca-8ed1-63476bfbb9e1",
                "name": "file1.jpg",
                "author": "juan.suaza",
                "folderId": 101
            },
            "startedBy": "juan.suaza",
            ...values
        }
        alert(JSON.stringify(data))
    };

    const commonProps = {
        register,
        errors,
        control,
        shrink: true,
        size: "small",
    }

    useEffect(() => {
        dispatch(startApprovesListLoading({ authUser, flowName }))
    }, [authUser])

    return <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <TitleCard message="document.title.requestDocument" />
            </Grid>
            <Grid item md={12}>
                <Alert severity="info">
                    <p style={{margin:0}}>
                        <IntlMessages id="document.loadDocuments.info.message" />
                    </p>
                </Alert>
            </Grid>
            {
                approvesList.map(({ role, ...rest }, index) =>
                    <Grid container key={role} item md={12} spacing={2}>
                        <RolItem
                            index={index}
                            rolName={role}
                            setValue={setValue}
                            name={`approves[${index}].users`}
                            commonProps={commonProps}
                            control={control}
                            {...rest} />
                    </Grid>)
            }
            <Grid container item md={12}>
                <TitleCard message="document.loadDocuments.general.remarks" />
            </Grid>
            <Grid container item md={12}>
                <TextField
                    name="comment"
                    label="Comentario"
                    multiline
                    rows={3}
                    {...commonProps} />
            </Grid>
        </Grid>
        <div className="row mt-4">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
                <Grid
                    container
                    justify="flex-end"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <div className={classes.buttons}>

                        <Button
                            className={classes.buttonPrimary}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            <IntlMessages id="document.loadDocuments.submit.flow.next" />
                        </Button>

                    </div>
                </Grid>

            </div>
        </div>

    </form>
}