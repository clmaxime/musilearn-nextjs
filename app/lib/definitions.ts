  // definitions.ts

  export class User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    createdAt: Date;

    constructor(
      id: string,
      email: string,
      password: string,
      name: string,
      role: string,
      createdAt: Date
    ) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.name = name;
      this.role = role;
      this.createdAt = createdAt;
    }
  }

  export class Course {
    id: string;
    title: string;
    description: string;
    instrument: string;
    teacherId: string;
    level: string;
    schedule: string;
    capacity: number;

    constructor(
      id: string,
      title: string,
      description: string,
      instrument: string,
      teacherId: string,
      level: string,
      schedule: string,
      capacity: number
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.instrument = instrument;
      this.teacherId = teacherId;
      this.level = level;
      this.schedule = schedule;
      this.capacity = capacity;
    }
  }

  export class Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    enrollmentDate: Date;
    status: string;

    constructor(
      id: string,
      studentId: string,
      courseId: string,
      enrollmentDate: Date,
      status: string
    ) {
      this.id = id;
      this.studentId = studentId;
      this.courseId = courseId;
      this.enrollmentDate = enrollmentDate;
      this.status = status;
    }
  }

  export class Progress {
    id: string;
    studentId: string;
    courseId: string;
    date: Date;
    evaluation: string;
    comments: string;

    constructor(
      id: string,
      studentId: string,
      courseId: string,
      date: Date,
      evaluation: string,
      comments: string
    ) {
      this.id = id;
      this.studentId = studentId;
      this.courseId = courseId;
      this.date = date;
      this.evaluation = evaluation;
      this.comments = comments;
    }
  }
