import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SonarReport, SonarIssue, SonarIssueSeverity } from '../../sonar/sonar-dto';
import { PreferencesService } from 'src/app/preferences.service';
import { LayoutHelperService, AlertLevels } from 'src/app/layout-helper.service';
import { SonarIssuesService } from 'src/app/sonar/sonar-issues.service';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
    // File inputs
    @ViewChild('inputSonarReportFileInput') inputSonarReportFileInput: ElementRef;
    @ViewChild('inputSonarReportFileName') inputSonarReportFileName: ElementRef;
    sonarReportFile = '';
    fakepathPattern = /C:\\fakepath\\/i;

    // Preferences
    gitLabAccessToken: string;
    filterNewIssues = true;
    filterSeverities: [{
        severity: SonarIssueSeverity,
        checked: boolean
    }];

    // Content
    sonarReport: SonarReport;
    issuesList: SonarIssue[];
    issuesListCount = {};

    public sonarIssues: SonarIssuesService;

    constructor(
        private preferences: PreferencesService,
        private layoutHelper: LayoutHelperService,
        public sonarIssuesInj: SonarIssuesService,
    ) {
        this.sonarIssues = sonarIssuesInj;
    }

    ngOnInit() {
        this.gitLabAccessToken = this.preferences.getPreference('gitlab-access-token');
        const filterNewIssues = this.preferences.getPreference('filter-new-issues');
        if (filterNewIssues !== undefined) {
            this.filterNewIssues = filterNewIssues;
        }

        this.filterSeverities = this.preferences.getPreference('filter-issue-severities');
        if (!this.filterSeverities || !this.filterSeverities.length) {
            // @ts-ignore
            this.filterSeverities = [];
            Object.keys(SonarIssueSeverity).forEach(s => {
                this.filterSeverities.push({
                    severity: SonarIssueSeverity[s],
                    checked: true,
                });
            });
        }
    }

    ngAfterViewChecked() {
        // finished loading events
        this.layoutHelper.enableBootstrapComponents();
    }

    savePreferences() {
        this.preferences.setPreference('gitlab-access-token', this.gitLabAccessToken);
        this.preferences.setPreference('filter-new-issues', this.filterNewIssues);
        this.preferences.setPreference('filter-issue-severities', this.filterSeverities);
    }

    inputSelectFile() {
        (this.inputSonarReportFileInput.nativeElement as HTMLElement).click();
    }
    inputFileSelected(event) {
        const reader = new FileReader();
        reader.onload = () => {
            this.loadJsonReport(reader.result as string);
        };
        if (event.target.files.length) {
            reader.readAsText(event.target.files[0]);
        } else {
            this.clearReport();
        }
    }

    filterNewIssuesChanged() {
        this.savePreferences();
        this.loadSonarIssues();
    }
    filterSeveritiesChanged() {
        this.savePreferences();
        this.loadSonarIssues();
        console.log(this.filterSeverities);
    }

    loadJsonReport(json?: string) {
        if (json) {
            this.sonarReport = JSON.parse(json);
            this.loadReport();
        } else {
            this.clearReport();
        }
    }
    loadReport() {
        console.log(this.sonarReport);
        this.loadSonarIssues();
    }
    clearReport() {
        this.sonarReport = undefined;
    }
    private loadSonarIssues() {
        if (this.sonarReport && this.sonarReport.issues) {
            this.issuesList = this.sonarReport.issues;
        } else {
            this.issuesList = [];
        }
        if (this.issuesList) {
            this.issuesList = this.issuesList.filter(x => x.status === 'OPEN');
            if (this.filterNewIssues) {
                this.issuesList = this.issuesList.filter(x => x.isNew);
            }
        }
        if (this.filterSeverities) {
            const nonSeverities = [];
            this.filterSeverities.forEach(x => {
                if (!x.checked) {
                    nonSeverities.push(x.severity);
                }
            });
            if (nonSeverities.length) {
                this.issuesList = this.issuesList.filter(x => nonSeverities.indexOf(x.severity) === -1);
            }
        }

        Object.keys(SonarIssueSeverity).forEach(s => {
            const colorClassName = this.sonarIssues.getSeverityColorClassName(SonarIssueSeverity[s]);
            this.issuesListCount[colorClassName] += this.issuesList.filter(x => x.severity === SonarIssueSeverity[s]).length;
        });
    }
}
