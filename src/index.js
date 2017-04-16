
import fs from 'fs';

import {move} from './utils';

const defaultConfig = {
	order: [
		'name',
		'version',
		'description',
		'main',
		'bin',
		'scripts',
		'dependencies',
		'devDependencies',
		'...'
	]
};

export const schema = {
    // Schema for config options in .repoir.json
    // Json schema?
};

export function test (config) {
	return new Promise((resolve, reject) => {
		const pkg = require(`${process.cwd()}/package.json`);
		const pkgKeys = Object.keys(pkg);
		const sortedKeys = sort(pkgKeys);
		if (isSameOrder(pkgKeys, sortedKeys)) {
			return resolve([]);
		}
		return resolve([ { message: 'package.json not properly ordered' } ]);
	});
}

export function fix (config) {
	return new Promise((resolve, reject) => {
		const pkg = require(`${process.cwd()}/package.json`);
		const pkgKeys = Object.keys(pkg);
		const sortedKeys = sort(pkgKeys);
		if (isSameOrder(pkgKeys, sortedKeys)) { // If already matching, let it be
			return resolve({ fixed: false });
		}
		const sortedPkg = sortObjectByKeyNameList(pkg, sortedKeys);
		fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(sortedPkg, null, '\t'), 'utf8');
		return resolve({ fixed: true });
	});
}

function sort (pkgKeys) {
	const sortedKeys = JSON.parse(JSON.stringify(pkgKeys)).sort();
	defaultConfig.order.reverse().forEach(overrideSortKey => {
		if (overrideSortKey === '...') return;
		move(sortedKeys, sortedKeys.indexOf(overrideSortKey), 0);
	});
	return sortedKeys;
}

function sortObjectByKeyNameList (object, sortWith) {
	let keys;
	let sortFn;

	if (typeof sortWith === 'function') {
		sortFn = sortWith;
	} else {
		keys = sortWith;
	}
	return (keys || []).concat(Object.keys(object).sort(sortFn)).reduce((total, key) => {
		total[key] = object[key];
		return total;
	}, Object.create(null));
}

function isSameOrder (array1, array2) {
	return array1.length === array2.length && array1.every((v, i) => v === array2[i]);
}
