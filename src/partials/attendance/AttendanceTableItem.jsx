import React, { useState, useEffect } from "react";
import present from "../../../public/svgs/present.svg";
import absent from "../../../public/svgs/absent.svg";

function AttendanceTableItem(props) {
  const [status, setStatus] = useState(props.status);
  // Sync status state when props.status changes
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  // Handle status change for present/absent
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    props.onStatusChange(props.attendanceId, newStatus); // Inform parent component of the change
  };

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">#{props.enrollmentNo}</div>
      </td>
      <td className="px-1 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className={`font-medium text-slate-800`}>{props.name}</div>
      </td>
      <td>
        {status ? (
          <div className="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600">
            Present
          </div>
        ) : (
          <div className="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-amber-100 text-amber-600">
            Absent
          </div>
        )}
      </td>
      <td className="px-3 first:pl-5 last:pr-7 py-3 whitespace-nowrap w-px text-center">
        <div className="space-x-1">
          <div className="flex flex-row items-center -m-3">
            <div className="m-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name={`attendance-${props.id}`}
                  checked={status} // status is a boolean, true means present
                  onChange={() => handleStatusChange(!status)} // Toggle between present/absent
                  className="form-checkbox"
                />
                <span className="text-sm ml-2">Present</span>
              </label>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default AttendanceTableItem;
