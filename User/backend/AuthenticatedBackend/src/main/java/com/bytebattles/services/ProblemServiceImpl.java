package com.bytebattles.services;

import com.bytebattles.models.Problem;
import com.bytebattles.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemServiceImpl implements ProblemService {

    @Autowired
    ProblemRepository problemRepository;

    @Override
    public List<Problem> getProblems() {
        return problemRepository.findAll();
    }

    @Override
    public Problem getProblemById(String problemId) {
        return problemRepository.getOne(Long.parseLong(problemId));
    }

    @Override
    public Problem addProblem(Problem problem) {
        return problemRepository.save(problem);
    }

    @Override
    public Problem updateProblem(Problem updatedProblem) {
        System.out.println(updatedProblem);
        Long problemId = updatedProblem.getProblemId();
        if (!problemRepository.existsById(problemId)) {
            return null;
        }

        Problem existingProblem = problemRepository.getOne(problemId);

        existingProblem.setTitle(updatedProblem.getTitle());
        existingProblem.setDescription(updatedProblem.getDescription());
        existingProblem.setConstraints(updatedProblem.getConstraints());
        existingProblem.setDifficultyLevel(updatedProblem.getDifficultyLevel());
        existingProblem.setSubmissionList(updatedProblem.getSubmissionList());

        problemRepository.save(existingProblem);

        return existingProblem;
    }

    @Override
    public boolean deleteProblem(String problemId) {
        problemRepository.deleteById(Long.parseLong(problemId));
        return true;
    }
}
