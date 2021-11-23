import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SettingsComponent} from './settings.component.ts';

import {RouterTestingModule} from '@angular/router/testing';

describe('DetailComponent', () => {
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [SettingsComponent],
				imports: [RouterTestingModule]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it(
		'should render title in a h1 tag',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('h1').textContent).toContain(
				'PAGES.DETAIL.TITLE'
			);
		})
	);
});
