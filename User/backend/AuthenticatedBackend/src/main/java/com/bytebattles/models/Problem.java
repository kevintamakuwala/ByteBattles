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
    @JsonProperty("problemID")
    private Long problemID;

    private String title;

    private String description;

    private String constraints;

    private String difficultyLevel;

    public Problem() {
    }

    public Problem(Long problemID, String title, String description, String constraints, String difficultyLevel) {
        this.problemID = problemID;
        this.title = title;
        this.description = description;
        this.constraints = constraints;
        this.difficultyLevel = difficultyLevel;
    }


    public Long getProblemID() {
        return problemID;
    }

    public void setProblemID(Long problemID) {
        this.problemID = problemID;
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
                "problemID=" + problemID +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", constraints='" + constraints + '\'' +
                ", difficultyLevel='" + difficultyLevel + '\'' +
                '}';
    }
}