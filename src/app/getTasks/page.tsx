import { getCollection } from "@/firebase/firestore/getData";
import { recommendNextTask } from "@/helpers/recommendation";
import { TaskFormValues } from "../addTask/page";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  SunIcon,
  MoonIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

import clsx from "clsx"; // Import the clsx library

function getTimeIcon(time: string): JSX.Element {
  const num = parseInt(time); // Convert the time string to a number
  switch (num) {
    case 1:
      return <SunIcon className="h-6 w-6 fill-current text-yellow-200" />; // Return an icon for morning
    case 2:
      return <SunIcon className="h-6 w-6 fill-current text-yellow-500" />; // Return an icon for afternoon
    case 3:
      return <MoonIcon className="h-6 w-6 fill-current text-blue-600" />; // Return an icon for evening
    case 4:
      return <MoonIcon className="h-6 w-6 fill-current text-gray-800" />; // Return an icon for night
    default:
      return <span>?</span>; // Return a default symbol for unknown values
  }
}

function getPriorityIcon(priority: string): JSX.Element {
  const num = parseInt(priority); // Convert the time string to a number

  switch (num) {
    case 1:
      return (
        <ExclamationTriangleIcon className="h-6 w-6 fill-current text-green-500" />
      ); // Return a small green icon for low priority
    case 2:
      return (
        <ExclamationTriangleIcon className="h-6 w-6 fill-current text-yellow-500" />
      ); // Return a medium yellow icon for medium priority
    case 3:
      return (
        <ExclamationTriangleIcon className="h-6 w-6 fill-current text-red-500" />
      ); // Return a large red icon for high priority
    default:
      return <span>none</span>; // Return a default symbol for unknown values
  }
}

// Function to get the abbreviated day of the week (Sun, Mon, Tue, etc.)
function getAbbreviatedDay(day: string): string {
  return day.substring(0, 1);
}

export default async function getTasks() {
  const { result, error } = await getCollection<TaskFormValues>("tasks");
  const data = result;

  //   if (error) return <div>Error: {error?.message}</div>;
  if (!data) return <div>Loading...</div>;

  const recommendedTasks = recommendNextTask(data as TaskFormValues[], 2);

  return (
    <div>
      {recommendedTasks.length > 0 && (
        <div className="task-card recommend-card mb-4 bg-gray-200 peer">
          <h2 className="text-xl font-semibold mb-2">Recommended Tasks:</h2>
          <ul className="list-disc ml-8">
            {recommendedTasks.map((task, index) => (
              <li key={index}>{task.taskName}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <div
            key={index}
            // className={`task-card row-span-${index + 1} bg-white peer`} // Use the custom task-card class
            className={`task-card bg-white peer`} // Use the custom task-card class
          >
            <button
              className={clsx(
                "p-2 rounded-md absolute top-4 right-4",
                item.screened ? "bg-green-500" : "bg-blue-500", // Use clsx to conditionally apply classes
                "text-white"
              )}
              //   onClick={() => handleEditTask(item)} // Replace this with your edit task function
            >
              <PencilSquareIcon className="h-6 w-6" />
            </button>
            <div>
              <h3 className="text-lg font-semibold mb-2">{item.taskName}</h3>
              <div className="flex items-center text-gray-500 mb-1">
                <p className="mr-4">
                  Priority: 
                </p>
                {getPriorityIcon(item.priority)}
              </div>
              <p className="text-gray-500 mb-1">
                Screened: {item.screened ? "Yes" : "No"}
              </p>
              <p className="text-gray-500 mb-1">
                Solitary: {item.solitary ? "Yes" : "No"}
              </p>
              <p className="text-gray-500 mb-1">Deadline: {item.deadline}</p>
              <p className="text-gray-500 mb-1">
                Duration:{" "}
                {item.duration.hours !== 0 && `${item.duration.hours} hours `}
                {item.duration.minutes} minutes
              </p>
              <div className="flex items-center text-gray-500 mb-1">
                <p className="mr-2">Time:</p>
                {item.time.map((t) => (
                  <div key={t} className="mr-2">
                    {getTimeIcon(t)}
                  </div>
                ))}
              </div>
              <div className="flex mt-1 text-gray-500">
                <p className="text-gray-500 mr-2">Days: </p>
                {item.selectedDays.map((day: string, idx: number) => (
                  <div
                    key={idx}
                    className={clsx(
                      "w-6 h-6 flex items-center justify-center rounded-md border border-gray-300 mr-2",
                      item.screened ? "bg-green-500" : "bg-blue-500", // Use clsx to conditionally apply classes
                      "text-white"
                    )}
                  >
                    <span className="text-sm">{getAbbreviatedDay(day)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
