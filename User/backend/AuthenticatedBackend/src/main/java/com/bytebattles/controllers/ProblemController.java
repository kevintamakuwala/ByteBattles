package com.bytebattles.controllers;

import com.bytebattles.models.Problem;
import com.bytebattles.models.Submission;
import com.bytebattles.services.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/problems")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @GetMapping({"/", ""})
    public ResponseEntity<List<Problem>> getProblems() {
        List<Problem> problems = problemService.getProblems();
        return new ResponseEntity<>(problems, HttpStatus.OK);
    }

    @GetMapping({"/{problemId}/", "/{problemId}"})
    public ResponseEntity<Problem> getProblemById(@PathVariable String problemId) {
        Problem problem = problemService.getProblemById(problemId);
        if (problem != null) {
            return new ResponseEntity<>(problem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping({"/", ""})
    public ResponseEntity<Problem> addProblem(@RequestBody Problem problem) {
        List<Submission> submissions = problem.getSubmissionList();
        if (submissions != null) {
            for (Submission submission : submissions) {
                submission.setProblem(problem);
            }
        }
        System.out.println(submissions);

        Problem addedProblem = problemService.addProblem(problem);
        return new ResponseEntity<>(addedProblem, HttpStatus.CREATED);
    }

    @PutMapping({"/{problemId}/", "/{problemId}"})
    public ResponseEntity<Problem> updateProblem(@PathVariable String problemId, @RequestBody Problem updatedProblem) {
        updatedProblem.setProblemId(Long.parseLong(problemId));

        Problem updated = problemService.updateProblem(updatedProblem);

        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping({"/{problemId}/", "/{problemId}"})
    public ResponseEntity<Void> deleteProblem(@PathVariable String problemId) {
        boolean deleted = problemService.deleteProblem(problemId);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
