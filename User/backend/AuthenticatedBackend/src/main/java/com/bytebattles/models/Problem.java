package com.bytebattles.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "problems")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "problemId")
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("problemId")
    private Long problemId;

    private String title;

    private String description;

    private String constraints;

    private String difficultyLevel;
    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL)
    @JsonBackReference(value = "problem-submission")
    private List<Submission> submissionList;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL)
    @JsonBackReference(value = "problem-testcase")
    private List<TestCase> testCaseList;

    public Problem() {
    }

    public Problem(Long problemId, String title, String description, String constraints, String difficultyLevel, List<Submission> submissions, List<TestCase> testCases) {
        this.problemId = problemId;
        this.title = title;
        this.description = description;
        this.constraints = constraints;
        this.difficultyLevel = difficultyLevel;
        this.submissionList = submissions;
        this.testCaseList = testCases;

        if (submissions != null) {
            for (Submission submission : submissions) {
                submission.setProblem(this);
            }
        }
        if (testCases != null) {
            for (TestCase testCase : testCases) {
                testCase.setProblem(this);
            }
        }
    }

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getConstraints() {
        return constraints;
    }

    public void setConstraints(String constraints) {
        this.constraints = constraints;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel.toLowerCase();
    }

    public List<Submission> getSubmissionList() {
        return submissionList;
    }

    public void setSubmissionList(List<Submission> submissionList) {
        this.submissionList = submissionList;
    }

    public List<TestCase> getTestCaseList() {
        return testCaseList;
    }

    public void setTestCaseList(List<TestCase> testCaseList) {
        this.testCaseList = testCaseList;
    }

    @Override
    public String toString() {
        return "Problem{" +
                "problemId=" + problemId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", constraints='" + constraints + '\'' +
                ", difficultyLevel='" + difficultyLevel + '\'' +
                ", submissionList=" + submissionList +
                ", testCaseList=" + testCaseList +
                '}';
    }
}