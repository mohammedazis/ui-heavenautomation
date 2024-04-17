import type { AuthUser } from '$lib/types';
import { hasPermission, Modules, PermissionTypes } from './functions';

export const dynamicNavigationData = (authUser: AuthUser) => {
	const permissions = authUser.permissions;
	const userType = authUser.type;

	return [
		{
			label: 'Menus',
			isHeader: true
		},
		{
			icon: 'ServerCrash',
			label: 'Services',
			link: '/services',
			show: hasPermission(permissions, PermissionTypes.Manage, Modules.Services),
			id: 'services',
			stateVariables: 'isServices'
		},
		{
			icon: 'BetweenHorizontalStart',
			label: 'Service Call',
			link: '/service-calls',
			id: 'serviceCall',
			stateVariables: 'isServiceCalls',
			subMenu: [
				{
					id: 'Service Calls',
					label: 'Service Calls',
					show: hasPermission(permissions, PermissionTypes.Manage, Modules.ServiceCalls),
					link: '/service-calls'
				},
				{
					id: 'Add Service Call',
					label: 'Create Service Call',
					show: hasPermission(permissions, PermissionTypes.Create, Modules.ServiceCalls),
					link: '/service-calls/add'
				}
			]
		},
		{
			icon: 'MonitorDot',
			label: 'Customers',
			link: '/customers',
			show: hasPermission(permissions, PermissionTypes.Manage, Modules.Customers),
			id: 'customers',
			stateVariables: 'isCustomers'
		},
		{
			icon: 'FerrisWheel',
			show: true,
			label: 'Installations',
			link: '/installations',
			id: 'installations',
			stateVariables: 'isInstallations',
			subMenu: [
				{
					id: 'Installations',
					label: 'Installations',
					show: hasPermission(permissions, PermissionTypes.Manage, Modules.Installations),
					link: '/installations'
				},
				{
					id: 'Add Installation',
					label: 'Create Installation',
					show: hasPermission(permissions, PermissionTypes.Create, Modules.Installations),
					link: '/installations/add'
				}
			]
		},
		{
			icon: 'Split',
			label: 'Branches',
			link: '/branches',
			show: hasPermission(permissions, PermissionTypes.Manage, Modules.Users),
			id: 'branches',
			stateVariables: 'isBranches'
		},
		{
			icon: 'Users',
			show: true,
			label: 'Users',
			link: '/users',
			id: 'users',
			stateVariables: 'isUsers',
			subMenu: [
				{
					id: 'Users',
					label: 'Users',
					show: hasPermission(permissions, PermissionTypes.Manage, Modules.Users),
					link: '/users'
				},
				{
					id: 'inactive users',
					label: 'Inactive Users',
					show: hasPermission(permissions, PermissionTypes.Create, Modules.Users),
					link: '/users/inactive'
				}
			]
		},

		{
			icon: 'TrendingUp',
			label: 'Completed',
			link: '/completed',
			show: true,
			id: 'completed',
			stateVariables: 'isCompleted',
			subMenu: [
				{
					id: 'Service Calls',
					label: 'Service Calls',
					show: hasPermission(permissions, PermissionTypes.Manage, Modules.ServiceCalls),
					link: '/service-calls/completed'
				},
			]
		},
		{
			icon: 'TrendingDown',
			label: 'Pending',
			link: '/pendings',
			show: true,
			id: 'pendings',
			stateVariables: 'isPendings',
			subMenu: [
				{
					id: 'Service Calls',
					label: 'Service Calls',
					show: hasPermission(permissions, PermissionTypes.Manage, Modules.ServiceCalls),
					link: '/service-calls/pendings'
				},
				{
					id: 'Installations',
					label: 'Installations',
					show: hasPermission(permissions, PermissionTypes.Manage, Modules.Installations),
					link: '/installations/pendings'
				},
			]
		},
		{
			icon: 'SlidersHorizontal',
			label: 'Leads',
			link: '/leads',
			show: true,
			id: 'leads',
			stateVariables: 'isLeads',
			subMenu: [
				{
					id: 'Leads',
					label: 'Leads',
					show: hasPermission(permissions, PermissionTypes.Manage, Modules.Leads),
					link: '/leads'
				},
				{
					id: 'Add Lead',
					label: 'Create Lead',
					show: hasPermission(permissions, PermissionTypes.Create, Modules.Leads),
					link: '/leads/add'
				},
				{
					id: 'Converted Leads',
					label: 'Converted Leads',
					show: hasPermission(permissions, PermissionTypes.Manage, Modules.Leads),
					link: '/leads/converted'
				},
			]
		},
		{
			label: 'Search',
			isHeader: true
		},
		// {
		// 	icon: 'SearchCheck',
		// 	label: 'Users',
		// 	link: '/search/users',
		// 	id: 'searchUsers',
		// 	show: userType == 'admin',
		// 	stateVariables: 'isSearchUsers'
		// },
		{
			icon: 'SearchCode',
			label: 'Customers',
			link: '/search/customers',
			show: userType == 'admin',
			id: 'searchCustomers',
			stateVariables: 'isSearchCustomers'
		}
	];
};

export const navigationData = [
	{
		label: 'Menus',
		isHeader: true
	},
	{
		icon: 'ServerCrash',
		label: 'Services',
		link: '/services',
		id: 'services',
		stateVariables: 'isServices'
	},
	{
		icon: 'BetweenHorizontalStart',
		label: 'Service Call',
		link: '/service-calls',
		// show: hasPermission(),
		id: 'serviceCall',
		stateVariables: 'isServiceCalls',
		subMenu: [
			{
				id: 'Service Calls',
				label: 'Service Calls',
				link: '/service-calls'
			},
			{
				id: 'Add Service Call',
				label: 'Create Service Call',
				link: '/service-calls/add'
			}
		]
	},
	{
		icon: 'MonitorDot',
		label: 'Customers',
		link: '/customers',
		id: 'customers',
		show: true,
		stateVariables: 'isCustomers'
	},
	{
		icon: 'FerrisWheel',
		show: true,
		label: 'Installations',
		link: '/installations',
		id: 'installations',
		stateVariables: 'isInstallations',
		subMenu: [
			{
				id: 'Installations',
				label: 'Installations',
				link: '/installations'
			},
			{
				id: 'Add Installation',
				label: 'Create Installation',
				link: '/installations/add'
			}
		]
	},
	{
		icon: 'Users',
		show: true,
		label: 'Users',
		link: '/users',
		id: 'users',
		stateVariables: 'isUsers'
	},

	{
		icon: 'SlidersHorizontal',
		label: 'Leads',
		link: '/leads',
		show: true,
		id: 'leads',
		stateVariables: 'isLeads',
		subMenu: [
			{
				id: 'Leads',
				label: 'Leads',
				link: '/leads'
			},
			{
				id: 'Add Lead',
				label: 'Create Lead',
				link: '/leads/add'
			}
		]
	},
	{
		label: 'Search',
		isHeader: true
	},
	{
		icon: 'SearchCheck',
		label: 'Users',
		link: '/search/users',
		id: 'searchUsers',
		stateVariables: 'isSearchUsers'
	},
	{
		icon: 'SearchCode',
		label: 'Customers',
		link: '/search/customers',
		id: 'searchCustomers',
		stateVariables: 'isSearchCustomers'
	}
];
