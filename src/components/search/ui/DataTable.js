import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useLocation, useParams,useRouteMatch  } from 'react-router-dom';
import { 
	startDeleteDocument, 
	startSearchLoading, 
	startSubscribeDocument, 
	openModalVisibility, 
	openModalFirm, 
	openModalVersioning, 
	startDownloadDocument,
	startVersioningLoading 
} from 'actions/search';
import { startDocumentByIdVisibility } from 'actions/documents';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import queryString from 'query-string';
import Swal from 'sweetalert2';
import Paper from '@material-ui/core/Paper';
import FingerprintOutlinedIcon from '@material-ui/icons/FingerprintOutlined';
import Link from '@material-ui/core/Link';
import { MoreVert } from '@material-ui/icons';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import { columnsDocuments } from 'helpers/columnsDocuments';
import { DataTableHead } from './DataTableHead';
import TableActionButton from './TableActionButton';
import ModalVisibility from './ModalVisivility';
import ModalFirm from './ModalFirm';
import ModalVersioning from './ModalVersioning';
import ShareIcon from '@material-ui/icons/Share';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';


const useStyles = makeStyles((theme) => ({
	table: {
	  minWidth: 650,
	},
	margin: {
	  margin: theme.spacing(1),
	},
	backdrop: {
	  zIndex: theme.zIndex.drawer + 1,
	  color: "#fff",
	},
	iconsHolder: {
	  display: "flex",
	  alignItems: "center",
	},
	iconos: {
	  cursor: "pointer",
	  color: "#2196f3",
	  fontSize: '18px',
	},
	root: {
	  overflowX: "auto",
	  margin: "0 auto",
	  fontFamily: "Poppins",
	},
	pagination: {
		marginBottom:'10px',
		marginTop:'10px',
		width:'100%',
	  },
  }));


