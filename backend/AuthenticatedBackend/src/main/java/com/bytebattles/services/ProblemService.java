package com.bytebattles.services;

import com.bytebattles.models.AssignTagToProblemDTO;
import com.bytebattles.models.Problem;

import java.util.List;

public interface ProblemService {

    public List<Problem> getProblems();

    public Problem getProblemById(String problemId);

    public Problem addProblem(Problem problem);

    public Problem updateProblem(Problem problem);

    public boolean deleteProblem(String problemId);

    public Problem assignTagToProblem(Long problemId, Long tagId);

    public Problem assignTagToProblem(Long problemId, AssignTagToProblemDTO assignTagToProblemDTO);

    public Problem getProblemByTitle(String problemTitle);
}
