import { useTasks } from "@/hooks/useTasks";
import AddTask from "@/components/add-task";
import TaskCard from "@/components/task-card";

const Tasks = () => {
  const [tasks, isLoading] = useTasks();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex items-center justify-center">
      <section className="flex w-[90vw] flex-col justify-center sm:w-[80vw]">
        <article className="flex w-full items-center justify-between pt-8">
          <h1 className="text-3xl font-medium text-blue-500">Tasks</h1>
          <AddTask />
        </article>

        <article className="flex flex-col gap-4 py-8">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </article>
      </section>
    </main>
  );
};

export default Tasks;
