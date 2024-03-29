package com.bytebattles.controllers;

import com.bytebattles.models.AssignTagToProblemDTO;
import com.bytebattles.models.Problem;
import com.bytebattles.models.Submission;
import com.bytebattles.services.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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

    @GetMapping({"/title/{problemTitle}/", "/title/{problemTitle}"})
    public ResponseEntity<Problem> getProblemByTitle(@PathVariable String problemTitle) {
        Problem problem = problemService.getProblemByTitle(problemTitle);
        if (problem != null) {
            return new ResponseEntity<>(problem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping({"/", ""})
    public ResponseEntity<Problem> addProblem(@RequestBody Problem problem) {
        Set<Submission> submissions = problem.getSubmissionList();
        if (submissions != null) {
            for (Submission submission : submissions) {
                submission.setProblem(problem);
            }
        }

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

    @PutMapping({"/{problemId}/tags/{tagId}","/{problemId}/tags/{tagId}/"})
    public Problem assignTagToProblem(@PathVariable Long problemId,
                                      @PathVariable Long tagId) {
        return problemService.assignTagToProblem(problemId,tagId);
    }
    @PutMapping({"/{problemId}/tags","/{problemId}/tags/"})
    public Problem assignTagsToProblem(@PathVariable Long problemId,
                                      @RequestBody AssignTagToProblemDTO assignTagToProblemDTO) {
        return problemService.assignTagToProblem(problemId,assignTagToProblemDTO);
    }
}
