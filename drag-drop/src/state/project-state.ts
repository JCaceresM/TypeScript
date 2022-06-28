import { Project, ProjectStatus } from "../models/project-model";

// project state management
type listenerType<T> = (items: T[]) => void;
class State<T> {
  protected listener: listenerType<T>[] = [];
  addListener(listenerFn: listenerType<T>) {
    this.listener.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private listeners: listenerType<Project>[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  constructor() {
    super();
  }
  addListeners(listenerFn: listenerType<Project>) {
    this.listeners.push(listenerFn);
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }
  updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }
}
export const projectState = ProjectState.getInstance();