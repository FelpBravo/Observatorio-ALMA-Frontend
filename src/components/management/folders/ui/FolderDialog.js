import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalFolder, foldersValidate, startEditFolderLoading, startFoldersTypesLoading, startUpdateFolderLoading, validateFolders } from 'actions/adminFolders';
import { startFoldersInitLoading } from 'actions/folders'
import { ACTION_CREATE } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';
import { MenuItem } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { AutoCompleteField, CheckField, DateField, RadioGroupField, SelectField, TextField } from 'components/ui/Form';

const fieldName = <IntlMessages id="folders.modal.field.name" />
const fieldPosition = <IntlMessages id="folders.modal.field.position" />

const FolderDialog = () => {

	const dispatch = useDispatch();

	const { authUser } = useSelector(state => state.auth);

	const { openModal, folder, actionModal, currentFolders, typeFolders = [], historyFolders = [], foldersName } = useSelector(state => state.adminFolders);

	const { id } = currentFolders

	const [formValues, setFormValues] = useState({});

	const { name, type, state, parentId, parentName } = formValues;

	const [messageErrorName, setMessageErrorName] = useState(null)

	const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
		mode: 'onTouched',
		name: 'folderForm',
		defaultValues: {},
		shouldUnregister: true,
	});

	const workSpaceName = watch('name', null)

	useEffect(() => {
		setFormValues({ ...folder });
		dispatch(startFoldersTypesLoading(authUser, id < 0 ? 0 : id))

	}, [folder, setFormValues]);

	useEffect(() => {
		console.log("workSpaceName", )
		if (workSpaceName) {
			if (workSpaceName?.length > 3){
				dispatch(validateFolders(authUser, workSpaceName))
				setMessageErrorName(null);
			}
		}

	}, [workSpaceName])

	const handleClose = () => {

		dispatch(closeModalFolder());

	}

	const handleOnSave = values => {
		const data = {
			...values,
			position: 1,
			state: String(formValues.state) === 'true',
			company: 1
		};
		data.name = data.name.trim()

		console.log("data to send", data)

		if (actionModal === ACTION_CREATE) {
			dispatch(startUpdateFolderLoading(authUser, data, id, parentId))
			dispatch(closeModalFolder());


		} else {
			dispatch(startEditFolderLoading(authUser, data, parentId, parentName));
			dispatch(closeModalFolder());

		}
		setTimeout(() => {
			dispatch(startFoldersInitLoading(authUser));
		}, 300)

	}

	const commonProps = {
		register,
		errors,
		control,
		shrink: true,
		size: "small",
	}

	const nameProps = {
		name: "name",
		label: fieldName,
		...commonProps,
		// helperText = {!foldersName ? (messageErrorName ? messageErrorName : '') : 'Usuario ya existe'
	}

	const workSpaceTypeProps = {
		name: "type",
		label: "Tipo de espacio de trabajo",
		...commonProps,
		// helperText = {!foldersName ? (messageErrorName ? messageErrorName : '') : 'Usuario ya existe'
	}


	return (
		<div>
			<Dialog
				open={openModal}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
			>
				<DialogTitle>
					{
						actionModal === ACTION_CREATE
							? <IntlMessages id="folders.modal.title.create" style={{ fontSize: 16, fontFamily: "Poppins" }} />
							: <IntlMessages id="folders.modal.title.edit" />
					}
				</DialogTitle>
				<form onSubmit={handleSubmit(handleOnSave)}>
					<DialogContent>
						{actionModal === ACTION_CREATE &&
							<SelectField {...workSpaceTypeProps}>
								{typeFolders && typeFolders.map((data, index) =>
									<MenuItem value={data} key={index}>{data.name}</MenuItem>
								)
								}
							</SelectField>
						}

						<div className="mt-2">
							<TextField {...nameProps} />
						</div>

					</DialogContent>

					<DialogActions style={{ margin: 20 }}>
						<Button
							onClick={handleClose}
							variant="contained"
							style={{ backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", border: "none", boxShadow: "none" }}
						>
							<IntlMessages id="button.text.cancel" />
						</Button>

						<Button
							// disabled={(name && name.length > 3) && type ? false : true}
							// onClick={handleOnSave}
							type="submit"
							variant="contained"
							color="primary"
						>
							<IntlMessages id="button.text.save" />
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export default FolderDialog;
