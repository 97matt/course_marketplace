CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    user_first_name VARCHAR(50) NOT NULL,
    user_last_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_rol VARCHAR(20) NOT NULL,
    user_img VARCHAR(255)
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    course_professor VARCHAR(100) NOT NULL,
    course_category VARCHAR(50),
    course_description TEXT,
    course_price NUMERIC(10,2),
    course_start_date DATE,
    course_img VARCHAR(255)
);

CREATE TABLE user_course (
    user_course_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE (user_id, course_id)
);

SELECT * FROM users;
SELECT * FROM courses;
SELECT * FROM user_course;