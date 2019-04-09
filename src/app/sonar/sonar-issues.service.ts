import { Injectable } from '@angular/core';
import { SonarIssueSeverity, SonarIssue } from './sonar-dto';

@Injectable({
    providedIn: 'root'
})
export class SonarIssuesService {

    constructor() { }

    getSeverities() {
        return Object.values(SonarIssueSeverity);
    }

    public getSeverityText(severity: SonarIssueSeverity) {
        const svrStr = severity as string;
        return svrStr ? svrStr.charAt(0).toUpperCase() + svrStr.slice(1).toLowerCase() : svrStr;
    }

    public getSeverityColorClassName(severity: SonarIssueSeverity) {
        switch (severity) {
            case SonarIssueSeverity.Blocker:
            case SonarIssueSeverity.Critical:
                return 'danger';
            case SonarIssueSeverity.Major:
                return 'warning';
            case SonarIssueSeverity.Minor:
            default:
                return 'secondary';
        }
    }

    public formatFileName(issue: SonarIssue) {
        return issue.component.split(':')[2].replace(/src\/main\/java\/br\/jus\/csjt\/pje\//g, '');
    }
    public formatMessage(issue: SonarIssue) {
        return issue.message ? issue.message.replace(/br\.jus\.csjt\.pje\./g, '') : issue.message;
    }
    public formatDate(issue: SonarIssue) {
        return issue.creationDate ? new Date(issue.creationDate).toLocaleString() : '';
    }
}
