export enum ProjectStatus {
    active = "active",
    finished = "finished",
  }
  // project type
  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }