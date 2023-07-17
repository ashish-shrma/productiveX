// Define the task object with relevant properties

import { TaskFormValues } from "@/app/addTask/page";
import { Duration } from "@/components/form/CustomForm";

  
  // Function to get the current date and time
  function getCurrentDateTime(): Date {
    return new Date();
  }
  
  // Function to calculate the time remaining until a deadline
  function getTimeRemaining(deadline: Date): number {
    const currentTime = getCurrentDateTime();
    const timeDiff = deadline.getTime() - currentTime.getTime();
    return Math.max(0, timeDiff); // Return 0 if the deadline has already passed
  }
  
  // Function to filter tasks based on time availability
  function filterTasksByTime(tasks: TaskFormValues[], currentTime: Date): TaskFormValues[] {
    return tasks.filter((task) => {
      return task.time.includes(getTimeOfDay(currentTime)) && task.selectedDays.includes(getDayOfWeek(currentTime));
    });
  }
  
  // Function to get the current time of day (Morning, Afternoon, Evening, Night)
  function getTimeOfDay(currentTime: Date): string {
    const currentHour = currentTime.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return '1';
    } else if (currentHour >= 12 && currentHour < 17) {
      return '2';
    } else if (currentHour >= 17 && currentHour < 21) {
      return '3';
    } else {
      return '4';
    }
  }
  
  function getRecentlyCompletedTasks(): number[] {
    // const recentlyCompletedTasks = localStorage.getItem('recentlyCompletedTasks');
    // const recentlyCompletedTasks = false;
    // if (recentlyCompletedTasks) {
    //   return JSON.parse(recentlyCompletedTasks);
    // }
    return [];
  }
  
  // Function to get the day of the week (Sun, Mon, Tue, etc.)
  function getDayOfWeek(currentTime: Date): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = currentTime.getDay();
    return daysOfWeek[dayIndex];
  }

  function getDurationInMinutes(duration: Duration): number {
    return duration.hours * 60 + duration.minutes;
  }
  
  function parseDeadline(deadline: string): Date {
    return new Date(deadline);
  }

 export function recommendNextTask(tasks: TaskFormValues[], numChoices: number): TaskFormValues[]  {
  if (tasks.length === 0) {
    return []; // Return null if there are no tasks available
  }
  const currentTime = getCurrentDateTime();
  const filteredTasks = filterTasksByTime(tasks, currentTime);

  // Exclude recently completed tasks from the filtered tasks
  const recentlyCompletedTaskIds = getRecentlyCompletedTasks();
  const filteredTasksWithoutRecentlyCompleted = filteredTasks.filter(
    (task) => !recentlyCompletedTaskIds.includes(task.id)
  );

  // Sort tasks by priority (High to Low), deadline (Earliest to Latest), and duration (Shortest to Longest)
  const sortedTasks = filteredTasksWithoutRecentlyCompleted.sort((a, b) => {
    const aDeadline = parseDeadline(a.deadline);
    const bDeadline = parseDeadline(b.deadline);

    if (a.priority === b.priority) {
      if (aDeadline.getTime() === bDeadline.getTime()) {
        return getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
      }
      return aDeadline.getTime() - bDeadline.getTime();
    }
    return Number(b.priority) - Number(a.priority);
  });

  // Check if there are tasks with the same highest priority
  const highestPriorityTasks = sortedTasks.filter((task) => task.priority === sortedTasks[0].priority);

  // If there are multiple highest priority tasks, choose the one with the earliest deadline and shortest duration
  if (highestPriorityTasks.length > 1) {
    const filteredTasks = highestPriorityTasks.sort((a, b) => {
      const aDeadline = parseDeadline(a.deadline);
      const bDeadline = parseDeadline(b.deadline);

      if (aDeadline.getTime() === bDeadline.getTime()) {
        return getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
      }
      return aDeadline.getTime() - bDeadline.getTime();
    });

    // Get the top N choices (tasks) based on numChoices
    const topChoices = filteredTasks.slice(0, numChoices);

    return topChoices;
  }
  const topChoices = sortedTasks.slice(0, numChoices);

  return topChoices;
}
  