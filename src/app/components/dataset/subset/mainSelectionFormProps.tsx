import { ISelectionFormProps } from "../../common/form/SelectionForm";

export const mainSelectionFormProps: ISelectionFormProps[] = [
  {
    label: "Cohort",
    name: "cohort",
    defaultValue: "Select a Cohort",
    options: [],
    disabled: false
    
  },
  {
    label: "Level",
    name: "level",
    defaultValue: "Select a Level",
    options: [],
    disabled: true
  },
  {
    label: "School",
    name: "school",
    defaultValue: "Select a School",
    options: [],
    disabled: true
  },
  {
    label: "Quality",
    name: "quality",
    defaultValue: "Select a Quality",
    options: [],
    disabled: true
  },
  {
    label: "Date",
    name: "date",
    defaultValue: "Select a date",
    options: [],
    disabled: true
  },
  {
    label: "Facilitator",
    name: "facilitator",
    defaultValue: "Select a Facilitator",
    options: [],
    disabled: true
  },
  {
    label: "Group",
    name: "group",
    defaultValue: "Select a Group",
    options: [],
    disabled: true
  }
  
]
