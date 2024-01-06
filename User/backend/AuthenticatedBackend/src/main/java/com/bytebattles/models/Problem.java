package com.bytebattles.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "problems")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problem_id")
    @JsonProperty("problemId")
    private Long problemId;

    private String title;

    private String description;

    private String constraints;

    private String difficultyLevel;

    public Problem() {
    }

    public Problem(Long problemId, String title, String description, String constraints, String difficultyLevel) {
        this.problemId = problemId;
        this.title = title;
        this.description = description;
        this.constraints = constraints;
        this.difficultyLevel = difficultyLevel;
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