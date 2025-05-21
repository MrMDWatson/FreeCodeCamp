'use strict';
const Issues = require("../db/userModel").Issues;
module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async (req, res) => {
      const projectName = req.params.project;
      try {
        let issues = await Issues.find({project: projectName, ...req.query});
        if (!issues) {
          res.json({result: "No issues yet"});
          return;
        }
        res.status(200).json(issues);
      } catch(err) {
        console.log(err);
      }
    })

    .post(async (req, res) => {
      const projectName = req.params.project;
      let { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      if (!issue_title || !issue_text || !created_by) {
        res.json({error: "required field(s) missing"});
        return;
      }
      try {
        const issue = await Issues.create({
          project: projectName,
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          created_on: new Date(),
          updated_on: new Date(),
          assigned_to: assigned_to,
          status_text: status_text
        });
        if (!issue) {
          res.json({error: "Issue not posted"});
        }
        res.status(200).json(issue);
      } catch(err) {
        console.log(err);
      }
    })

    .put(async (req, res) => {
      let project = req.params.project;
      let { _id } = req.body;
      if (!_id) {
        res.json({error: "missing _id"});
        return;  
      }
      const queryProperties = ["issue_title", "issue_text", "created_by", "updated_on", "open", "assigned_to", "status_text"];
      let updatedQuery = false;
      const query = (objData, updateProps) => {
        let queryObj = {updated_on: new Date()};
        updateProps.forEach((prop) => {
          if (objData[prop]) {
            queryObj[prop] = objData[prop];
            updatedQuery = true;
          }
        });
        return queryObj;
      }
      let updatedIssue = query(req.body, queryProperties);
      if (!updatedQuery) {
        res.json({error: "no update field(s) sent", _id: _id});
        return;
      }
      try {
        let issue = await Issues.findByIdAndUpdate(
          {_id: _id},
          updatedIssue,
          {new: true}
        );
        if (!issue) {
          res.json({error: "could not update", _id: _id});
          return;
        }
        res.status(200).json({result: "successfully updated", _id: _id});
      } catch(err) {
        console.log(err);
      }
    })

    .delete(async (req, res) => {
      const projectName = req.params.project;
      let { _id } = req.body;
      if (!_id) {
        res.json({error: "missing _id"});
        return;
      }
      try {
        let issue = await Issues.findByIdAndDelete(_id);
        if (!issue) {
          res.json({error: "could not delete", _id: _id});
          return;
        }
        res.status(200).json({result: "successfully deleted", _id: _id});
      } catch(err) {
        console.log(err);
      }
    });
};