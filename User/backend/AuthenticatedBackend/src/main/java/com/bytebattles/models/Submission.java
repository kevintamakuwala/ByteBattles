package com.bytebattles.models;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")

public class Submission {
    @Id
    @Column(name = "submission_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long submissionId;
    private String language;
    private String result;

    @Column(name = "submission_date")
    private LocalDateTime submissionDate;

    @ManyToOne
    @JoinColumn(name = "problem_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Problem problem;

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }

    public Submission() {

    }

    public long getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(long submissionId) {
        this.submissionId = submissionId;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }

    public Submission(long submissionId, String language, String result, LocalDateTime localDateTime) {
        this.submissionId = submissionId;
        this.language = language;
        this.result = result;
        this.submissionDate = localDateTime;
    }

    @PrePersist
    protected void onCreate() {
        submissionDate = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Submission{" +
                "submissionId=" + submissionId +
                ", language='" + language + '\'' +
                ", result='" + result + '\'' +
                ", submissionDate=" + submissionDate +
                ", problem=" + problem +
                '}';
    }
}
