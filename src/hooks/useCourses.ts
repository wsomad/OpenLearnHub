import {useDispatch, useSelector} from 'react-redux';
import {
    addCourse,
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
} from '../services/firestore/CourseService';
import {
    setCourse,
    setCourses,
    modifyCourse,
    clearCourse,
} from '../store/slices/courseSlice';

export const useCourses = () => {
    const dispatch = useDispatch();
    const selectedCourse = useSelector((state) => state.courses.selectedCourse);
    const courses = useSelector((state) => state.courses.allCourses);
    const userRole = useSelector((state) => state.users.userRole);

    const isInstructor = userRole === 'instructor';

    const createCourse = async (course) => {
        if (!isInstructor) {
            console.log('Only instructor can create course');
            return;
        }
        try {
            const addedCourse = await addCourse(course);
            dispatch(setCourse(addedCourse));
        } catch (error) {
            console.error('Failed to add new course: ', error);
        }
    };

    const fetchCourseById = async (course_id) => {
        try {
            const course = await getCourseById(course_id);
            dispatch(setCourse(course));
        } catch (error) {
            console.error('Failed to fetch specific course: ', error);
        }
    };

    const fetchAllCourses = async () => {
        try {
            const courses = await getAllCourses();
            dispatch(setCourses(courses));
            // Optional: reset selectedCourse if needed
            dispatch(setCourse(null));
        } catch (error) {
            console.error('Failed to fetch all courses: ', error);
        }
    };

    const updateCourse = async (course_id, updatedCourse) => {
        if (!isInstructor) {
            console.log('Only instructor can update course');
            return;
        }
        try {
            await updateCourseById(course_id, updatedCourse);
            dispatch(
                modifyCourse({
                    id: course_id,
                    updatedCourseObject: updatedCourse,
                }),
            );
        } catch (error) {
            console.error('Failed to update course: ', error);
        }
    };

    const deleteCourse = async (course_id) => {
        if (!isInstructor) {
            console.log('Only instructor can delete course');
            return;
        }
        try {
            await deleteCourseById(course_id);
            dispatch(clearCourse(course_id));
        } catch (error) {
            console.error('Failed to delete course: ', error);
        }
    };

    return {
        selectedCourse,
        courses,
        userRole,
        createCourse,
        fetchCourseById,
        fetchAllCourses,
        updateCourse,
        deleteCourse,
    };
};
