export const fixedFolders = [
	{
		name: 'sidebar.main',
		type: 'section',
		children: [
			{
				id: -2,
				name: 'sidebar.home',
				icon: 'view-dashboard',
				type: 'item',
				link: '/dashboard',
				auth: '',
				bd: false,
			},
			{
				id: -10,
				name: 'sidebar.document.magnagement',
				icon: 'tab',
				type: 'item',
				link: '/inbox',
				auth:'ROLE_FILE_MENU',
				bd: false,
			},
			{
				id: -6,
			    name: 'sidebar.documents',
			 	icon: 'file',
			 	type: 'item',
			 	link: '/documentcreation',
			 	auth:'ROLE_FILE_MENU',
			 	bd: false,
			},
			{
				id: -1,
				name: 'sidebar.load.documents',
				icon: 'upload',
				type: 'item',
				link: '/documents',
				auth:'ROLE_FILE_MENU',
				bd: false,
			},
			{
				id: -3,
				name: 'sidebar.tags.home',
				icon: 'tag',
				type: 'item',
				link: '/tags',
				auth:'ROLE_TAG_MENU',
				bd: false,
			},
			{
				id: -4,
				name: 'sidebar.tags.management',
				icon: 'settings',
				type: 'collapse',
				auth: 'ROLE_FOLDER_MENU',
				bd: false,
				children: [
					{
						id: -8,
						name: 'sidebar.tags.folders',
						type: 'item',
						link: '/management/folders',
						auth: ['ROLE_FOLDER_MENU'],
						bd: false,
					},
					{
						id: -7,
						name: 'sidebar.tags.usersandgroup',
						type: 'item',
						link: '/management/usersandgroups',
						auth: ['ROLE_USERS_CREATE', 'ROLE_USERS_UPDATE', 'ROLE_GROUPS_CREATE', 'ROLE_GROUPS_UPDATE', 'ROLE_GROUPS_DELETE'],
						hasAll: false,
						bd: false,
					},
					{
						id: -9,
						name: 'sidebar.permissions',
						type: 'item',
						link: '/group-permissions',
						auth: ['ROLE_PERMISSIONS_UPDATE'],
						hasAll: true,
						bd: false,
					},
				],
			},
			// {
			// 	id: -5,
			// 	name: 'sidebar.tags.report',
			// 	icon: 'chart',
			// 	type: 'item',
			// 	link: '/reports',
			// 	//auth: 'ROLE_REPORT_MENU',
			// 	bd: false,
			// },
			
		],
	},
	/*{
		name: 'sidebar.admin',
		type: 'section',
		children: [
			{
				id: -3,
				name: 'sidebar.tags.home',
				icon: 'view-dashboard',
				type: 'item',
				link: '/tags',
				bd: false,
			},
		],
	},*/
	{
		name: 'sidebar.folders',
		type: 'section',
		children: [],
	},
];