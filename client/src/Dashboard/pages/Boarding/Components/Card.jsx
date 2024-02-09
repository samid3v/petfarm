import React from 'react'

const Card = ({variant, icon, title, value, onClick, active=false}) => {
     const getColorClasses = () => {
          switch (variant) {
            case 'In Progress':
              return `bg-blue-200 text-blue-800 ${active? 'border border-blue-800':'border-none'} `;
            case 'Booked':
              return `bg-green-200 text-green-800 ${active? 'border border-green-800':'border-none'} `;
            case 'Completed':
              return `bg-yellow-200 text-yellow-800 ${active? 'border border-yellow-800':'border-none'}`;
            case 'Canceled':
              return `bg-red-200 text-red-800 ${active? 'border border-red-800':'border-none'}`;
            default:
              return `bg-gray-200 text-gray-800 ${active? 'border border-gray-800':'border-none'}`;
          }
        };
  return (
     <div onClick={onClick} className={`p-6 cursor-pointer rounded-xl shadow-md ${getColorClasses()}`}>
      <div className="flex items-center w-[160px] h-16">
        <div className=" mr-4 text-3xl">{icon}</div>
        <div>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
