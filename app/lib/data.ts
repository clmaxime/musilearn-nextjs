import postgres from 'postgres';
import {
  User,
  Course,
  Enrollment,
  Progress,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchUsers() {
  try {
    const data = await sql<User[]>`SELECT * FROM users`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchCourses() {
  try {
    const data = await sql<Course[]>`SELECT * FROM courses`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch courses.');
  }
}

export async function fetchEnrollments() {
  try {
    const data = await sql<Enrollment[]>`SELECT * FROM enrollments`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch enrollments.');
  }
}

export async function fetchProgress() {
  try {
    const data = await sql<Progress[]>`SELECT * FROM progress`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch progress.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredCourses(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const courses = await sql<Course[]>`
      SELECT
        courses.id,
        courses.title,
        courses.description,
        courses.instrument,
        courses.teacherId,
        courses.level,
        courses.schedule,
        courses.capacity
      FROM courses
      WHERE
        courses.title ILIKE ${`%${query}%`} OR
        courses.description ILIKE ${`%${query}%`} OR
        courses.instrument ILIKE ${`%${query}%`} OR
        courses.level ILIKE ${`%${query}%`}
      ORDER BY courses.title ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return courses;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch courses.');
  }
}

export async function fetchCoursesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM courses
    WHERE
      courses.title ILIKE ${`%${query}%`} OR
      courses.description ILIKE ${`%${query}%`} OR
      courses.instrument ILIKE ${`%${query}%`} OR
      courses.level ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of courses.');
  }
}

export async function fetchCourseById(id: string) {
  try {
    const data = await sql<Course[]>`
      SELECT
        courses.id,
        courses.title,
        courses.description,
        courses.instrument,
        courses.teacherId,
        courses.level,
        courses.schedule,
        courses.capacity
      FROM courses
      WHERE courses.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch course.');
  }
}

export async function fetchEnrollmentsByCourseId(courseId: string) {
  try {
    const data = await sql<Enrollment[]>`
      SELECT *
      FROM enrollments
      WHERE courseId = ${courseId};
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch enrollments.');
  }
}

export async function fetchProgressByStudentId(studentId: string) {
  try {
    const data = await sql<Progress[]>`
      SELECT *
      FROM progress
      WHERE studentId = ${studentId};
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch progress.');
  }
}
