import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayService } from '../play.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlsComponent],
      imports: [BrowserAnimationsModule],
      providers: [PlayService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
