
import {move} from './utils';

describe('utils', () => {

	describe('move', () => {

		it('should move an item in an array to another spot in the array', () => {
			const temp = [
				'first',
				'second',
				'third'
			];
			move(temp, 2, 1);
			expect(temp).toEqual(['first','third','second']);
		});
	
	});

	

});