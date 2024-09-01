import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelectTagComponent } from './filter-select-tag.component';

describe('FilterSelectTagComponent', () => {
  let component: FilterSelectTagComponent;
  let fixture: ComponentFixture<FilterSelectTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterSelectTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterSelectTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
