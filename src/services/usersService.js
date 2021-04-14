import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getUsers = (authUser,page,maxItems) => {
	return axiosInstance.post('/users/user/getAll',{page,maxItems}, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const infoUsers = (authUser, id) => {
	return axiosInstance.get(`/users/user/id/${id}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const validateUsers = (authUser, idUser) => {
	return axiosInstance.get(`/users/user/validate/${idUser}`, {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};
const searchUsersPage = (authUser, search,page, maxItems) => {
	return axiosInstance.post(`/users/user/search/${search}/paged`, {page, maxItems},{
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});
};

const addUsers = (authUser, id, firstName, lastName, email, password) => {
	return axiosInstance.post(`/users/user`,
		{ id, firstName, lastName, email, password:"password" },
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const editUsers = (authUser,idUser, data) => {
	return axiosInstance.put(`/users/user/${idUser}`,data,
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};

const statusUsers = (authUser, idUser, status) => {
	return axiosInstance.put(`/users/user/${idUser}/status`,{ enabled:status },
		{
			headers: {
				Authorization: `Bearer ${authUser}`,
			},
		}
	);
};






export {
	getUsers,
	addUsers,
	editUsers,
    infoUsers,
    validateUsers,
    statusUsers,
	searchUsersPage,
}