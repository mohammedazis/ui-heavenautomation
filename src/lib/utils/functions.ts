import type { Cookies } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

const slugify = (str: String) =>
	String(str)
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

const makeLowerCase = (str: String) => {
	if (str) return str.toLowerCase();
	return '';
};

const capitalizeFirstLetter = (string: String) => {
	if (string) return string.charAt(0).toUpperCase() + string.slice(1);
	return string;
};

const serializeNonPOJOs = (value: String) => {
	return structuredClone(value);
};

const clickOutside = (node: HTMLElement, handler: () => void): { destroy: () => void } => {
	const onClick = (event: MouseEvent) =>
		node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented && handler();

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
};

const formErrors = (msgs: any, cookies: Cookies) => {
	return Array.isArray(msgs)
		? msgs.forEach((msg) => {
				setFlash({ type: ToastMSGs.ERROR, message: msg }, cookies);
			})
		: setFlash({ type: ToastMSGs.ERROR, message: msgs }, cookies);
};

enum ToastMSGs {
	SUCCESS = 'success',
	ERROR = 'error',
	INFO = 'info'
}

enum PermissionTypes {
	Manage = 'manage',
	Create = 'create',
	Read = 'read',
	Update = 'update',
	Delete = 'delete'
}

enum UserTypes {
	Admin = 'admin',
	ServicePerson = 'servicePerson',
	MarketingPerson = 'marketingPerson'
}

enum Modules {
	Customers = 'customers',
	Installations = 'installations',
	Services = 'services',
	ServiceCalls = 'serviceCalls',
	Users = 'users',
	Branches = 'branches',
	Permissions = 'permissions',
	Leads = 'leads'
}

const hasPermission = (
	permissions: String[],
	permission: PermissionTypes,
	object: Modules
): Boolean => {
	const currentOne = `${permission}:${object}`;
	return permissions.includes(currentOne);
};

export {
	UserTypes,
	slugify,
	serializeNonPOJOs,
	ToastMSGs,
	capitalizeFirstLetter,
	hasPermission,
	PermissionTypes,
	Modules,
	formErrors,
	makeLowerCase,
	clickOutside
};
