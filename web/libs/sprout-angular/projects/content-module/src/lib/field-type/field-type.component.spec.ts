import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { FieldTypeComponent } from './field-type.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { JsonEditorModule } from '@savantly/ngx-jsoneditor';

describe('FieldTypeComponent', () => {
  let component: FieldTypeComponent;
  let fixture: ComponentFixture<FieldTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule,
        CKEditorModule,
        LMarkdownEditorModule,
        JsonEditorModule],
      declarations: [ FieldTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
