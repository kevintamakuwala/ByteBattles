package com.bytebattles.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import jakarta.persistence.*;

@Entity
@Table(name = "testcases")
public class TestCase {
    @Id
    @Column(name = "testcase_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long testCaseId;

    @Column(name = "input", length = Integer.MAX_VALUE)
    private String input;
    @Column(name = "expected_output", length = Integer.MAX_VALUE)
    private String expectedOutput;

    @ManyToOne
    @JoinColumn(name = "problem_id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonBackReference(value = "problem-testcase")
    private Problem problem;

    public TestCase() {
    }

    public TestCase(Long testCaseId, String input, String expectedOutput) {
        this.testCaseId = testCaseId;
        this.input = input;
        this.expectedOutput = expectedOutput;
    }

    public Long getTestCaseId() {
        return testCaseId;
    }

    public void setTestCaseId(Long testCaseId) {
        this.testCaseId = testCaseId;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }

    @Override
    public String toString() {
        return "TestCase{" +
                "testCaseId=" + testCaseId +
                ", input='" + input + '\'' +
                ", expectedOutput='" + expectedOutput + '\'' +
                ", problem=" + problem +
                '}';
    }
}
