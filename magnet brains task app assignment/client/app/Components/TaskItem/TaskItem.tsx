import { useTasks } from "@/context/taskContext";
import { edit, star, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal' ;

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask, modalMode } = useTasks();
  const [isOpen, setIsOpen] = useState(false)
   const customStyles = {
      overlay: {
         backgroundColor: 'rgba(0, 0, 0, 0.6)'
      },
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)'
      }
   }

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            <button
              className={`${
                task.completed ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              {star}
            </button>
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              {edit}
            </button>
            <button className="text-[#F65314]" onClick={() => setIsOpen(true)}>{trash}</button>
         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <h1>Are you sure you Want to delete this task ?</h1>
            <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-4 rounded-l mr-3"
             onClick={function(event) { deleteTask(task._id) ; setIsOpen(false)}}>YES</button> 
            <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-4 rounded-l"
             onClick={() => setIsOpen(false)}>NO</button>
         </Modal>
          

            {/* <button
              className="text-[#F65314]"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {trash}
            </button> */}

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
