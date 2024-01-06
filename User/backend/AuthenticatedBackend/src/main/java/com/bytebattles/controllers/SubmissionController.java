package com.bytebattles.controllers;

import com.bytebattles.models.Submission;
import com.bytebattles.services.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/submissions")
public class SubmissionController {
    @Autowired
    private SubmissionService submissionService;

    @GetMapping({"/", ""})
    public ResponseEntity<List<Submission>> getSubmissions() {
        List<Submission> submissions = submissionService.getSubmissions();
        return new ResponseEntity<>(submissions, HttpStatus.OK);
    }

    @GetMapping({"/{submissionId}/", "/{submissionId}"})
    public ResponseEntity<Submission> getSubmissionById(@PathVariable String submissionId) {
        Submission submission = submissionService.getSubmissionById(submissionId);
        if (submission != null) {
            return new ResponseEntity<>(submission, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping({"/", ""})
    public ResponseEntity<Submission> addProblem(@RequestBody Submission submission) {
        Submission addedSubmission = submissionService.addSubmission(submission);

        return new ResponseEntity<>(addedSubmission, HttpStatus.CREATED);
    }

    @PutMapping({"/{submissionId}/", "/{submissionId}"})
    public ResponseEntity<Submission> updateSubmission(@PathVariable String submissionId, @RequestBody Submission updatedSubmission) {
        updatedSubmission.setSubmissionId(Long.parseLong(submissionId));
        Submission submission = submissionService.updateSubmission(updatedSubmission);

        if (submission != null) {
            return new ResponseEntity<>(submission, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping({"/{submissionId}/", "/{submissionId}"})
    public ResponseEntity<Void> deleteSubmission(@PathVariable String submissionId) {
        boolean deleted = submissionService.deleteSubmission(submissionId);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
