import {TestBed} from '@angular/core/testing';

import {CryptService} from './crypt.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppService} from '../app.service';

describe('CryptService', () => {
	let service: CryptService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ AppService]
		});
		service = TestBed.inject(CryptService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('createSalt(\'string\')', () => {
		expect(service.createSalt('string')).toBe('z7ring');
	});

	it('createSalt(\'Snider\')', () => {
		expect(service.createSalt('Snider')).toBe('znid3r');
	});

	it('createSalt(\'snider\')', () => {
		expect(service.createSalt('snider')).toBe('znid3r');
	});

	it('long string', () => {
		expect(
			service.createSalt(
				'a long string with spaces and workds and much letters and stuff'
			)
		).toBe(
			'4 10ng z7ring wi7h zp4c3z 4nd workdz 4nd much 13773rz 4nd z7uff'
		);
	});


	it('Empty String', () => {
		expect(service.createSalt('')).toBe("");
	});
});
