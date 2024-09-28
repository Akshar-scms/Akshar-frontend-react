import React, { useEffect, useState } from "react";
import FacultySidebar from "../../../partials/FacultySidebar";
import Header from "../../../partials/Header";
import AttendanceTable from "../../../partials/attendance/AttendanceTable";
import {
  getAllBatchsForTeacher,
  getAllCoursesForTeacher,
  getAllSubjectForTeacher,
  getClassRoomsForTeachers,
  getSectionForTeacher,
} from "../../../apis/teacher/conductLecture";
import { conductLectureAPI } from "../../../apis/teacher/conductLecture"; // Import your API function for the POST request
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ConductLecture() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { username, role, id } = useSelector((store) => store.userDetailStore);
  const navigate = useNavigate();

  // States for each field
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  // Fetch courses (example function, replace with actual API call)
  const fetchCourses = async () => {
    try {
      const response = await getAllCoursesForTeacher();
      setCourses(response.body.course || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchBatches = async (courseId) => {
    try {
      const response = await getAllBatchsForTeacher({ id: courseId });
      setBatches(response.body || []);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const fetchSections = async (batchId) => {
    try {
      const response = await getSectionForTeacher({ id: batchId });
      setSections(response.body || []);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const response = await getClassRoomsForTeachers();
      setClassrooms(response.body.classRoomList || []);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  const fetchSubjects = async (sectionId) => {
    try {
      const response = await getAllSubjectForTeacher({ id: sectionId });
      setSubjects(response.body.subjectList || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
    fetchClassrooms();
  }, []); // Only run once on mount

  // Handlers for onChange events
  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    fetchBatches(courseId);
    fetchSubjects(courseId);
  };

  const handleBatchChange = (event) => {
    const batchId = event.target.value;
    setSelectedBatch(batchId);
    fetchSections(batchId); // Fetch sections when batch changes
  };

  const handleSectionChange = (event) => {
    const sectionId = event.target.value;
    setSelectedSection(sectionId);
    // Fetch subjects when section changes
  };

  const handleClassroomChange = (event) => {
    setSelectedClassroom(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  // Conduct Lecture POST method

  // Conduct Lecture POST method
  const conductLecture = async () => {
    const lectureDTO = {
      courseId: selectedCourse,
      batchId: selectedBatch,
      sectionId: selectedSection,
      teacherId: id,
      classRoomId: selectedClassroom,
      subjectId: selectedSubject,
    };
    console.log(lectureDTO);
    try {
      const response = await conductLectureAPI(lectureDTO);

      if (response.status && response.body && response.body.id) {
        const lectureId = response.body.id;

        // Store lectureId in localStorage
        localStorage.setItem("lectureId", lectureId);

        // Navigate to the conducting lecture page
        navigate(`/faculty/conducting-lecture`);
      } else {
        console.error("Error conducting lecture:", response);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <FacultySidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="gap-4" style={{ width: "700px" }}>
              <h1 className="text-2xl font-semibold">Conduct Lecture</h1>
              <div className="flex flex-col gap-4 justify-between mt-10">
                {/* Select Course */}
                <div className="gap-2">
                  <h1
                    className="font-bold text-xl"
                    style={{ fontSize: "1.5rem", color: "#6366F1" }}
                  >
                    Select Course
                  </h1>
                  <select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    className="border border-gray-300 w-full rounded-md p-2"
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Batch */}
                <div className="gap-2">
                  <h1
                    className="font-bold text-xl"
                    style={{ fontSize: "1.5rem", color: "#6366F1" }}
                  >
                    Select Batch
                  </h1>
                  <select
                    value={selectedBatch}
                    onChange={handleBatchChange}
                    className="border border-gray-300 w-full rounded-md p-2"
                  >
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                      <option key={batch.id} value={batch.id}>
                        {batch.batchName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Section */}
                <div className="gap-2">
                  <h1
                    className="font-bold text-xl"
                    style={{ fontSize: "1.5rem", color: "#6366F1" }}
                  >
                    Select Section
                  </h1>
                  <select
                    value={selectedSection}
                    onChange={handleSectionChange}
                    className="border border-gray-300 w-full rounded-md p-2"
                  >
                    <option value="">Select Section</option>
                    {sections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.sectionName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Classroom */}
                <div className="gap-2">
                  <h1
                    className="font-bold text-xl"
                    style={{ fontSize: "1.5rem", color: "#6366F1" }}
                  >
                    Select Classroom
                  </h1>
                  <select
                    value={selectedClassroom}
                    onChange={handleClassroomChange}
                    className="border border-gray-300 w-full rounded-md p-2"
                  >
                    <option value="">Select Classroom</option>
                    {classrooms.map((classroom) => (
                      <option key={classroom.id} value={classroom.id}>
                        {classroom.classRoomNumber}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Subject */}
                <div className="gap-2">
                  <h1
                    className="font-bold text-xl"
                    style={{ fontSize: "1.5rem", color: "#6366F1" }}
                  >
                    Select Subject
                  </h1>
                  <select
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    className="border border-gray-300 w-full rounded-md p-2"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.subjectName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conduct Lecture Button */}
                <div className="mt-4">
                  <button
                    className="bg-indigo-500 text-white py-2 px-4 rounded"
                    onClick={conductLecture}
                  >
                    Conduct Lecture
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ConductLecture;
