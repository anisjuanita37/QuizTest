import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizLevelPage } from './quiz-level.page';

describe('QuizLevelPage', () => {
  let component: QuizLevelPage;
  let fixture: ComponentFixture<QuizLevelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLevelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizLevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
