import { Component, OnInit, Input } from '@angular/core';
import { SonarIssueSeverity } from 'src/app/sonar/sonar-dto';
import { SonarIssuesService } from 'src/app/sonar/sonar-issues.service';

@Component({
    selector: 'sonar-issue-severity',
    template: `<span class="badge badge-{{getClassName()}}">{{getText()}}</span>`
})
export class SonarIssueSeverityComponent implements OnInit {

    @Input() severity: SonarIssueSeverity;

    constructor(
        private issuesService: SonarIssuesService
    ) { }

    ngOnInit() {
    }

    getClassName() {
        return this.issuesService.getSeverityColorClassName(this.severity);
    }

    getText() {
        return this.issuesService.getSeverityText(this.severity);
    }

}
