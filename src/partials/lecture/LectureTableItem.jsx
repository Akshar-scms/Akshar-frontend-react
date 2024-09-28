import React, { useState, useEffect } from 'react';
import Upload from '../../../public/svgs/upload.svg';
import Download from '../../../public/svgs/download.svg';

function LectureTableItem(props) {
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    props.onStatusChange(props.id, newStatus);
  };

  const statusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-emerald-100 text-emerald-600';
      case 'Completed':
        return 'bg-rose-100 text-rose-500';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };
  console.log(props);

  return (
    <tr>
      <td className="px-3 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center"></div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={'font-medium text-sky-500'}>{props.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={'font-medium text-black-500'}>{props.date}</div>
      </td>
      <td className="px-1 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`font-medium text-slate-800`}>{props.teacher}</div>
      </td>
      <td>
        <div className={`font-medium text-left text-slate-800`}>
          {props.time}
        </div>
      </td>
      <td>
        <div
          className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
            props.status
          )}`}
        >
          {props.status}
        </div>
      </td>
      <td>
        <div className={`font-medium text-center text-slate-800`}>
          {props.homework ? (
            <img
              src={Upload}
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
              alt="Upload"
            />
          ) : (
            '---'
          )}
        </div>
      </td>
      <td>
        <div className={`font-medium text-center text-slate-800`}>
          {props.notes ? (
            <img
              src={Download}
              className="opacity-60 hover:opacity-100 transition-opacity duration-200 "
              alt="Download"
            />
          ) : (
            '---'
          )}
        </div>
      </td>
      <td>
        <div
          className={`font-medium text-center text-white bg-green-500 hover:bg-emerald-700 px-1 py-1 rounded-md w-40`}
        >
          <button>Mark Attendance</button>
        </div>
      </td>
    </tr>
  );
}

export default LectureTableItem;
