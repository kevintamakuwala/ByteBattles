package com.bytebattles.services;

import com.bytebattles.models.Problem;
import com.bytebattles.models.TestCase;
import com.bytebattles.repository.ProblemRepository;
import com.bytebattles.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class TestCaseServiceImpl implements TestCaseService {
    @Autowired
    TestCaseRepository testCaseRepository;
    @Autowired
    ProblemRepository problemRepository;

    @Override
    public List<TestCase> getTestCases() {
        return testCaseRepository.findAll();
    }

    @Override
    public TestCase getTestCaseById(String testCaseId) {
        return testCaseRepository.findById(Long.parseLong(testCaseId)).get();
    }

    @Override
    public TestCase addTestCase(TestCase testCase) {
        Long problemId = testCase.getProblem().getProblemId();
        Problem problem = problemRepository.findById(problemId).orElseThrow(() -> new IllegalArgumentException("Problem not found"));

        testCase.setProblem(problem);

        Set<TestCase> testCases = problem.getTestCaseList();

        testCases.add(testCase);
        problem.setTestCaseList(testCases);
        return testCaseRepository.save(testCase);
    }

    @Override
    public TestCase updateTestCase(TestCase testCase) {
        return testCaseRepository.save(testCase);
    }

    @Override
    public boolean deleteTestCase(String testCaseId) {
        TestCase testCase = getTestCaseById(testCaseId);
        Problem problem = problemRepository.findById(testCase.getProblem().getProblemId()).get();
        problem.getTestCaseList().remove(testCase);
        problemRepository.save(problem);
        testCaseRepository.deleteById(Long.parseLong(testCaseId));
        return true;
    }
}
