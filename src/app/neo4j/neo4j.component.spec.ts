import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Neo4jComponent } from './neo4j.component';

describe('Neo4jComponent', () => {
  let component: Neo4jComponent;
  let fixture: ComponentFixture<Neo4jComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Neo4jComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Neo4jComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
