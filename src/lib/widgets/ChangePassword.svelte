<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h6 class="mb-4 text-15">Change Password</h6>
<form
	method="POST"
	action="/users?/changePassword"
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<div class="grid grid-cols-1 gap-5 xl:grid-cols-12">
		<div class="xl:col-span-4">
			<label for="oldPassword" class="inline-block mb-2 text-base font-medium">Old Password*</label>
			<div class="relative">
				<input
					type="password"
					class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					id="oldPassword"
					name="oldPassword"
					placeholder="Enter current password"
				/>
				<!-- <button class="absolute top-2 ltr:right-4 rtl:left-4" type="button"
					><i class="align-middle ri-eye-fill text-slate-500 dark:text-zink-200"></i></button
				> -->
			</div>
		</div>
		<div class="xl:col-span-4">
			<label for="newPassword" class="inline-block mb-2 text-base font-medium">New Password*</label>
			<div class="relative">
				<input
					type="password"
					class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					name="newPassword"
					id="newPassword"
					placeholder="Enter new password"
				/>
				<!-- <button class="absolute top-2 ltr:right-4 rtl:left-4" type="button"
					><i class="align-middle ri-eye-fill text-slate-500 dark:text-zink-200"></i></button
				> -->
			</div>
		</div>
		<div class="xl:col-span-4">
			<label for="confirmPassword" class="inline-block mb-2 text-base font-medium"
				>Confirm Password*</label
			>
			<div class="relative">
				<input
					type="password"
					class="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
					name="confirmPassword"
					id="confirmPassword"
					placeholder="Confirm password"
				/>
				<!-- <button class="absolute top-2 ltr:right-4 rtl:left-4" type="button"
					><i class="align-middle ri-eye-fill text-slate-500 dark:text-zink-200"></i></button
				> -->
			</div>
		</div>
		<div class="flex justify-end xl:col-span-12">
			<button
				type="submit"
				class="text-white bg-green-500 border-green-500 btn hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/10"
				>Change Password</button
			>
		</div>
	</div>
</form>
