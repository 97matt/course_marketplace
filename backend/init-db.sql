-- Database initialization script for Course Marketplace
-- Run this script to set up all required tables

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    user_first_name VARCHAR(50) NOT NULL,
    user_last_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_rol VARCHAR(20) NOT NULL,
    user_img VARCHAR(255)
);

-- Create courses table
-- Note: course_professor can be INTEGER (user_id) or VARCHAR (for backward compatibility)
CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    course_professor INTEGER NOT NULL,
    course_category VARCHAR(50),
    course_description TEXT,
    course_price NUMERIC(10,2),
    course_start_date DATE,
    course_img VARCHAR(255),
    FOREIGN KEY (course_professor) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create user_course (enrollments) table
CREATE TABLE IF NOT EXISTS user_course (
    user_course_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE (user_id, course_id)
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
    like_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(course_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, course_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_professor ON courses(course_professor);
CREATE INDEX IF NOT EXISTS idx_user_course_user ON user_course(user_id);
CREATE INDEX IF NOT EXISTS idx_user_course_course ON user_course(course_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_course ON likes(course_id);
