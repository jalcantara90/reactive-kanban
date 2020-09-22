import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { SidebarService } from './sidebar.service';
import { ContextualMenuModule } from '../shared/contextual-menu/contextual-menu.module';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, ContentComponent],
  imports: [
    CommonModule,
    RouterModule,
    ContextualMenuModule
  ],
  providers: [SidebarService],
  exports: [SidebarComponent, HeaderComponent, ContentComponent]
})
export class CoreModule { }
