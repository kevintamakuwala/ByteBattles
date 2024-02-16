package com.bytebattles.services;

import com.bytebattles.models.*;
import com.bytebattles.repository.ContestRepository;
import com.bytebattles.repository.ProblemRepository;
import com.bytebattles.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ContestServiceImpl implements ContestService {
    @Autowired
    ContestRepository contestRepository;
    @Autowired
    ProblemRepository problemRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public List<Contest> getContests() {
        return contestRepository.findAll();
    }

    @Override
    public Contest getContestById(String contestId) {
        return contestRepository.getOne(Long.parseLong(contestId));
    }

    @Override
    public Contest getContestByTitle(String contestTitle) {
        return contestRepository.findByTitle(contestTitle).get();
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
        Set<Problem> problemSet = contest.getProblemSet();
        Set<ApplicationUser> applicationUserSet = contest.getApplicationUserSet();

        if (problemSet == null) {
            existingContest.setProblemSet(new HashSet<>());
        } else if (!problemSet.isEmpty()) {
            existingContest.setProblemSet(problemSet);
        }

        if (applicationUserSet == null) {
            existingContest.setApplicationUserSet(new HashSet<>());
        } else if (!applicationUserSet.isEmpty()) {
            existingContest.setApplicationUserSet(applicationUserSet);
        }

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

    //    for single problem to a contest
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

    //    for multiple problems to a contest
    @Override
    public Contest assignProblemToContest(Long contestId, AssignProblemToContestDTO assignProblemToContestDTO) {
        Contest contest = contestRepository.findById(contestId).get();
        Set<Problem> problemSet = assignProblemToContestDTO.getProblems();
        for (Problem problem : problemSet) {
            Optional<Problem> existingProblem = problemRepository.findByTitle(problem.getTitle());
            if (existingProblem.isPresent()) {
                problem = existingProblem.get();
            } else {
                problem = problemRepository.save(problem);
            }
            contest = assignProblemToContest(contestId, problem.getProblemId());
        }
        System.out.println(contest);
        return contest;
    }

    //    for single user to a contest
    @Override
    public Contest assignUserToContest(Long contestId, Integer userId) {
        Contest contest = contestRepository.findById(contestId).get();
        ApplicationUser applicationUser = userRepository.findById(userId).get();

        Set<ApplicationUser> applicationUserSet = null;
        applicationUserSet = contest.getApplicationUserSet();
        applicationUserSet.add(applicationUser);
        contest.setApplicationUserSet(applicationUserSet);

        Set<Contest> contestSet = null;
        contestSet = applicationUser.getContestSet();
        contestSet.add(contest);
        applicationUser.setContestSet(contestSet);
        userRepository.save(applicationUser);

        return contestRepository.save(contest);
    }

    //    for multiple users to a contest
    @Override
    public Contest assignUserToContest(Long contestId, AssignUserToContestDTO assignUserToContestDTO) {
        Contest contest = contestRepository.findById(contestId).get();
        Set<ApplicationUser> userSet = assignUserToContestDTO.getUsers();
        for (ApplicationUser user : userSet) {
            Optional<ApplicationUser> existingUser = userRepository.findByUsername(user.getUsername());
            if (existingUser.isPresent()) {
                user = existingUser.get();
            } else {
                user = userRepository.save(user);
            }
            contest = assignUserToContest(contestId, user.getUserId());
        }
        return contest;
    }

}