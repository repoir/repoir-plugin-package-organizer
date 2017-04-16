
import {test} from './index';
import fs from 'fs';

jest.mock('fs');

const mockPackageJson = {
  "name": "package-json-organizer",
  "version": "0.0.1",
  "description": "A repoir plug-in to keep your package.json organized.",
  "main": "index.js",
  "scripts": {
    "test": "jest --coverage"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/repoir/package-json-organizer.git"
  },
  "keywords": [
    "repoir",
    "package",
    "organize"
  ],
  "author": "wookets",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/repoir/package-json-organizer/issues"
  },
  "homepage": "https://github.com/repoir/package-json-organizer#readme",
  "devDependencies": {
    "babel-cli": "^6.24.0",
    "babel-plugin-transform-async-to-generator": "^6.22.0",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.24.0",
    "jest": "19.0.2"
  }
};


describe('package-json-organizer', () => {

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should notify that we arent following the sort', async () => {
		fs.existsSync.mockReturnValue(true);

		fs.readFileSync.mockReturnValueOnce(JSON.stringify(mockPackageJson));

		const result = await test({});

		expect(result).toHaveLength(1);
	});

});