const DataTable = () => {

	const classes = useStyles();

	const { authUser, authorities  } = useSelector(state => state.auth);

	const isMounted = useRef(true);

	const history = useHistory();

	const dispatch = useDispatch();
	const location = useLocation();

	const { documents = {}, fields = [], textSearch = '' } = useSelector(state => state.searchs);
	const { data = [], totalItems = 0 } = documents;
	const { filters } = fields;

	
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const { id, page } = useParams()
	const { path, url } = useRouteMatch();


	let page_url = 1
	console.log("A",page);
	console.log('F',page_url);
	if(page){
		page_url = page.trim()? page.replace(/[a-zA-Z ]/g,'') : 1
	}
	
	console.log("b",page_url);

	const { folderId } = queryString.parse(location.search);

	const folderId2 = id? id : folderId	

	const ROLE_FILE_DOWNLOAD = authorities.find(rol=> rol === 'ROLE_FILE_DOWNLOAD')

	const ROLE_FILE_UPDATE = authorities.find(rol=> rol === 'ROLE_FILE_UPDATE') 

	const ROLE_FILE_DELETE = authorities.find(rol=> rol === 'ROLE_FILE_DELETE') 

	const ROLE_FILE_PREVIEW = authorities.find(rol=> rol === 'ROLE_FILE_PREVIEW') 

	useEffect(() => {

		return () => {
	 		isMounted.current = false;
		}

	}, []);

	const handleVisibility=(id, name) =>{
    	dispatch(openModalVisibility());
		dispatch(startDocumentByIdVisibility(id, name));
	};

	const handleFirm=(id, name) =>{
    	dispatch(openModalFirm());
		dispatch(startDocumentByIdVisibility(id, name));
	};

	const handleVersioning=(id) =>{
		history.push(`/document/${id}/version`);
	};


	console.log(path,url);
	const handleChangePage = (event, page) => {

		if(path === '/search/:page' || path === '/search'){
			const existsFilters = filters.filter(filter => filter.value);

			dispatch(startSearchLoading(authUser, textSearch, existsFilters, folderId2, page_url));
		}
		else
		{
			if(page === 1 )
			{
				history.push(`/directory/${id}`);
			}
			else{
				history.push(`/directory/${id}/p${page}`);
			}
			
		}
		
		

	};

	

	const handleDownload = async (id, name) => {
		if(ROLE_FILE_DOWNLOAD){const resp = await Swal.fire({
			title: 'Descargar',
			text: "¿Está seguro que quiere descargar el documento?",
			icon: "question",
			showCancelButton: true,
			focusConfirm: true,
			heightAuto: false,
		});
		if (resp.value) {
			dispatch(startDownloadDocument(id,name))
		}}

	}

	const handleEdit = (id) => {
		history.push(`/document/${id}/edit`);
		
	}

	const handleDelete = async (id) => {
		const resp = await Swal.fire({
			title: 'Eliminar',
			text: "¿Está seguro que quiere eliminar el documento?",
			icon: "question",
			showCancelButton: true,
			focusConfirm: true,
			heightAuto: false,
		});
		if (resp.value) {
			dispatch(startDeleteDocument(id));
		}
	}

	const handleSubscribe = (id) => {
		dispatch(startSubscribeDocument(id));
	}
	
	

	
	return (
		<div className="row mt-3">

		<div className="col-xl-12 col-lg-12 col-md-12 col-12">

			<TableContainer component={Paper}>
				<Table size="small" aria-label="a dense table">
	
						<DataTableHead
							columns={columnsDocuments}
						/>
						<TableBody >
							{data.map((
								{   id,
									name,
									createdAt,
									modifiedAt,
									tags = [],
									version,
									isFavorite,
									createdByUser
								}) => {
								return (
									<TableRow
										hover
										tabIndex={-1}
										key={id}
									>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '13px', fontWeight: 400}}>
											<span style={{color:"#2196f3"}}><i className="far fa-file-pdf custom-link-dash"></i>{` `} {name}</span>
										</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{`${createdByUser}`}</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{createdAt.substr(0,10)}</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>{modifiedAt.substr(0,10)}</TableCell>
										<TableCell>
											{
												tags.length > 0
												&&
												tags.map((tag) => {
													return (
														<i
															key={tag.id}
															style={{ color: tag.hex, margin: 1 }}
															className="zmdi zmdi-circle jr-fs-xxs"
														/>
													)
												})
											}
										</TableCell>
										<TableCell style={{ fontFamily: "Poppins", fontSize: '12px', fontWeight: 400 }}>
											{/*<Link
											onClick={() => handleVersioning(id, name)}
											component="button"
											variant="body2"
											>{version}</Link>*/}
											{version}
										</TableCell>
										<TableCell></TableCell>
										<TableCell>
											<div className={classes.iconsHolder}>
											{ ROLE_FILE_PREVIEW &&
											   <TableActionButton
													materialIcon={
													<VisibilityOutlinedIcon
														className={classes.iconos}
														onClick={() => handleVisibility(id, name)}
													/>
													}
												/>}
												<TableActionButton
														materialIcon={
														<SaveAltOutlinedIcon
															className={classes.iconos}
															onClick={() => handleDownload(id, name)}
														/>
														}
													/>
											{ ROLE_FILE_UPDATE &&
												<TableActionButton
													materialIcon={
													<BorderColorOutlinedIcon
														className={classes.iconos}
														onClick={() => handleEdit(id)}
													/>
													}
												/>}
                                           {/* { ROLE_FILE_DELETE &&
												<TableActionButton
													materialIcon={
													<DeleteOutlinedIcon
														className={classes.iconos}
														onClick={() => handleDelete(id)}
													/>
													}
												/>}
												<TableActionButton
													materialIcon={
													<PlaylistAddCheckOutlinedIcon
														className={classes.iconos}
														onClick={() => handleSubscribe(id)}
													/>
													}
												/>
												<TableActionButton
													materialIcon={
													<FingerprintOutlinedIcon
														className={classes.iconos}
														onClick={() => handleFirm(id, name)}
													/>
													}
													/>*/}
													<TableActionButton
														materialIcon={
														<LoopOutlinedIcon
															className={classes.iconos}
															onClick={() => handleVersioning(id, name)}
														/>
														}
														/>
													<TableActionButton
													materialIcon={
													<ShareIcon
														className={classes.iconos}
														//onClick={() => handleFirm(id, name)}
													/>
													}
													/>
												{/*<MoreVert
													className={classes.iconos}
													onClick={() => console.log("test")}
												/>*/}
												</div>
											</TableCell>

										{/*<TableCell>
											<MenuTable
												id={id}
												isFavorite={isFavorite}
											/>
										</TableCell>*/}

									</TableRow>
								);
							})}
						</TableBody>		
					</Table>
				</TableContainer>
				<Grid className="mt-3 mb-3 mr-3"
									container
									justify="flex-end"
									alignItems="flex-end"

								>
									<Pagination 
									style={{color: '#369bff'}}
									defaultPage={parseInt(page_url)}
									count={Math.ceil(totalItems/rowsPerPage)} 
									color="primary" 
									shape="rounded" 
									total={totalItems} 
									onChange={handleChangePage}/>
								</Grid>
				<ModalVisibility/>
				<ModalFirm/>
                <ModalVersioning/>
			</div>
		</div>
	
	);
};

export default DataTable;