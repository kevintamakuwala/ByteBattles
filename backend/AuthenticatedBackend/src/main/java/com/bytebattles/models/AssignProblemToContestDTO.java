package com.bytebattles.models;

import java.util.Set;

public class AssignProblemToContestDTO {
    Set<Problem> problems;

    public AssignProblemToContestDTO() {
        super();
    }

    public AssignProblemToContestDTO(Set<Problem> problems) {
        this.problems = problems;
    }

    public Set<Problem> getProblems() {
        return problems;
    }

    public void setProblems(Set<Problem> problems) {
        this.problems = problems;
    }

    @Override
    public String toString() {
        return "AssignProblemToContestDTO{" +
                "problemSet=" + problems +
                '}';
    }
}
