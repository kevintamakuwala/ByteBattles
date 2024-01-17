package com.bytebattles.services;

import com.bytebattles.models.Contest;
import com.bytebattles.models.Problem;
import com.bytebattles.repository.ContestRepository;
import com.bytebattles.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ContestServiceImpl implements ContestService {
    @Autowired
    ContestRepository contestRepository;
    @Autowired
    ProblemRepository problemRepository;

    @Override
    public List<Contest> getContests() {
        return contestRepository.findAll();
    }

    @Override
    public Contest getContestById(String contestId) {
        return contestRepository.getOne(Long.parseLong(contestId));
    }

    @Override
    public Contest addContest(Contest contest) {
        contestRepository.save(contest);
        return contest;
    }

    @Override
    public Contest updateContest(Contest contest) {
        Long contestId = contest.getContestId();
        if (!contestRepository.existsById(contestId)) {
            return null;
        }

        Contest existingContest = contestRepository.findById(contestId).get();

        existingContest.setTitle(contest.getTitle());
        existingContest.setDescription(contest.getDescription());
        existingContest.setStartTime(contest.getStartTime());
        existingContest.setEndTime(contest.getEndTime());

        contestRepository.save(existingContest);

        return existingContest;
    }

    @Override
    public boolean deleteContest(String contestId) {
        contestRepository.deleteById(Long.parseLong(contestId));
        return true;
    }
    @Override
    public Contest assignProblemToContest(Long contestId, Long problemId) {
        Contest contest = contestRepository.findById(contestId).get();
        Problem problem = problemRepository.findById(problemId).get();

        Set<Problem> problemSet = null;
        problemSet = contest.getProblemSet();
        problemSet.add(problem);
        contest.setProblemSet(problemSet);

        Set<Contest> contestSet = null;
        contestSet = problem.getContestSet();
        contestSet.add(contest);
        problem.setContestSet(contestSet);
        problemRepository.save(problem);

        return contestRepository.save(contest);
    }
}
