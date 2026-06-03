export type IssueType = "bug" | "feature_request";
export type IssueStatus = "open" | "in_progress" | "resolved";

export interface IIssue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateIssue {
  title: string;
  description: string;
  type: IssueType;
}

export interface IUpdateIssue {
  title?: string;
  description?: string;
  type?: IssueType;
  status?: IssueStatus;
}
