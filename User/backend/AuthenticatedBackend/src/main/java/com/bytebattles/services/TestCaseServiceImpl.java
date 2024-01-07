package com.bytebattles.services;

import com.bytebattles.models.TestCase;
import com.bytebattles.repository.ProblemRepository;
import com.bytebattles.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TestCaseServiceImpl implements TestCaseService {
    @Autowired
    TestCaseRepository testCaseRepository;

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
        return testCaseRepository.save(testCase);
    }

    @Override
    public TestCase updateTestCase(TestCase testCase) {
        return testCaseRepository.save(testCase);
    }

    @Override
    public boolean deleteTestCase(String testCaseId) {
        testCaseRepository.deleteById(Long.parseLong(testCaseId));
        return true;
    }
}
