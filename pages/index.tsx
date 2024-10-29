import AddTaskForm from "@/components/AddTaskForm";
import { GetTaskTester } from "@/components/GetTaskTester";
import { GetTasksTester } from "@/components/GetTasksTester";
import SignInTester from "@/components/SignInTester";
import SignUpTester from "@/components/SignUpTester";
import UpdateTaskTester from "@/components/UpdateTaskTester";
import UpdateUserTester from "@/components/UpdateUser";
import { GetUserTester } from "@/components/getUserTester";
import { GetUsersTester } from "@/components/getUsersTester";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTester, setCurrentTester] = useState<string>("sign-in");

  const renderTester = () => {
    switch (currentTester) {
      case "sign-in":
        return <SignInTester />;
      case "sign-up":
        return <SignUpTester />;
      // Add other testers here
      case "update-user":
        return <UpdateUserTester />;
      case "get-users":
        return <GetUsersTester />;
      case "get-user":
        return <GetUserTester />;
      case "add-task":
        return <AddTaskForm />;
      case "get-tasks":
        return <GetTasksTester />;
      case "update-tasks":
        return <UpdateTaskTester />;
      case "get-task":
        return <GetTaskTester />;
      default:
        return <SignInTester />;
    }
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Tester Selection</h1>
      <select
        value={currentTester}
        onChange={(e) => setCurrentTester(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md max-w-md mx-auto"
      >
        <option value="sign-in">Sign In Tester</option>
        <option value="sign-up">Sign Up Tester</option>
        <option value="update-user">Update User Tester</option>
        <option value="get-user">Get User Tester</option>
        <option value="get-users">Get Users Tester</option>
        <option value="add-task">Add Task Form</option>
        <option value="get-tasks">Get Tasks Tester</option>
        <option value="update-tasks">Update Tasks Tester</option>
        <option value="get-task">Get Task Tester</option>
        {/* Add options for other testers here */}
      </select>
      <div className="mt-4">{renderTester()}</div>
    </div>
  );
}
