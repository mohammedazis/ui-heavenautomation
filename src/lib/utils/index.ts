import languages from './languages';
import { navigationData } from './menuDatas';
import { _, locale, setupI18n } from './i18n';
import {
	slugify,
	serializeNonPOJOs,
	ToastMSGs,
	Modules,
	PermissionTypes,
	UserTypes,
	hasPermission
} from './functions';
import districts from './districts.json';

export {
	Modules,
	districts,
	PermissionTypes,
	languages,
	navigationData,
	_,
	locale,
	setupI18n,
	slugify,
	UserTypes,
	serializeNonPOJOs,
	ToastMSGs,
	hasPermission
};
