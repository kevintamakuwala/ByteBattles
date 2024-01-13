package com.bytebattles.services;

import com.bytebattles.models.ApplicationUser;
import com.bytebattles.models.Problem;
import com.bytebattles.models.Submission;
import com.bytebattles.repository.ProblemRepository;
import com.bytebattles.repository.SubmissionRepository;
import com.bytebattles.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class SubmissionServiceImpl implements SubmissionService {
    @Autowired
    public SubmissionRepository submissionRepository;
    @Autowired
    public ProblemRepository problemRepository;
    @Autowired
    public UserRepository userRepository;

    @Override
    public List<Submission> getSubmissions() {
        return submissionRepository.findAll();
    }

    @Override
    public Submission getSubmissionById(String submissionId) {
        return submissionRepository.findById(Long.parseLong(submissionId)).get();
    }

    @Override
    @Transactional
    public Submission addSubmission(Submission submission) {
        Long problemId = submission.getProblem().getProblemId();
        Problem problem = problemRepository.findById(problemId).orElseThrow(() -> new IllegalArgumentException("Problem not found"));

        ApplicationUser applicationUser = userRepository.findById(submission.getApplicationUser().getUserId())
                .orElseThrow(() -> new IllegalArgumentException("ApplicationUser not found"));

        submission.setProblem(problem);
        submission.setApplicationUser(applicationUser);

        Set<Submission> submissions = problem.getSubmissionList();

        submissions.add(submission);
        problem.setSubmissionList(submissions);
        return submissionRepository.save(submission);
    }


    @Override
    public Submission updateSubmission(Submission submission) {
        submission.setSubmissionDate(LocalDateTime.now());
        return submissionRepository.save(submission);
    }

    @Override
    public boolean deleteSubmission(String submissionId) {
        Submission submission = getSubmissionById(submissionId);
        Problem problem = problemRepository.findById(submission.getProblem().getProblemId()).get();
        problem.getSubmissionList().remove(submission);
        problemRepository.save(problem);
        submissionRepository.deleteById(Long.parseLong(submissionId));
        return true;
    }
}
