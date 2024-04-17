import type { Branch } from '$lib/types';
import type { ToastMSGs } from '$lib/utils';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			branches: Branch[];
			authUser: {
				name: String;
				lastLoginAt: Date;
				email: String;
				isActive: Boolean;
				type: String;
				mobileNumber: String;
				_id: String;
				permissions: String[];
			} | null;
			authSession: {
				expiresAt: String;
				fresh: Boolean;
				id: String;
				user: String;
			} | null;
		}
		interface PageData {
			branches: Branch[];
			flash?: { type: ToastMSGs; message: string };
			authUser: {
				name: String;
				lastLoginAt: Date;
				email: String;
				isActive: Boolean;
				type: String;
				mobileNumber: String;
				_id: String;
				permissions: String[];
			} | null;
			authSession: {
				expiresAt: String;
				fresh: Boolean;
				id: String;
				user: String;
			} | null;
		}

		// interface PageState {}
		// interface Platform {}
	}
}

export {};
