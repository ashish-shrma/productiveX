"use client"
import { useFormik } from "formik";
import {
  Input,
  Checkbox,
  Dropdown,
  MultiSelectDropdown,
  DatePicker,
  DurationPicker,
  DaysOfWeek,
  Duration,
} from "@/components/form/CustomForm";
import * as Yup from 'yup';
import addData from "@/firebase/firestore/addData";


const validationSchema = Yup.object().shape({
  taskName: Yup.string().required('Task Name is required'),
  priority: Yup.string().required('Priority is required'),
  time: Yup.array().required('Time is required').min(1, 'Please select at least one time option'),
  deadline: Yup.string().required('Deadline is required'),
  duration: Yup.object().shape({
    hours: Yup.number().required('Hours are required').min(0, 'Hours cannot be negative'),
    minutes: Yup.number().required('Minutes are required').min(0).max(59, 'Minutes must be between 0 and 59'),
  }),
  selectedDays: Yup.array().required('Selected Days are required').min(1, 'Please select at least one day'),
});

const options = [
  { value: "3", label: "High" },
  { value: "2", label: "Medium" },
  { value: "1", label: "Low" },
];

const timeOptions = [
  { value: "4", label: "Night" },
  { value: "3", label: "Evening" },
  { value: "2", label: "Afternoon" },
  { value: "1", label: "Morning" },
];

export interface TaskFormValues {
  id: number;
  taskName: string;
  screened: boolean;
  solitary: boolean;
  priority: string;
  time: string[];
  deadline: string;
  duration: Duration;
  selectedDays: string[];
}

function AddTask() {
  const initialValues: TaskFormValues = {
    id: Math.floor(Math.random() * 100),
    taskName: "",
    screened: false,
    solitary: false,
    priority: "",
    time: [],
    deadline: "",
    duration: {hours: 0, minutes: 0},
    selectedDays: [],
  };
  const  handleFormSubmit = async (values: TaskFormValues) => {
    // Handle form submission logic here
    console.log(values)
   const{ result, error } = await addData('tasks', values.taskName, values)
    if (error) {
      console.error('error: ', error);
    }
    console.log(result);
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: handleFormSubmit
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = formik;

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Task Name"
              name="taskName"
              value={values.taskName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.taskName && errors.taskName}
            />
          </div>

          <div className="flex items-start space-x-4 mb-4">
            <Checkbox
              label="Screened"
              name="screened"
              checked={values.screened}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Checkbox
              label="Solitary"
              name="solitary"
              checked={values.solitary}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="mb-4">
            <Dropdown
              label="Priority"
              name="priority"
              options={options}
              value={values.priority}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.priority && errors.priority}
            />
          </div>

          <div className="mb-4">
            <MultiSelectDropdown
              label="Time"
              name="time"
              options={timeOptions}
              value={values.time}
              onChange={(selectedOptions: string[]) => formik.setFieldValue("time", selectedOptions)}          
               onBlur={handleBlur}
              error={touched.time && errors.time}
            />
          </div>

          <div className="mb-4">
            <DatePicker
              label="Deadline"
              name="deadline"
              value={values.deadline}
              onChange={(selectedDate: string) => formik.setFieldValue("deadline", selectedDate)}
              onBlur={handleBlur}
              error={touched.deadline && errors.deadline}
            />
          </div>

          <div className="mb-4">
          <DurationPicker
    label="Duration"
    name="duration"
    value={values.duration}
    onChange={(duration) => setFieldValue("duration", duration)}
    onBlur={handleBlur}
    error={touched.duration && errors.duration}
  />
          </div>

          <div className="mb-4">
            <DaysOfWeek
              label="Selected Days"
              name="selectedDays"
              value={values.selectedDays}
              onChange={(selectedDays)=> setFieldValue("selectedDays", selectedDays)}
              onBlur={handleBlur}
              error={touched.selectedDays && errors.selectedDays}
            />
          </div>

          <button
            name="submit"
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;


