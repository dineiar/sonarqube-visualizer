export enum SonarIssueSeverity {
    Blocker = 'BLOCKER',
    Critical = 'CRITICAL',
    Major = 'MAJOR',
    Minor = 'MINOR',
}

export class SonarIssue {
    public key: string;
    public component: string;
    public line: number;
    public startLine: number;
    public endLine: number;
    public message: string;
    public severity: SonarIssueSeverity;
    public rule: string;
    public status: string;
    public isNew: boolean;
    public creationDate: string;
}

export class SonarReport {
    public version: string;
    public issues: SonarIssue[];
    public components: [];
    public rules: [];
    public users: [];
}
