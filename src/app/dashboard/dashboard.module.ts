import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { AssystEventDatePipe } from './assyst-event-date.pipe';
import { PersonNamePipe } from './person-name.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { Nl2BrPipe } from './nl2br.pipe';
import { SonarIssueMessagePipe, SonarIssueFileNamePipe, SonarIssueCreationDatePipe } from '../sonar/sonar-pipes.pipe';
import { SonarIssueSeverityComponent } from './parts/sonar-issue-severity/sonar-issue-severity.component';

@NgModule({
    declarations: [
        HomeComponent,
        DashboardComponent,
        AssystEventDatePipe,
        PersonNamePipe,
        SafeHtmlPipe,
        Nl2BrPipe,
        SonarIssueMessagePipe,
        SonarIssueFileNamePipe,
        SonarIssueCreationDatePipe,
        SonarIssueSeverityComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
