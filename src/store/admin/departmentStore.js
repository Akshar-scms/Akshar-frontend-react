import {createSlice} from "@reduxjs/toolkit";

const departmentSlice = createSlice({
    name: "departmentStore",
    initialState: {departmentList: [], numberOfDepartment: 0},
    reducers: {
        saveDepartments: (state, action) => {
            state.departmentList = action.payload.departmentList;
            state.numberOfDepartment = state.departmentList.length;
        },
        deleteDepartment: (state, action) => {
            const departmentId = action.payload;  // The ID of the department to be deleted
            // Filter out the department with the given ID
            state.departmentList = state.departmentList.filter(department => department.id !== departmentId);

            // Update the count of departments
            state.numberOfDepartment = state.departmentList.length;
        },
        updateDepartment: (state, action) => {
            const updatedDepartment = action.payload; // The updated department details
            const index = state.departmentList.findIndex(department => department.id === updatedDepartment.id);

            if (index !== -1) {
                // Keep the courses and teachers fields intact, only update other fields
                state.departmentList[index] = {
                    ...state.departmentList[index],  // Preserve existing fields
                    ...updatedDepartment,            // Overwrite with updated fields
                    courses: state.departmentList[index].courses,   // Preserve courses
                    teachers: state.departmentList[index].teachers  // Preserve teachers
                };
            }
        },
        addDepartment: (state, action) => {
            const newDepartment = {
                ...action.payload,              // Spread the payload to copy existing fields
                teachers: 0,                    // Default value for teachers
                courses: 0,                     // Default value for courses
                teacherInfo: "Yet not assigned" // Default value for teacherInfo
            };

            state.departmentList.push(newDepartment);  // Add the new department to the list
            state.numberOfDepartment = state.departmentList.length;  // Update the count of departments
        }


    },
});

export const departmentActions = departmentSlice.actions;

export default departmentSlice;
