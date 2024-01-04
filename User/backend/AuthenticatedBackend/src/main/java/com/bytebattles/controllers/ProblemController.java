package com.bytebattles.controllers;

import com.bytebattles.models.Problem;
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

    @GetMapping({"/",""})
    public List<Problem> getProblems() {
        return problemService.getProblems();
    }

    @GetMapping("/{problemId}")
    public Problem getProblemById(@PathVariable String problemId) {
        return problemService.getProblemById(problemId);
    }

    @PostMapping({"/",""})
    public Problem addProblem(@RequestBody Problem problem) {
        return problemService.addProblem(problem);
    }

    @PutMapping({"/{problemId}"})
    public ResponseEntity<Problem> updateProblem(@PathVariable String problemId, @RequestBody Problem updatedProblem) {
        Problem existingProblem = problemService.getProblemById((problemId));

        if (existingProblem == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        existingProblem.setTitle(updatedProblem.getTitle());
        existingProblem.setDescription(updatedProblem.getDescription());
        existingProblem.setConstraints(updatedProblem.getConstraints());
        existingProblem.setDifficultyLevel(updatedProblem.getDifficultyLevel());

        problemService.updateProblem(existingProblem);

        return new ResponseEntity<>(existingProblem, HttpStatus.OK);
    }
    @DeleteMapping("/{problemId}")
    public ResponseEntity<HttpStatus> deleteProblem(@PathVariable String problemId) {
        if (problemService.deleteProblem(problemId)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
