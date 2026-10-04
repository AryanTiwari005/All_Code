import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashBoard = () => {
  return (
    <div className="p-4 sm:p-6 md:p-10 bg-[#1C1C1C] min-h-screen">
      <Header />
      <TaskListNumbers />
      <TaskList />
    </div>
  )
}

export default EmployeeDashBoard