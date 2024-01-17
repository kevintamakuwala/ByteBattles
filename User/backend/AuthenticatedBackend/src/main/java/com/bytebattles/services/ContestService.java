package com.bytebattles.services;

import com.bytebattles.models.Contest;

import java.util.List;

public interface ContestService {
    public List<Contest> getContests();

    public Contest getContestById(String contestId);

    public Contest addContest(Contest contest);

    public Contest updateContest(Contest updatedContest);

    public boolean deleteContest(String contestId);

    public Contest assignProblemToContest(Long contestId, Long problemId);

    public Contest assignUserToContest(Long contestId, Integer userId);
}
