package com.bytebattles.services;

import com.bytebattles.models.Submission;
import com.bytebattles.models.TestCase;

import java.util.List;

public interface TestCaseService {
    public List<TestCase> getTestCases();
    public TestCase getTestCaseById(String testCaseId);
    public TestCase addTestCase(TestCase testCase);
    public TestCase updateTestCase(TestCase testCase);
    public boolean deleteTestCase(String testCaseId);
}
