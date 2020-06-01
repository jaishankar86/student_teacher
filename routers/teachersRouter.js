const express = require("express");
let teachers = require("../models/teachers");

const teachersRouter = express.Router();

teachersRouter
  .get("/", (req, res) => {
    res.status(200).json({
      teachers
    });
  })
  .get("/:id", (req, res) => {
    try {
      const teacher = teachers.find(teacher => {
        return teacher.id === parseInt(req.params.id);
      });

      if (teacher) {
        res.status(200).json({
          teacher
        });
      } else {
        res.status(400).send("Teacher Not found!");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  })
  .post("/", (req, res) => {
    if (req.body.firstName && req.body.age > 18) {
      const id = teachers.length + 1;
      const newTeacher = {
        id,
        ...req.body
      };
      teachers.push(newTeacher);
      res.status(200).json({
        teacher: newTeacher
      });
    } else {
      res.status(400).send("Invalid Teacher");
    }
  })
  .patch("/:id", (req, res) => {
    try {
      let teacher = teachers.find(teacher => {
        return teacher.id === parseInt(req.params.id);
      });
      teacher = {
        ...teacher,
        ...req.body
      };

      teachers = teachers.filter(ele => {
        return ele.id !== parseInt(req.params.id);
      });

      teachers.push(teacher);
      res.status(200).json({ teacher });
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  })
  .delete("/:id", (req, res) => {
    try {
      let teacherIndex;
      for (let i = 0; i < teachers.length; i++) {
        if (teachers[i].id === parseInt(req.params.id)) {
          teacherIndex = i;
        }
      }
      if (teacherIndex) {
        teachers.splice(teacherIndex, 1);
        res.status(200).json({});
      } else {
        res.status(400).send("Invalid Teacher");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = teachersRouter;
