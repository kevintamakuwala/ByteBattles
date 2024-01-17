package com.bytebattles.services;

import com.bytebattles.models.Problem;
import com.bytebattles.models.Tag;
import com.bytebattles.repository.ProblemRepository;
import com.bytebattles.repository.SubmissionRepository;
import com.bytebattles.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProblemServiceImpl implements ProblemService {

    @Autowired
    ProblemRepository problemRepository;
    @Autowired
    SubmissionRepository submissionRepository;
    @Autowired
    TagRepository tagRepository;

    @Transactional
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
        if (problem.getSubmissionList() == null)
            problem.setSubmissionList(new HashSet<>());
        return problemRepository.save(problem);
    }

    @Override
    public Problem updateProblem(Problem updatedProblem) {
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
        existingProblem.setTestCaseList(updatedProblem.getTestCaseList());

        problemRepository.save(existingProblem);

        return existingProblem;
    }

    @Override
    public boolean deleteProblem(String problemId) {
        problemRepository.deleteById(Long.parseLong(problemId));
        return true;
    }

    @Override
    public Problem assignTagToProject(Long problemId, Long tagId) {
        Problem problem = problemRepository.findById(problemId).get();
        Tag tag = tagRepository.findById(tagId).get();

        Set<Tag> tagSet = null;
        tagSet = problem.getTagList();
        tagSet.add(tag);
        problem.setTagList(tagSet);

        Set<Problem> problemSet = null;
        problemSet = tag.getProblemSet();
        problemSet.add(problem);
        tag.setProblemSet(problemSet);
        tagRepository.save(tag);

        return problemRepository.save(problem);
    }
}
