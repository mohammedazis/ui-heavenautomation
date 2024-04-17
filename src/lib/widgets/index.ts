import AddService from './service/AddService.svelte';
import DeleteService from './service/DeleteService.svelte';
import DeleteInstallation from './installation/DeleteInstallation.svelte';
import ListInstallations from './installation/ListInstallations.svelte';
import EditInstallation from './installation/EditInstallation.svelte';
import DeleteServiceCall from './service-call/DeleteServiceCall.svelte';
import CancelServiceCall from './service-call/CancelServiceCall.svelte';
import EditService from './service/EditService.svelte';
import AddCustomer from './customer/AddCustomer.svelte';
import DeleteCustomer from './customer/DeleteCustomer.svelte';
import EditCustomer from './customer/EditCustomer.svelte';
import AddUser from './user/AddUser.svelte';
import DeleteUser from './user/DeleteUser.svelte';
import EditUser from './user/EditUser.svelte';
import AddLead from './lead/AddLead.svelte';
import ConvertLead from './lead/ConvertLead.svelte';
import DeleteLead from './lead/DeleteLead.svelte';
import EditLead from './lead/EditLead.svelte';
import ChangePassword from './ChangePassword.svelte';
import PermissionsTab from './Permissions.svelte';
import Sessions from './Sessions.svelte';
import AddBranch from './branch/AddBranch.svelte';
import EditBranch from './branch/EditBranch.svelte';

export {
	AddBranch,
	EditBranch,
	Sessions,
	DeleteServiceCall,
	DeleteInstallation,
	AddCustomer,
	ListInstallations,
	ConvertLead,
	EditInstallation,
	AddService,
	AddUser,
	CancelServiceCall,
	ChangePassword,
	DeleteCustomer,
	DeleteService,
	DeleteUser,
	EditCustomer,
	EditService,
	EditUser,
	PermissionsTab,
	AddLead,
	DeleteLead,
	EditLead
};
