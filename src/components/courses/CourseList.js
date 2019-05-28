import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({ courses, onDeleteClick }) => {
  let [courseList, updateCourseList] = useState(courses);

  function onChangeHandle({ target }){
    updateCourseList(
      courses.filter( course => 
        course.title.toLowerCase().indexOf(target.value) >= 0 || 
        course.authorName.toLowerCase().indexOf(target.value) >= 0 
      )
    );
  }

  function onDelete(course){
    updateCourseList(
      courseList.filter( ({ title }) => 
        title !== course.title 
      )
    );
    onDeleteClick(course);
  }
  
  return (
    <>
      <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={onChangeHandle}></input>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {courseList.map(course => {
            return (
              <tr key={course.id}>
                <td>
                  <a
                    className="btn btn-light"
                    href={"http://pluralsight.com/courses/" + course.slug}
                  >
                    Watch
                  </a>
                </td>
                <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(course)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CourseList;
