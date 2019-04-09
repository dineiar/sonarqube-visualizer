import { Pipe, PipeTransform } from '@angular/core';
import { SonarIssuesService } from './sonar-issues.service';
import { SonarIssue } from './sonar-dto';

@Pipe({name: 'issueMessage'})
export class SonarIssueMessagePipe implements PipeTransform {
    transform(issue: SonarIssue, args?: any): string {
        return issue.message ? issue.message.replace(/br\.jus\.csjt\.pje\./g, '') : issue.message;
    }
}

@Pipe({name: 'issueFileName'})
export class SonarIssueFileNamePipe implements PipeTransform {
    transform(issue: SonarIssue, args?: any): string {
        return issue.component ? issue.component.split(':')[2].replace(/src\/main\/java\/br\/jus\/csjt\/pje\//g, '') : issue.component;
    }
}

@Pipe({name: 'issueCreationDate'})
export class SonarIssueCreationDatePipe implements PipeTransform {
    transform(issue: SonarIssue, args?: any): string {
        return issue.creationDate ? new Date(issue.creationDate).toLocaleString() : '';
    }
}
