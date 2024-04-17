export interface Lead {
	_id: string;
	files: string[];
	services: [Service];
	reference: string;
	description: string;
	companyName: string;
	priority: string;
	nextFollowUpAt: string;
	assignedTo: User;
	assignedAt: string;
	assignedBy: User;
	createdBy: string;
	createdAt: string;
	customer: Customer;
	contactPerson: CustomerLead;
	address: Address;
	customAddress: CustomAddress;
	liveLocation: boolean;
	converted: boolean;
	__v: number;
}

export enum UserTypes {
	Admin = 'admin',
	ServicePerson = 'servicePerson',
	MarketingPerson = 'marketingPerson'
}

export interface CustomerLead {
	name: string;
	mobileNumber: string;
}

export interface CustomAddress {
	district: string;
	street: string;
	area: string;
	landmark: string;
}

export interface InstallationData {
	_id: string;
	service: Service;
	serviceCall: ServiceCall;
	files: string[];
	uploadedAt: string;
	uploadedBy: User;
	serviceDateAt: string;
	__v: number;
}

export interface ServiceCallData {
	_id: string;
	service: Service;
	serviceCall: ServiceCall;
	files: string[];
	uploadedAt: string;
	createdAt: string;
	remarks: string;
	createdBy: User;
	assignedTo: User;
	assignedToSecond: User;
	uploadedBy: User;
	isPending: Boolean;
	isCompleted: Boolean;
	isStarted: Boolean;
	isCancel: Boolean;
	serviceDateAt: string;
	__v: number;
}

export interface ServiceCall {
	_id: string;
	name: string;
	mobileNumber: string;
	service: Service;
	customer?: Customer;
	details: {
		isActive: Boolean,
		serviceCallData: string
	},
	createdBy: User;
	nextServiceAt: string;
	createdAt: string;
	remarks: string;
	updatedAt: string;
	address: Address;
	assignedTo: User;
	assignedToSecond: User;
	__v: number;
}

export interface AuthUser {
	name: String;
	lastLoginAt: Date;
	email: String;
	isActive: Boolean;
	type: String;
	mobileNumber: String;
	_id: String;
	permissions: String[];
}

export interface Installation {
	_id: string;
	name: string;
	mobileNumber: string;
	service: Service;
	serviceCall: ServiceCall;
	details: {
		isActive: Boolean,
		serviceCall: string
		serviceCallData: string
	},
	customer: Customer;
	createdBy: User;
	assignedTo: User;
	nextServiceAt: string;
	assignedToSecond: User;
	createdAt: string;
	remarks: string;
	completed: boolean;
	updatedAt: string;
	address: Address;
	__v: number;
}
export interface District {
	name: string;
	id: string;
}

export interface Service {
	_id: string;
	name: string;
	slug: string;
}

export interface Customer {
	_id: string;
	name: string;
	mobileNumber: string;
}
export interface Branch {
	_id: string;
	name: string;
	branchName: string;
}

export interface User {
	_id: string;
	name: string;
	type: string;
	branch: Branch;
	createdAt: string;
	email: string;
	mobileNumber: string;
	permissions: string[];
	isActive: boolean;
	__v: number;
	lastLoginAt: string;
}
export interface Address {
	street: string;
	district: string;
	pincode: number;
	area: string;
	state: string;
	latitude: string;
	longitude: string;
	landmark: string;
}
