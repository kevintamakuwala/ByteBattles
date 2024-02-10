package com.bytebattles.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "contests")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contest_id")
    private Long contestId;

    @Column(nullable = false, length = Integer.MAX_VALUE)
    private String title;

    @Column(nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @ManyToMany
    @JoinTable(name = "CONTEST_PROBLEM_TABLE",
            joinColumns = @JoinColumn(name = "contest_id"),
            inverseJoinColumns = @JoinColumn(name = "problem_id")
    )
    private Set<Problem> problemSet = new HashSet<>();
    @ManyToMany
    @JoinTable(name = "CONTEST_USER_TABLE",
            joinColumns = @JoinColumn(name = "contest_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> applicationUserSet = new HashSet<>();


    // Constructors

    public Contest() {
    }

    public Contest(String title, String description, LocalDateTime startTime, LocalDateTime endTime, Set<Problem> problemSet, Set<ApplicationUser> applicationUserSet) {
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.problemSet = problemSet;
        this.applicationUserSet = applicationUserSet;
    }

    // Getters and setters

    public Long getContestId() {
        return contestId;
    }

    public void setContestId(Long contestId) {
        this.contestId = contestId;
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

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Set<Problem> getProblemSet() {
        return problemSet;
    }

    public void setProblemSet(Set<Problem> problemSet) {
        this.problemSet = problemSet;
    }

    public Set<ApplicationUser> getApplicationUserSet() {
        return applicationUserSet;
    }

    public void setApplicationUserSet(Set<ApplicationUser> applicationUserSet) {
        this.applicationUserSet = applicationUserSet;
    }

    @Override
    public String toString() {
        return "Contest{" +
                "contestId=" + contestId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", problemSet=" + problemSet +
                ", applicationUserSet=" + applicationUserSet +
                '}';
    }
}
