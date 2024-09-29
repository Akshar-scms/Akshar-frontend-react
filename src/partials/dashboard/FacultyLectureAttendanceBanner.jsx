import React from 'react';
import { useSelector } from 'react-redux';
import { endLecture } from '../../apis/teacher/conductingLecture';
import { useNavigate } from 'react-router-dom';

function FacultyLectureAttendanceBanner() {
  const { username, role, id } = useSelector((store) => store.userDetailStore);

  const navigate = useNavigate();

  const handleOnEndLecture = async () => {
    const id = localStorage.getItem('lectureId');

    const response = await endLecture({ teacherId: id, id });
    if (response.status) {
      localStorage.removeItem('lectureId');
      navigate('/faculty/conduct-lecture');
    }
  };

  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Background illustration */}
      <div
        className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
        aria-hidden="true"
      >
        <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
            <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
            <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
              <stop stopColor="#A5B4FC" offset="0%" />
              <stop stopColor="#818CF8" offset="100%" />
            </linearGradient>
            <linearGradient
              x1="50%"
              y1="24.537%"
              x2="50%"
              y2="100%"
              id="welcome-c"
            >
              <stop stopColor="#4338CA" offset="0%" />
              <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="rotate(64 36.592 105.604)">
              <mask id="welcome-d" fill="#fff">
                <use xlinkHref="#welcome-a" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
              <path
                fill="url(#welcome-c)"
                mask="url(#welcome-d)"
                d="M64-24h80v152H64z"
              />
            </g>
            <g transform="rotate(-51 91.324 -105.372)">
              <mask id="welcome-f" fill="#fff">
                <use xlinkHref="#welcome-e" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
              <path
                fill="url(#welcome-c)"
                mask="url(#welcome-f)"
                d="M40.333-15.147h50v95h-50z"
              />
            </g>
            <g transform="rotate(44 61.546 392.623)">
              <mask id="welcome-h" fill="#fff">
                <use xlinkHref="#welcome-g" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
              <path
                fill="url(#welcome-c)"
                mask="url(#welcome-h)"
                d="M40.333-15.147h50v95h-50z"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="text-2xl md:text-2xl text-slate-800 font-bold mb-1">
            Batch:
          </h1>
          <h1
            className="text-2xl md:text-2xl text-slate-800 font-bold mb-1"
            style={{ marginRight: '700px' }}
          >
            Subject:
          </h1>
        </div>
        <h1 className="text-2xl md:text-2xl text-slate-800 font-bold mb-1">
          Room:
        </h1>
        <h1 className="text-2xl md:text-2xl text-slate-800 font-bold mb-1">
          Course:
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          style={{ position: 'absolute', right: '620px', top: '60px' }}
          onClick={() => {
            navigate('/Faculty/whiteboard');
          }}
        >
          Start Whiteboard
        </button>
        <button
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          style={{ position: 'absolute', right: '823px', top: '60px' }}
          onClick={() => {
            handleOnEndLecture();
          }}
        >
          End Lecture
        </button>
      </div>
    </div>
  );
}

export default FacultyLectureAttendanceBanner;
