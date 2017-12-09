import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatDialogModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InlineEditModule } from '@savantly/ngx-inline-edit';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    FlexLayoutModule,
    InlineEditModule
  ],
  providers: []
})
export class MaterialModule { }
