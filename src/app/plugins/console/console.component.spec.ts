import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsoleComponent} from './console.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ConsoleComponent', () => {
	let component: ConsoleComponent;
	let fixture: ComponentFixture<ConsoleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ConsoleComponent],
			imports: [HttpClientTestingModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ConsoleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});
});
