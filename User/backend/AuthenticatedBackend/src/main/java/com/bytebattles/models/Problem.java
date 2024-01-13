package com.bytebattles.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "problem-submission")
    private Set<Submission> submissionList=new HashSet<>();

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "problem-testcase")
    private Set<TestCase> testCaseList=new HashSet<>();

    public Problem() {
    }

    public Problem(Long problemId, String title, String description, String constraints, String difficultyLevel, Set<Submission> submissions, Set<TestCase> testCases) {
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

    public Set<Submission> getSubmissionList() {
        return submissionList;
    }

    public void setSubmissionList(Set<Submission> submissionList) {
        this.submissionList = submissionList;
    }

    public Set<TestCase> getTestCaseList() {
        return testCaseList;
    }

    public void setTestCaseList(Set<TestCase> testCaseList) {
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
                '}';
    }
}