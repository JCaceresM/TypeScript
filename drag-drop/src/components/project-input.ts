import { Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { validate, ValidateOptions } from "../util/validations";
import { Component } from "./base-component";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
  
    constructor() {
      super("project-input", "app", true, `user-input`);
  
      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
      this.configure();
    }
  
    private gatherUserInput(): [string, string, string] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredTDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;
      const validations: ValidateOptions[] = [
        {
          value: enteredTitle,
          required: true,
          minLength: 5,
          maxLength: 25,
        },
        {
          value: enteredTDescription,
          required: true,
          minLength: 5,
          maxLength: 255,
        },
        {
          value: +enteredPeople,
          required: true,
          min: 1,
          max: 25,
        },
      ];
      if (validate(validations)) {
        return [enteredTitle, enteredTDescription, enteredPeople];
      } else {
        alert("complete the form");
        return;
      }
    }
  
    private clearInput() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }
  
    @Autobind
    private submitHandle(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, +people);
        this.clearInput();
      }
    }
    renderContent(): void {}
    configure() {
      this.element.addEventListener("submit", this.submitHandle);
    }
  }